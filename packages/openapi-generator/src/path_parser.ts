import SwaggerParser from '@apidevtools/swagger-parser'
import type { OpenAPIV3_1 } from 'openapi-types'
import { SpecParsingError } from './errors'

/**
 * Parse an OpenAPI specification file (JSON or YAML)
 * Automatically resolves all $ref references (local and external)
 *
 * @param filePath - Absolute or relative path to the OpenAPI spec file (.json, .yaml, or .yml)
 * @returns Fully dereferenced OpenAPI 3.1 document
 */
export async function parseOpenApiSpec(
    filePath: string
): Promise<OpenAPIV3_1.Document> {
    try {
        const api = (await SwaggerParser.bundle(
            filePath
        )) as OpenAPIV3_1.Document

        // Validate required OpenAPI fields
        if (!api.openapi) {
            throw new SpecParsingError(
                'Missing required "openapi" version field',
                filePath,
                undefined,
                undefined,
                'Add "openapi: 3.0.0" or "openapi: 3.1.0" at the top of your spec'
            )
        }

        if (!api.info) {
            throw new SpecParsingError(
                'Missing required "info" section',
                filePath,
                undefined,
                undefined,
                'Add an "info" section with "title" and "version" fields'
            )
        }

        return api
    } catch (error) {
        // If already a SpecParsingError, re-throw
        if (error instanceof SpecParsingError) {
            throw error
        }

        if (error instanceof Error) {
            const isYaml =
                filePath.endsWith('.yaml') || filePath.endsWith('.yml')

            // Parse YAML-specific errors for line numbers
            let line: number | undefined
            const lineMatch = error.message.match(/line (\d+)/)
            if (lineMatch && lineMatch[1]) {
                line = Number.parseInt(lineMatch[1], 10)
            }

            // Provide contextual suggestions
            let suggestion: string | undefined
            if (isYaml) {
                if (error.message.includes('duplicate')) {
                    suggestion = 'Check for duplicate keys in your YAML file'
                } else if (
                    error.message.includes('indent') ||
                    error.message.includes('indentation')
                ) {
                    suggestion =
                        'YAML requires consistent indentation (use spaces, not tabs)'
                } else if (error.message.includes('mapping')) {
                    suggestion =
                        'Check YAML structure - ensure proper key:value pairs and indentation'
                } else {
                    suggestion =
                        'Check YAML syntax - common issues: unclosed quotes, incorrect indentation, or missing colons'
                }
            } else if (error.message.includes('JSON')) {
                suggestion =
                    'Check for missing commas, brackets, or quotes in your JSON file'
            } else if (
                error.message.includes('ENOENT') ||
                error.message.includes('no such file')
            ) {
                suggestion = `File not found. Check that "${filePath}" exists and is accessible`
            } else if (error.message.includes('$ref')) {
                suggestion =
                    'Check that all $ref paths point to valid schemas or files'
            }

            throw new SpecParsingError(
                error.message,
                filePath,
                line,
                undefined,
                suggestion
            )
        }

        throw error
    }
}

export function parsePaths(spec: OpenAPIV3_1.Document): Record<string, any> {
    const paths = spec.paths
    if (!paths) return {}
    const result: Record<string, any> = {}

    for (const path in paths) {
        const pathItem = paths[path]
        if (!pathItem) continue

        const pathParts = path.split('/').filter((p) => p)
        let current = result

        for (let i = 0; i < pathParts.length; i++) {
            let part = pathParts[i]
            if (!part) continue

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
