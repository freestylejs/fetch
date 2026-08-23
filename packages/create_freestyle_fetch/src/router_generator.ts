import type { OpenAPIV3_1 } from 'openapi-types'
import { OperationValidationError } from './errors'
import type { OutputContext } from './schema_generator'
import { SchemaGenerator } from './schema_generator'
import { createJSDocComment, quoteString } from './utils'

function isReferenceObject(obj: any): obj is OpenAPIV3_1.ReferenceObject {
    return obj && '$ref' in obj
}

type ComponentSection = 'requestBodies' | 'responses' | 'securitySchemes'

/**
 * Resolves a local `$ref` against `#/components/<section>/<name>`.
 * Returns undefined when the ref points elsewhere or cannot be resolved;
 * callers must surface that as an explicit error (EB-G1: no silent skips).
 */
export function resolveComponentRef(
    spec: OpenAPIV3_1.Document,
    section: ComponentSection,
    ref: string
): any | undefined {
    const prefix = `#/components/${section}/`
    if (!ref.startsWith(prefix)) return undefined
    const name = ref.slice(prefix.length).split('/')[0]
    if (!name) return undefined
    const components = spec.components as any
    const resolved = components?.[section]?.[name]
    if (!resolved || isReferenceObject(resolved)) return undefined
    return resolved
}

/**
 * G-6: distinguishes a real OperationObject from a nested PathItem that
 * happens to sit under an HTTP-method-looking key (e.g. stripe's
 * `/v1/apps/secrets/delete` path). An operation must expose `responses`
 * (or at least operationId/summary/description); otherwise the value is
 * treated as a path node and recursed into.
 */
function isOperationObject(value: any): value is OpenAPIV3_1.OperationObject {
    return (
        Boolean(value) &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !isReferenceObject(value) &&
        (value.responses !== undefined ||
            value.operationId !== undefined ||
            value.summary !== undefined ||
            value.description !== undefined)
    )
}

function requireModelExportName(
    ref: string,
    schemaGenerator: SchemaGenerator,
    operation: OpenAPIV3_1.OperationObject,
    method: string,
    path: string
): string {
    const rawName = ref.split('/').pop()
    if (!rawName) {
        throw new OperationValidationError(
            `Malformed $ref "${ref}": empty model name`,
            operation.operationId,
            method,
            path,
            'Point the $ref at a named component schema, e.g. #/components/schemas/User'
        )
    }
    // Resolve through the collision map so api.ts references match models.ts exports.
    return schemaGenerator.getExportedName(rawName)
}

