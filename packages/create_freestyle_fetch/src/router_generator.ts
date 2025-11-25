import type { OpenAPIV3_1 } from 'openapi-types'
import { OperationValidationError } from './errors'
import { SchemaGenerator } from './schema_generator'
import { toPascalCase } from './utils'

function isReferenceObject(obj: any): obj is OpenAPIV3_1.ReferenceObject {
    return obj && '$ref' in obj
}

function generateBuilder(
    operation: OpenAPIV3_1.OperationObject,
    pathParams: (OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject)[],
    schemaGenerator: SchemaGenerator,
    method: string,
    path: string
): string {
    let builder = 'f.builder().def_json()'

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
                    param.name
                )
                const finalType = param.required
                    ? zodType
                    : `${zodType}.optional()`
                return `${param.name}: ${finalType}`
            })
            .join(', ')
        builder += `.def_searchparams(z.object({ ${queryParamsString} }).parse)`
    }

    if (operation.requestBody && !isReferenceObject(operation.requestBody)) {
        const requestBody =
            operation.requestBody as OpenAPIV3_1.RequestBodyObject
        const jsonContent = requestBody.content?.['application/json']
        const formContent = requestBody.content?.['multipart/form-data']

        if (jsonContent?.schema && isReferenceObject(jsonContent.schema)) {
            const modelName = toPascalCase(
                jsonContent.schema.$ref.split('/').pop() || ''
            )
            builder += `.def_body(Model.${modelName}.parse)`
        } else if (formContent) {
            builder += `.def_body(z.instanceof(FormData).parse)`
        }
    }

    const response =
        operation.responses?.['200'] || operation.responses?.['201']
    if (response && !isReferenceObject(response)) {
        const mediaTypeObject = response.content?.['application/json']
        if (mediaTypeObject?.schema) {
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

    function buildRouterObject(
        pathNode: Record<string, any>,
        currentPath = ''
    ): string {
        const parts: string[] = []
        const pathLevelParams = pathNode.parameters || []

        for (const key in pathNode) {
            const value = pathNode[key]
            if (httpMethods.has(key.toLowerCase())) {
                parts.push(
                    `'${key.toUpperCase()}': ${generateBuilder(
                        value,
                        pathLevelParams,
                        schemaGenerator,
                        key,
                        currentPath
                    )}`
                )
            } else if (
                typeof value === 'object' &&
                value !== null &&
                !openApiMetadataKeys.has(key)
            ) {
                const nextPath = currentPath ? `${currentPath}/${key}` : key
                parts.push(
                    `'${key}': {\n${buildRouterObject(value, nextPath)}\n}`
                )
            }
        }
        return parts.join(',\n')
    }

    const routerObject = `{\n${buildRouterObject(parsedPaths)}\n}`
    const baseUrl = spec.servers && spec.servers[0] ? spec.servers[0].url : ''

    return `import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';

export const api = f.router('${baseUrl}', ${routerObject});`
}
