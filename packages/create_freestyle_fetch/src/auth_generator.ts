import type { OpenAPIV3_1 } from 'openapi-types'

export interface SecurityScheme {
    type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect'
    name?: string // For apiKey
    in?: 'query' | 'header' | 'cookie' // For apiKey
    scheme?: string // For http (e.g., bearer, basic)
    description?: string
}

export class AuthGenerator {
    private schemes: Record<string, SecurityScheme> = {}
    private globalSecurity: Record<string, string[]>[] = []

    constructor(private spec: OpenAPIV3_1.Document) {
        this.analyze()
    }

    private analyze() {
        if (this.spec.components?.securitySchemes) {
            for (const [key, scheme] of Object.entries(
                this.spec.components.securitySchemes
            )) {
                if ('$ref' in scheme) continue // Skip refs for now, or resolve them if possible
                const s = scheme as any
                this.schemes[key] = {
                    type: s.type,
                    name: s.name,
                    in: s.in,
                    scheme: s.scheme,
                    description: s.description,
                }
            }
        }

        if (this.spec.security) {
            this.globalSecurity = this.spec.security
        }
    }

    public generateAuthConfig(): string {
        const lines: string[] = []
        lines.push('export interface AuthConfig {')

        for (const [key, scheme] of Object.entries(this.schemes)) {
            lines.push(`    /** ${scheme.description || key} */`)
            lines.push(`    ${key}?: {`)

            if (scheme.type === 'http') {
                if (scheme.scheme === 'bearer') {
                    lines.push(
                        `        token: string | (() => Promise<string>)`
                    )
                } else if (scheme.scheme === 'basic') {
                    lines.push(`        username: string`)
                    lines.push(`        password: string`)
                }
            } else if (scheme.type === 'apiKey') {
                lines.push(`        value: string | (() => Promise<string>)`)
            } else if (scheme.type === 'oauth2') {
                lines.push(
                    `        accessToken: string | (() => Promise<string>)`
                )
            }

            lines.push(`    }`)
        }

        lines.push('}')
        return lines.join('\n')
    }

    public generateMiddleware(): string {
        const lines: string[] = []
        lines.push(
            `export const createAuthMiddleware = (config: AuthConfig) => {`
        )
        lines.push(`    const middlewares: Middleware[] = []`)

        for (const [key, scheme] of Object.entries(this.schemes)) {
            lines.push(`    if (config.${key}) {`)
            lines.push(`        const mw = f.middleware()`)
            lines.push(`        mw.use(async (req, next) => {`)

            if (scheme.type === 'http') {
                if (scheme.scheme === 'bearer') {
                    lines.push(
                        `            const token = typeof config.${key}!.token === 'function'`
                    )
                    lines.push(`                ? await config.${key}!.token()`)
                    lines.push(`                : config.${key}!.token`)
                    lines.push(`            if (token) {`)
                    lines.push(
                        `                req.headers.set('Authorization', \`Bearer \${token}\`)`
                    )
                    lines.push(`            }`)
                } else if (scheme.scheme === 'basic') {
                    lines.push(
                        `            const { username, password } = config.${key}!`
                    )
                    lines.push(
                        `            const token = btoa(\`\${username}:\${password}\`)`
                    )
                    lines.push(
                        `            req.headers.set('Authorization', \`Basic \${token}\`)`
                    )
                }
            } else if (scheme.type === 'apiKey') {
                lines.push(
                    `            const value = typeof config.${key}!.value === 'function'`
                )
                lines.push(`                ? await config.${key}!.value()`)
                lines.push(`                : config.${key}!.value`)
                lines.push(`            if (value) {`)
                if (scheme.in === 'header') {
                    lines.push(
                        `                req.headers.set('${scheme.name}', value)`
                    )
                } else if (scheme.in === 'query') {
                    lines.push(`                const url = new URL(req.url)`)
                    lines.push(
                        `                url.searchParams.append('${scheme.name}', value)`
                    )
                    lines.push(`                req = new Request(url, req)`)
                } else if (scheme.in === 'cookie') {
                    lines.push(
                        `                req.headers.append('Cookie', \`\${'${scheme.name}'}=\${value}\`)`
                    )
                }
                lines.push(`            }`)
            } else if (scheme.type === 'oauth2') {
                lines.push(
                    `            const token = typeof config.${key}!.accessToken === 'function'`
                )
                lines.push(
                    `                ? await config.${key}!.accessToken()`
                )
                lines.push(`                : config.${key}!.accessToken`)
                lines.push(`            if (token) {`)
                lines.push(
                    `                req.headers.set('Authorization', \`Bearer \${token}\`)`
                )
                lines.push(`            }`)
            }

            lines.push(`            return next(req)`)
            lines.push(`        })`)
            lines.push(`        middlewares.push(mw)`)
            lines.push(`    }`)
        }

        lines.push(`    return middlewares`)
        lines.push(`}`)
        return lines.join('\n')
    }

    public generateFileContent(): string {
        return [
            `import { f, type Middleware } from '@freestylejs/fetch'`,
            '',
            this.generateAuthConfig(),
            '',
            this.generateMiddleware(),
        ].join('\n')
    }
}