function generateBuilder(
    operation: OpenAPIV3_1.OperationObject,
    pathParams: (OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject)[],
    schemaGenerator: SchemaGenerator,
    method: string,
    path: string,
    spec: OpenAPIV3_1.Document,
    features: Set<RouterFeature>
): string {
    let builder = 'f.builder().def_json()'

    const outputContext: OutputContext = 'api'

    /**
     * G-4: generates a Zod expression for an inline (non-$ref) schema in the
     * api.ts context. Any generator failure is surfaced as an explicit
     * OperationValidationError instead of silently dropping the schema.
     */
    const inlineZodExpression = (
        schema: OpenAPIV3_1.SchemaObject,
        hint: string
    ): string => {
        try {
            return schemaGenerator.generateZodSchema(
                schema,
                hint,
                outputContext
            )
        } catch (error) {
            throw new OperationValidationError(
                `Failed to generate inline schema expression: ${
                    error instanceof Error ? error.message : String(error)
                }`,
                operation.operationId,
                method,
                path,
                'Simplify the schema or move it to components.schemas and reference it via $ref'
            )
        }
    }

    const allParameters = [...pathParams]
    if (operation.parameters) {
        const pathParamNames = new Set(
            pathParams.map((p) => (isReferenceObject(p) ? null : p.name))
        )
        operation.parameters.forEach((opParam) => {
            if (
                isReferenceObject(opParam) ||
                !pathParamNames.has(opParam.name)
            ) {
                allParameters.push(opParam)
            }
        })
    }

    const queryParameters = allParameters.filter(
        (p) => !isReferenceObject(p) && p.in === 'query'
    ) as OpenAPIV3_1.ParameterObject[]
    if (queryParameters.length > 0) {
        const queryParamsString = queryParameters
            .map((param) => {
                if (!param.schema) {
                    throw new OperationValidationError(
                        `Missing schema for query parameter "${param.name}"`,
                        operation.operationId,
                        method,
                        path,
                        'Define a schema for the query parameter'
                    )
                }
                const zodType = schemaGenerator.generateZodSchema(
                    param.schema as OpenAPIV3_1.SchemaObject,
                    param.name,
                    outputContext
                )
                const finalType = param.required
                    ? zodType
                    : `${zodType}.optional()`
                return `${quoteString(param.name)}: ${finalType}`
            })
            .join(', ')
        builder += `.def_searchparams(z.object({ ${queryParamsString} }).parse)`
    }

    if (operation.requestBody) {
        // G-1: a requestBody expressed as $ref must be dereferenced through
        // components/requestBodies before content negotiation happens.
        let requestBody: OpenAPIV3_1.RequestBodyObject
        if (isReferenceObject(operation.requestBody)) {
            const resolved = resolveComponentRef(
                spec,
                'requestBodies',
                operation.requestBody.$ref
            )
            if (!resolved) {
                throw new OperationValidationError(
                    `Unresolvable requestBody $ref "${operation.requestBody.$ref}"`,
                    operation.operationId,
                    method,
                    path,
                    'Point the $ref at an existing component under #/components/requestBodies/'
                )
            }
            requestBody = resolved as OpenAPIV3_1.RequestBodyObject
        } else {
            requestBody = operation.requestBody
        }

        const jsonContent = requestBody.content?.['application/json']
        const urlencodedContent =
            requestBody.content?.['application/x-www-form-urlencoded']
        const formContent = requestBody.content?.['multipart/form-data']

        // Priority: application/json > x-www-form-urlencoded > multipart
        if (jsonContent) {
            if (!jsonContent.schema) {
                throw new OperationValidationError(
                    'application/json requestBody is missing its schema',
                    operation.operationId,
                    method,
                    path,
                    'Define a schema for the application/json media type'
                )
            }
            if (isReferenceObject(jsonContent.schema)) {
                const modelName = requireModelExportName(
                    jsonContent.schema.$ref,
                    schemaGenerator,
                    operation,
                    method,
                    path
                )
                builder += `.def_body(Model.${modelName}.parse)`
            } else {
                // EB-G1: inline JSON bodies are reflected via an inline Zod
                // expression instead of being dropped.
                const expr = inlineZodExpression(
                    jsonContent.schema,
                    operation.operationId || `${method} ${path} body`
                )
                builder += `.def_body((body) => ${expr}.parse(body))`
            }
        } else if (urlencodedContent) {
            // G-2: form-urlencoded bodies become URLSearchParams payloads.
            if (!urlencodedContent.schema) {
                throw new OperationValidationError(
                    'application/x-www-form-urlencoded requestBody is missing its schema',
                    operation.operationId,
                    method,
                    path,
                    'Define a schema for the application/x-www-form-urlencoded media type'
                )
            }
            const baseExpr = isReferenceObject(urlencodedContent.schema)
                ? `Model.${requireModelExportName(
                      urlencodedContent.schema.$ref,
                      schemaGenerator,
                      operation,
                      method,
                      path
                  )}`
                : inlineZodExpression(
                      urlencodedContent.schema,
                      operation.operationId || `${method} ${path} body`
                  )
            features.add('urlencodedHelper')
            builder += `.def_body((body) => new URLSearchParams(${baseExpr}.transform(toUrlSearchParams).parse(body)))`
        } else if (formContent) {
            builder += `.def_body(z.instanceof(FormData).parse)`
        } else if (
            requestBody.content &&
            Object.keys(requestBody.content).length > 0
        ) {
            throw new OperationValidationError(
                `Unsupported requestBody content types: ${Object.keys(
                    requestBody.content
                ).join(', ')}`,
                operation.operationId,
                method,
                path,
                'Add an application/json, application/x-www-form-urlencoded, or multipart/form-data representation'
            )
        }
    }

    let response:
        | OpenAPIV3_1.ResponseObject
        | OpenAPIV3_1.ReferenceObject
        | undefined =
        operation.responses?.['200'] || operation.responses?.['201']
    if (response) {
        // G-3: a response expressed as $ref must be dereferenced through
        // components/responses before its content is inspected.
        if (isReferenceObject(response)) {
            const resolved = resolveComponentRef(
                spec,
                'responses',
                response.$ref
            )
            if (!resolved) {
                throw new OperationValidationError(
                    `Unresolvable response $ref "${response.$ref}"`,
                    operation.operationId,
                    method,
                    path,
                    'Point the $ref at an existing component under #/components/responses/'
                )
            }
            response = resolved as OpenAPIV3_1.ResponseObject
        }

        const mediaTypeObject = response.content?.['application/json']
        if (mediaTypeObject?.schema) {
            const schema = mediaTypeObject.schema
            if (isReferenceObject(schema)) {
                const modelName = requireModelExportName(
                    schema.$ref,
                    schemaGenerator,
                    operation,
                    method,
                    path
                )
                builder += `.def_response(async ({ json }) => Model.${modelName}.parse(await json()))`
            } else if (
                schema.type === 'array' &&
                schema.items &&
                isReferenceObject(schema.items)
            ) {
                const modelName = requireModelExportName(
                    schema.items.$ref,
                    schemaGenerator,
                    operation,
                    method,
                    path
                )
                builder += `.def_response(async ({ json }) => z.array(Model.${modelName}).parse(await json()))`
            } else {
                // G-4: inline response schemas become explicit Zod parse
                // expressions rather than being silently skipped.
                const expr = inlineZodExpression(
                    schema,
                    operation.operationId || `${method} ${path} response`
                )
                builder += `.def_response(async ({ json }) => ${expr}.parse(await json()))`
            }
        }
    }
    return builder
}

