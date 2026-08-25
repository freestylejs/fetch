import type { OpenAPIV3_1 } from 'openapi-types'
import { OperationValidationError } from './errors'
import type { InlineParserKind, InlineParserWrapper } from './schema_generator'
import { SchemaGenerator } from './schema_generator'
import {
    createJSDocComment,
    GENERATED_FILE_HEADER,
    quoteString,
    toPascalCase,
    toSafeIdentifier,
} from './utils'

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
    // Resolve through the collision map so api.ts references match types.ts exports.
    return schemaGenerator.getExportedName(rawName)
}

/**
 * Split-Surface: derives the deterministic operation base name used to name
 * promoted inline parsers. Prefers operationId, falling back to a
 * path+method derivation so specs without operationIds remain deterministic.
 */
function deriveOperationBase(
    operation: OpenAPIV3_1.OperationObject,
    method: string,
    path: string
): string {
    if (operation.operationId) {
        return toSafeIdentifier(toPascalCase(operation.operationId))
    }
    const segments = path
        .split('/')
        .filter(Boolean)
        .map((segment) => segment.replace(/[{}]/g, ''))
        .join('_')
    return toSafeIdentifier(`${toPascalCase(segments)}${toPascalCase(method)}`)
}

function generateBuilder(
    operation: OpenAPIV3_1.OperationObject,
    pathParams: (OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject)[],
    schemaGenerator: SchemaGenerator,
    method: string,
    path: string,
    spec: OpenAPIV3_1.Document
): string {
    let builder = 'f.builder().def_json()'

    const opBase = deriveOperationBase(operation, method, path)

    /**
     * Promotes an inline validator into the schemas surface and returns the
     * parser export name for api.ts binding. Generator failures surface as
     * explicit OperationValidationError instead of silent drops (EB-G1).
     */
    const registerParser = (
        kind: InlineParserKind,
        schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
        wrapper: InlineParserWrapper = 'none',
        hintSuffix: string = kind
    ): string => {
        try {
            return schemaGenerator.registerInlineParser({
                kind,
                opBase,
                schema,
                wrapper,
                hint: `${opBase} ${hintSuffix}`,
            })
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
        const properties: Record<string, any> = {}
        const required: string[] = []
        for (const param of queryParameters) {
            if (!param.schema) {
                throw new OperationValidationError(
                    `Missing schema for query parameter "${param.name}"`,
                    operation.operationId,
                    method,
                    path,
                    'Define a schema for the query parameter'
                )
            }
            properties[param.name] = param.schema
            if (param.required) required.push(param.name)
        }
        const parserName = registerParser(
            'searchParams',
            { type: 'object', properties, required },
            'none',
            'search params'
        )
        builder += `.def_searchparams(Schemas.${parserName})`
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
                builder += `.def_body(Schemas.parse${modelName})`
            } else {
                // EB-G1: inline JSON bodies are promoted behind the schemas
                // surface instead of being dropped.
                const parserName = registerParser('body', jsonContent.schema)
                builder += `.def_body(Schemas.${parserName})`
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
            const parserName = registerParser(
                'body',
                urlencodedContent.schema,
                'urlSearchParams'
            )
            builder += `.def_body(Schemas.${parserName})`
        } else if (formContent) {
            const parserName = registerParser(
                'body',
                formContent.schema ?? { type: 'object' },
                'formData'
            )
            builder += `.def_body(Schemas.${parserName})`
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
                builder += `.def_response(async ({ json }) => Schemas.parse${modelName}(await json()))`
            } else {
                // G-4: inline response schemas (including arrays of refs)
                // are promoted behind the schemas surface.
                const parserName = registerParser('response', schema)
                builder += `.def_response(async ({ json }) => Schemas.${parserName}(await json()))`
            }
        }
    }
    return builder
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

/** One emitted per-top-level-segment plain structure module. */
export interface GeneratedDomainFile {
    /** Output-relative posix path, e.g. `domains/v1.ts`. */
    fileName: string
    /** Exported structure const name, e.g. `v1Domain`. */
    exportName: string
    content: string
}

export interface RouterGenerationResult {
    /** Content of the single entry point `api.ts`. */
    apiFileContent: string
    /** Plain structure modules under `domains/`, in deterministic spec order. */
    domainFiles: GeneratedDomainFile[]
}

