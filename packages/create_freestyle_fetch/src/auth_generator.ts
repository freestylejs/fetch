import type { OpenAPIV3_1 } from 'openapi-types'
import { AuthSchemeError } from './errors'
import { GENERATED_FILE_HEADER, quoteString } from './utils'

export interface SecurityScheme {
    type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect'
    name?: string // For apiKey
    in?: 'query' | 'header' | 'cookie' // For apiKey
    scheme?: string // For http (e.g., bearer, basic)
    description?: string
}

const HTTP_METHODS = [
    'get',
    'put',
    'post',
    'delete',
    'options',
    'head',
    'patch',
    'trace',
] as const

export class AuthGenerator {
    private schemes: Record<string, SecurityScheme> = {}
    private globalSecurity: Record<string, string[]>[] = []

    constructor(private spec: OpenAPIV3_1.Document) {
        this.analyze()
    }

    /**
     * Collects every security scheme name required by the document
     * (global `security` plus per-operation requirements).
     */
    private referencedSchemeNames(): Set<string> {
        const used = new Set<string>()
        const collect = (security?: Record<string, string[]>[]) => {
            for (const requirement of security ?? []) {
                for (const key of Object.keys(requirement)) used.add(key)
            }
        }
        collect(this.spec.security)
        for (const pathItem of Object.values(this.spec.paths ?? {})) {
            if (!pathItem || typeof pathItem !== 'object') continue
            const item = pathItem as Record<string, any>
            collect(item.security)
            for (const method of HTTP_METHODS) {
                const operation = item[method]
                if (operation && typeof operation === 'object') {
                    collect(operation.security)
                }
            }
        }
        return used
    }

    /**
     * G-12: returns why a resolved scheme cannot be mapped onto generated
     * middleware, or undefined when it is supported.
     */
    private unsupportedReason(scheme: SecurityScheme): string | undefined {
        if (scheme.type === 'http') {
            if (scheme.scheme !== 'bearer' && scheme.scheme !== 'basic') {
                return `http scheme "${scheme.scheme ?? '<missing>'}" is not supported`
            }
            return undefined
        }
        if (scheme.type === 'apiKey') {
            if (!scheme.name) return 'apiKey scheme is missing its "name"'
            if (
                scheme.in !== 'header' &&
                scheme.in !== 'query' &&
                scheme.in !== 'cookie'
            ) {
                return `apiKey location "${scheme.in ?? '<missing>'}" is not supported`
            }
            return undefined
        }
        if (scheme.type === 'oauth2') return undefined
        return `"${scheme.type}" type is not supported`
    }

    private analyze() {
        const referenced = this.referencedSchemeNames()

        if (this.spec.components?.securitySchemes) {
            for (const [key, schemeOrRef] of Object.entries(
                this.spec.components.securitySchemes
            )) {
                // G-11: dereference securitySchemes $refs before processing.
                let source: any = schemeOrRef
                if ('$ref' in schemeOrRef && schemeOrRef.$ref) {
                    const prefix = '#/components/securitySchemes/'
                    const ref = schemeOrRef.$ref as string
                    if (!ref.startsWith(prefix)) {
                        throw new AuthSchemeError(
                            `Unresolvable security scheme $ref "${ref}"`,
                            key,
                            'Point the $ref at an existing component under #/components/securitySchemes/'
                        )
                    }
                    const name = ref.slice(prefix.length).split('/')[0] ?? ''
                    const resolved = (
                        this.spec.components.securitySchemes as Record<
                            string,
                            any
                        >
                    )[name]
                    if (!resolved || '$ref' in resolved) {
                        throw new AuthSchemeError(
                            `Unresolvable security scheme $ref "${ref}"`,
                            key,
                            'Point the $ref at an existing component under #/components/securitySchemes/'
                        )
                    }
                    source = resolved
                }

                const scheme: SecurityScheme = {
                    type: source.type,
                    name: source.name,
                    in: source.in,
                    scheme: source.scheme,
                    description: source.description,
                }

                // G-12: unmatched type/scheme combinations must fail loudly
                // when the document actually requires them; unreferenced
                // declarations are excluded from the client surface instead
                // of emitting dead no-op middleware.
                const reason = this.unsupportedReason(scheme)
                if (reason) {
                    if (referenced.has(key)) {
                        throw new AuthSchemeError(
                            `Security scheme "${key}": ${reason}`,
                            key,
                            'Implement the scheme manually or use a supported type (apiKey, http bearer/basic, oauth2)'
                        )
                    }
                    continue
                }

                this.schemes[key] = scheme
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
                        `                req.headers.set(${quoteString(String(scheme.name))}, value)`
                    )
                } else if (scheme.in === 'query') {
                    lines.push(`                const url = new URL(req.url)`)
                    lines.push(
                        `                url.searchParams.append(${quoteString(String(scheme.name))}, value)`
                    )
                    lines.push(`                req = new Request(url, req)`)
                } else if (scheme.in === 'cookie') {
                    lines.push(
                        `                req.headers.append('Cookie', \`\${${quoteString(String(scheme.name))}}=\${value}\`)`
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
            GENERATED_FILE_HEADER,
            '',
            `import { f, type Middleware } from '@freestylejs/fetch'`,
            '',
            this.generateAuthConfig(),
            '',
            this.generateMiddleware(),
        ].join('\n')
    }
}