/**
 * Optional runtime helpers that are emitted into api.ts only when at least
 * one operation needs them.
 */
type RouterFeature = 'urlencodedHelper'

const ROUTER_FEATURE_HELPERS: Record<RouterFeature, string> = {
    // G-2: URLSearchParams only accepts string records, so parsed form values
    // (numbers, booleans, nested objects) are stringified before encoding.
    urlencodedHelper: `const toUrlSearchParams = (value: Record<string, unknown>): Record<string, string> =>
	Object.fromEntries(
		Object.entries(value).map(([key, entry]) => [
			key,
			typeof entry === 'string' ? entry : JSON.stringify(entry),
		])
	)`,
}

/**
 * G-10: resolves `{var}` placeholders in servers[0].url against
 * servers[0].variables[x].default. Placeholders without a default remain
 * literal (SpecValidator reports them as a warning).
 */
export function resolveServerBaseUrl(spec: OpenAPIV3_1.Document): string {
    const server = spec.servers?.[0]
    if (!server?.url) return ''
    return server.url.replace(/\{([^{}]+)\}/g, (match, name: string) => {
        const variable = server.variables?.[name]
        if (!variable || variable.default === undefined) return match
        return String(variable.default)
    })
}

export function generateRouter(
    parsedPaths: Record<string, any>,
    spec: OpenAPIV3_1.Document
): string {
    const httpMethods = new Set([
        'get',
        'put',
        'post',
        'delete',
        'options',
        'head',
        'patch',
        'trace',
    ])
    const openApiMetadataKeys = new Set([
        'summary',
        'description',
        'parameters',
        'servers',
        '$ref',
    ])

    const schemaGenerator = new SchemaGenerator(spec)
    const features = new Set<RouterFeature>()

    function buildRouterObject(
        pathNode: Record<string, any>,
        currentPath = ''
    ): string {
        const parts: string[] = []
        const pathLevelParams = pathNode.parameters || []

        for (const key in pathNode) {
            const value = pathNode[key]
            if (
                httpMethods.has(key.toLowerCase()) &&
                isOperationObject(value)
            ) {
                const jsDoc = createJSDocComment(
                    value.summary,
                    value.description
                )
                parts.push(
                    `${jsDoc}${quoteString(key.toUpperCase())}: ${generateBuilder(
                        value,
                        pathLevelParams,
                        schemaGenerator,
                        key,
                        currentPath,
                        spec,
                        features
                    )}`
                )
            } else if (
                typeof value === 'object' &&
                value !== null &&
                !openApiMetadataKeys.has(key)
            ) {
                const nextPath = currentPath ? `${currentPath}/${key}` : key
                const jsDoc = createJSDocComment(
                    value.summary,
                    value.description
                )
                parts.push(
                    `${jsDoc}${quoteString(key)}: {\n${buildRouterObject(value, nextPath)}\n}`
                )
            }
        }
        return parts.join(',\n')
    }

    const routerObject = `{\n${buildRouterObject(parsedPaths)}\n}`
    const baseUrl = resolveServerBaseUrl(spec)

    const helperLines = [...features].map((f) => ROUTER_FEATURE_HELPERS[f])

    return `import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';
import { createAuthMiddleware, AuthConfig } from './auth';
${helperLines.length ? `\n${helperLines.join('\n\n')}\n` : ''}
export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || ${quoteString(baseUrl)},
        middleware
    }, ${routerObject});
}`
}