/**
 * Deterministic file/export naming for domain modules with collision
 * suffixes (`_N`) in spec order, mirroring the schema surface conventions.
 */
class DomainNameRegistry {
    private readonly usedFileNames = new Set<string>()
    private readonly usedExportNames = new Set<string>()

    public register(rawSegment: string): {
        fileName: string
        exportName: string
    } {
        const fileBase =
            toSafeIdentifier(
                rawSegment.replace(/^\$/, '').replace(/[^A-Za-z0-9_-]/g, '_') ||
                    '_'
            ) || '_'
        let fileName = `${fileBase}.ts`
        let suffix = 1
        while (this.usedFileNames.has(fileName)) {
            suffix += 1
            fileName = `${fileBase}_${suffix}.ts`
        }
        this.usedFileNames.add(fileName)

        const pascalName = toPascalCase(rawSegment.replace(/^\$/, ''))
        const camelDomain = `${pascalName.charAt(0).toLowerCase()}${pascalName.slice(1)}Domain`
        const exportBase = toSafeIdentifier(camelDomain) || '_Domain'
        let exportName = exportBase
        let exportSuffix = 1
        while (this.usedExportNames.has(exportName)) {
            exportSuffix += 1
            exportName = `${exportBase}_${exportSuffix}`
        }
        this.usedExportNames.add(exportName)

        return { fileName: `domains/${fileName}`, exportName }
    }
}

/**
 * Emits the router surfaces: one plain-structure module per top-level path
 * segment plus the `api.ts` entry point that composes them via spread.
 *
 * The interpreted client type is byte-identical to an inline literal:
 * spreading object literals is pure structural composition, so
 * `BuildRouterUrlFromStructure` sees the exact same shape.
 */
export function generateRouterSurfaces(
    parsedPaths: Record<string, any>,
    spec: OpenAPIV3_1.Document,
    schemaGenerator: SchemaGenerator = new SchemaGenerator(spec)
): RouterGenerationResult {
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
                        spec
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

    const registry = new DomainNameRegistry()
    const domainFiles: GeneratedDomainFile[] = []
    const spreadExpressions: string[] = []

    for (const segment of Object.keys(parsedPaths)) {
        const { fileName, exportName } = registry.register(segment)
        const segmentNode = parsedPaths[segment]
        // Segment-level JSDoc matches what the inline emitter produced.
        const segmentJsDoc = createJSDocComment(
            segmentNode.summary,
            segmentNode.description
        )
        // The exported structure keeps its own top-level segment key, so the
        // spread composition in api.ts reproduces the exact inline shape.
        const structureBody = `${segmentJsDoc}${quoteString(segment)}: {\n${buildRouterObject(
            segmentNode,
            segment
        )}\n}`
        domainFiles.push({
            fileName,
            exportName,
            content: `${GENERATED_FILE_HEADER}

import { f } from '@freestylejs/fetch';
import * as Schemas from '../schemas';

/**
 * Plain router structure for the '${segment.replace(/\*\//g, '* /')}' domain.
 * Leaves are uncompiled f.builder() chains; api.ts composes them.
 */
export const ${exportName} = {
${structureBody}
};
`,
        })
        spreadExpressions.push(`...${exportName}`)
    }

    const baseUrl = resolveServerBaseUrl(spec)

    // Empty-spec edge: no domain modules, empty literal structure.
    const structureArgument =
        spreadExpressions.length > 0
            ? `{ ${spreadExpressions.join(', ')} }`
            : '{}'

    const apiImports = [`import { f } from '@freestylejs/fetch';`]
    if (domainFiles.length > 0) {
        for (const domain of domainFiles) {
            apiImports.push(
                `import { ${domain.exportName} } from './${domain.fileName.replace(/\.ts$/, '')}';`
            )
        }
    }
    apiImports.push(
        `import { createAuthMiddleware, AuthConfig } from './auth';`
    )

    const apiFileContent = `${GENERATED_FILE_HEADER}

${apiImports.join('\n')}

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || ${quoteString(baseUrl)},
        middleware
    }, ${structureArgument});
}`

    return { apiFileContent, domainFiles }
}

export function generateRouter(
    parsedPaths: Record<string, any>,
    spec: OpenAPIV3_1.Document,
    schemaGenerator: SchemaGenerator = new SchemaGenerator(spec)
): string {
    return generateRouterSurfaces(parsedPaths, spec, schemaGenerator)
        .apiFileContent
}
