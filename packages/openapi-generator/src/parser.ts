import { readFileSync } from 'fs-extra'
import type { OpenAPIV3 } from 'openapi-types'

export function parseOpenApiSpec(filePath: string): OpenAPIV3.Document {
    const fileContent = readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
}

export function parsePaths(spec: OpenAPIV3.Document): Record<string, any> {
    const paths = spec.paths
    const result: Record<string, any> = {}

    for (const path in paths) {
        const pathItem = paths[path]
        if (!pathItem) {
            continue
        }

        const pathParts = path.split('/').filter((p) => p)
        let current = result

        for (let i = 0; i < pathParts.length; i++) {
            let part = pathParts[i]
            if (!part) {
                continue
            }

            if (part.startsWith('{') && part.endsWith('}')) {
                part = `$${part.slice(1, -1)}`
            }

            if (!current[part]) {
                current[part] = {}
            }

            if (i === pathParts.length - 1) {
                current[part] = { ...current[part], ...pathItem }
            }

            current = current[part]
        }
    }

    return result
}
