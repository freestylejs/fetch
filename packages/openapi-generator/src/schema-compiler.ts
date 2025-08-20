import { camelCase, upperFirst } from 'lodash'
import type { OpenAPIV3 } from 'openapi-types'

function isReferenceObject(obj: any): obj is OpenAPIV3.ReferenceObject {
    return obj && '$ref' in obj
}

function toPascalCase(str: string): string {
    return upperFirst(camelCase(str))
}

function mapOpenApiTypeToZod(
    property: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
): string {
    if (isReferenceObject(property)) {
        const schemaName = property.$ref.split('/').pop()
        if (!schemaName) {
            throw new Error(`Invalid $ref: ${property.$ref}`)
        }
        return `${toPascalCase(schemaName)}`
    }

    switch (property.type) {
        case 'string':
            let zodString = 'z.string()'
            if (property.format === 'date-time') {
                zodString += '.datetime()'
            } else if (property.format === 'email') {
                zodString += '.email()'
            } else if (property.format === 'uri') {
                zodString += '.url()'
            } else if (property.format === 'uuid') {
                zodString += '.uuid()'
            }
            return zodString
        case 'number':
        case 'integer':
            return 'z.number()'
        case 'boolean':
            return 'z.boolean()'
        case 'array':
            if (!property.items) {
                throw new Error('Array schema must have items defined.')
            }
            return `z.array(${mapOpenApiTypeToZod(property.items)})`
        case 'object':
            if (property.properties) {
                const properties = Object.entries(property.properties)
                    .map(([key, value]) => {
                        const isRequired = property.required?.includes(key)
                        const zodType = mapOpenApiTypeToZod(value)
                        return `${key}: ${isRequired ? zodType : `${zodType}.optional()`}`
                    })
                    .join(',\n')
                return `z.object({
${properties}
})`
            }
            return 'z.object({})'
        default:
            return 'z.any()'
    }
}

export function generateModels(spec: OpenAPIV3.Document): string {
    if (!spec.components || !spec.components.schemas) {
        return ''
    }

    const schemas = Object.entries(spec.components.schemas)
    const modelStrings: string[] = []

    modelStrings.push(`import { z } from 'zod';`)

    for (const [name, schema] of schemas) {
        const pascalName = toPascalCase(name)
        const zodSchema = mapOpenApiTypeToZod(schema)

        modelStrings.push(`export const ${pascalName} = ${zodSchema};`)
        modelStrings.push(
            `export type ${pascalName}Model = z.infer<typeof ${pascalName}>;
`
        )
    }

    return modelStrings.join('\n\n')
}

function generateBuilder(operation: OpenAPIV3.OperationObject): string {
    let builder = 'f.builder().def_json()'

    if (operation.requestBody) {
        const requestBody = operation.requestBody as OpenAPIV3.RequestBodyObject
        const mediaTypeObject = requestBody.content?.['application/json']
        if (mediaTypeObject && mediaTypeObject.schema) {
            const schema = mediaTypeObject.schema
            if (isReferenceObject(schema)) {
                const modelName = toPascalCase(
                    schema.$ref.split('/').pop() || ''
                )
                builder += `.def_body(Model.${modelName}.parse)`
            }
        }
    }

    const response = operation.responses['200'] || operation.responses['201']
    if (response && !isReferenceObject(response)) {
        const mediaTypeObject = response.content?.['application/json']
        if (mediaTypeObject && mediaTypeObject.schema) {
            const schema = mediaTypeObject.schema
            if (isReferenceObject(schema)) {
                const modelName = toPascalCase(
                    schema.$ref.split('/').pop() || ''
                )
                builder += `.def_response(async ({ json }) => Model.${modelName}.parse(await json()))`
            } else if (
                schema.type === 'array' &&
                schema.items &&
                isReferenceObject(schema.items)
            ) {
                const modelName = toPascalCase(
                    schema.items.$ref.split('/').pop() || ''
                )
                builder += `.def_response(async ({ json }) => z.array(Model.${modelName}).parse(await json()))`
            }
        }
    }

    return builder
}

export function generateRouter(
    parsedPaths: Record<string, any>,
    spec: OpenAPIV3.Document
): string {
    function buildRouterObject(paths: Record<string, any>): string {
        const parts: string[] = []
        for (const key in paths) {
            const value = paths[key]
            if (
                key.toUpperCase() === 'GET' ||
                key.toUpperCase() === 'POST' ||
                key.toUpperCase() === 'PUT' ||
                key.toUpperCase() === 'DELETE'
            ) {
                parts.push(`'${key.toUpperCase()}': ${generateBuilder(value)}`)
            } else {
                // If it's not an HTTP method, it must be a nested path segment or an OpenAPI property.
                // We only recurse into nested path segments.
                // Filter out properties of OpenAPIV3.PathItemObject or OpenAPIV3.OperationObject
                // that are not HTTP methods.
                const isOperationOrPathItemProperty = (propKey: string) => {
                    const lowerKey = propKey.toLowerCase()
                    return [
                        'summary',
                        'description',
                        'parameters',
                        'responses',
                        'requestbody',
                        'callbacks',
                        'security',
                        'servers',
                        'tags',
                        'externaldocs',
                        'deprecated',
                        'operationid',
                        'webhooks',
                        'components',
                        'info',
                        'jsonSchemaDialect',
                        'x-version-lifecycle', // Add other top-level or common non-path properties
                    ].includes(lowerKey)
                }

                if (
                    typeof value === 'object' &&
                    value !== null &&
                    !isOperationOrPathItemProperty(key)
                ) {
                    parts.push(`'${key}': {${buildRouterObject(value)}}`)
                }
            }
        }
        return parts.join(',\n')
    }

    const routerObject = `{${buildRouterObject(parsedPaths)}}`
    const baseUrl =
        spec.servers && spec.servers[0]
            ? spec.servers[0].url
            : 'https://api.example.com'

    return `import { f } from '@metal-box/fetch';\nimport { z } from 'zod';\nimport * as Model from './models';\n\nexport const api = f.router('${baseUrl}', ${routerObject});`
}
