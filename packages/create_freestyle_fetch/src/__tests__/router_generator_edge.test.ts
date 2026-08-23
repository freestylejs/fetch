import type { OpenAPIV3_1 } from 'openapi-types'
import { describe, expect, it } from 'vitest'
import { OperationValidationError } from '../errors'
import { parsePaths } from '../path_parser'
import { generateRouter } from '../router_generator'
import { SchemaGenerator } from '../schema_generator'

describe('router_generator edge cases', () => {
    describe('Reference Edge Cases', () => {
        it('should handle empty $ref (pathParams with ref)', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users': {
                        parameters: [
                            { $ref: '' } as any, // Edge case: empty ref
                        ],
                        get: {
                            responses: { '200': { description: 'OK' } },
                        },
                    },
                },
            }

            // This should not throw, even with unusual ref
            const result = generateRouter({ users: spec.paths['/users'] }, spec)
            expect(result).toContain('export const createClient')
        })

        it('should throw OperationValidationError for request body with malformed $ref', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {},
                components: {
                    schemas: {},
                },
            }

            const parsedPaths = {
                users: {
                    POST: {
                        requestBody: {
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/' }, // Ends with slash, pop() returns empty
                                },
                            },
                        },
                        responses: { '201': { description: 'Created' } },
                    },
                },
            }

            // Empty modelName is a spec defect and must fail loudly instead of
            // emitting invalid code like `Model..parse`
            expect(() => generateRouter(parsedPaths, spec)).toThrow(
                OperationValidationError
            )
            expect(() => generateRouter(parsedPaths, spec)).toThrow(
                /Malformed \$ref/
            )
        })

        it('should throw OperationValidationError for response with malformed $ref', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {},
                components: {
                    schemas: {},
                },
            }

            const parsedPaths = {
                users: {
                    GET: {
                        responses: {
                            '200': {
                                content: {
                                    'application/json': {
                                        schema: {
                                            $ref: '#/components/schemas/',
                                        }, // Ends with slash
                                    },
                                },
                            },
                        },
                    },
                },
            }

            expect(() => generateRouter(parsedPaths, spec)).toThrow(
                OperationValidationError
            )
        })

        it('should throw OperationValidationError for array response with malformed $ref in items', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {},
                components: {
                    schemas: {},
                },
            }

            const parsedPaths = {
                users: {
                    GET: {
                        responses: {
                            '200': {
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'array',
                                            items: { $ref: '#/' }, // Very short ref, pop() returns empty
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }

            expect(() => generateRouter(parsedPaths, spec)).toThrow(
                OperationValidationError
            )
        })

        it('should handle pathParams that are reference objects', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users': {
                        parameters: [
                            {
                                $ref: '#/components/parameters/UserId',
                            } as OpenAPIV3_1.ReferenceObject,
                            {
                                name: 'filter',
                                in: 'query',
                                schema: { type: 'string' },
                            } as OpenAPIV3_1.ParameterObject,
                        ],
                        get: {
                            responses: { '200': { description: 'OK' } },
                        },
                    },
                },
            }

            const result = generateRouter({ users: spec.paths['/users'] }, spec)
            // Should process the pathParams correctly even when some are $ref
            expect(result).toContain('export const createClient')
        })

        it('should handle operation parameters that duplicate path parameters', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {},
            }

            const parsedPaths = {
                users: {
                    parameters: [
                        {
                            name: 'shared',
                            in: 'query',
                            schema: { type: 'string' },
                        },
                    ],
                    GET: {
                        parameters: [
                            {
                                name: 'shared',
                                in: 'query',
                                schema: { type: 'string' },
                            }, // Duplicate
                            {
                                name: 'specific',
                                in: 'query',
                                schema: { type: 'number' },
                            },
                        ],
                        responses: { '200': { description: 'OK' } },
                    },
                },
            }

            const result = generateRouter(parsedPaths, spec)
            // Should not duplicate the 'shared' parameter
            const sharedCount = (result.match(/'shared':/g) || []).length
            expect(sharedCount).toBe(1) // Should only appear once
        })

        it('should handle operation with only reference parameters', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {},
            }

            const parsedPaths = {
                users: {
                    GET: {
                        parameters: [
                            {
                                $ref: '#/components/parameters/Param1',
                            } as OpenAPIV3_1.ReferenceObject,
                            {
                                $ref: '#/components/parameters/Param2',
                            } as OpenAPIV3_1.ReferenceObject,
                        ],
                        responses: { '200': { description: 'OK' } },
                    },
                },
            }

            const result = generateRouter(parsedPaths, spec)
            // Should handle all reference parameters
            expect(result).toContain('export const createClient')
        })
    })

    describe('G-6: PathItem vs operation disambiguation', () => {
        it('should preserve real operations under method-named paths and not emit phantom methods', () => {
            // Mirrors stripe's `/v1/apps/secrets/delete`: the last segment
            // looks like an HTTP method but is a PathItem containing POST.
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/v1/secrets': {
                        get: {
                            operationId: 'GetSecrets',
                            responses: { '200': { description: 'OK' } },
                        },
                        post: {
                            operationId: 'CreateSecret',
                            responses: { '201': { description: 'Created' } },
                        },
                    },
                    '/v1/secrets/delete': {
                        post: {
                            operationId: 'DeleteSecretsWhere',
                            responses: { '200': { description: 'OK' } },
                        },
                    },
                },
            }

            const result = generateRouter(parsePaths(spec), spec)

            // The real operation must be preserved as a nested node...
            expect(result).toContain("'delete': {\n'POST'")
            // ...and no phantom DELETE may be generated at the secrets level
            expect(result).not.toMatch(
                /'DELETE': f\.builder\(\)\.def_json\(\),\n'delete': \{/
            )
            expect(result).toContain("'GET':")
            expect(result).toContain("'POST':")
        })

        it('should still emit DELETE for genuine delete operations', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/v1/secrets/{id}': {
                        delete: {
                            operationId: 'DeleteSecret',
                            responses: { '200': { description: 'OK' } },
                        },
                    },
                },
            }

            const result = generateRouter(parsePaths(spec), spec)
            expect(result).toContain("'DELETE': f.builder()")
            // the {id} segment stays a plain node wrapping the operation
            expect(result).toContain("'$id': {\n'DELETE'")
            expect(result).not.toContain("'DELETE': {")
        })
    })

    describe('G-5: $ref query parameters use Model namespace', () => {
        it('should qualify $ref query param schemas with Model.', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/calls': {
                        get: {
                            operationId: 'ListCalls',
                            parameters: [
                                {
                                    name: 'aggregated_by',
                                    in: 'query',
                                    schema: {
                                        $ref: '#/components/schemas/AggregatedBy',
                                    },
                                },
                            ],
                            responses: { '200': { description: 'OK' } },
                        },
                    },
                },
                components: {
                    schemas: {
                        AggregatedBy: {
                            type: 'string',
                            enum: ['day'],
                        },
                    },
                },
            }

            const result = generateRouter(parsePaths(spec), spec)
            expect(result).toContain(
                `'aggregated_by': Model.AggregatedBy.optional()`
            )
        })

        it('should qualify nested $refs inside inline object query params', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/items': {
                        get: {
                            operationId: 'ListItems',
                            parameters: [
                                {
                                    name: 'filter',
                                    in: 'query',
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            owner: {
                                                $ref: '#/components/schemas/Owner',
                                            },
                                        },
                                    },
                                },
                            ],
                            responses: { '200': { description: 'OK' } },
                        },
                    },
                },
                components: {
                    schemas: {
                        Owner: {
                            type: 'object',
                            properties: { id: { type: 'string' } },
                        },
                    },
                },
            }

            const result = generateRouter(parsePaths(spec), spec)
            // nested $ref inside an inline object param gets qualified too
            expect(result).toContain(`'owner': Model.Owner.optional()`)

            // models context stays bare
            const generator = new SchemaGenerator(spec)
            const models = generator.generateModels()
            expect(models).toContain(
                'export const Owner: z.ZodType<OwnerModel> = z.object({'
            )
            // nested property refs inside models stay bare (no Model. prefix)
            expect(models).not.toContain('Model.')
        })
    })

    describe('G-16: collision-resolved model references', () => {
        it('should reference collided schemas through the collision map', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/accounts': {
                        get: {
                            operationId: 'GetAccount',
                            responses: {
                                '200': {
                                    description: 'OK',
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: '#/components/schemas/UserAccount',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                components: {
                    schemas: {
                        user_account: {
                            type: 'object',
                            properties: { id: { type: 'string' } },
                        },
                        UserAccount: {
                            type: 'object',
                            properties: { name: { type: 'string' } },
                        },
                    },
                },
            }

            // models.ts resolves "user_account"→UserAccount, "UserAccount"→UserAccount_1
            const generator = new SchemaGenerator(spec)
            const models = generator.generateModels()
            expect(models).toContain(
                "export type UserAccountModel = {\n  'id'?: string | undefined;\n}"
            )
            expect(models).toContain(
                "export type UserAccount_1Model = {\n  'name'?: string | undefined;\n}"
            )

            // api.ts must reference the same resolved export via the map
            const result = generateRouter(parsePaths(spec), spec)
            expect(result).toContain('Model.UserAccount_1.parse(await json())')

            const exported = generator.getExportedName('UserAccount')
            expect(exported).toBe('UserAccount_1')
            expect(
                new Map([...generator.getCollisionMap()]).get('UserAccount')
            ).toBe('UserAccount_1')
        })
    })

    describe('G-14b/G-15: identifier quoting', () => {
        it('should always quote query parameter keys', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/reports': {
                        get: {
                            operationId: 'GetReports',
                            parameters: [
                                {
                                    name: 'start-date',
                                    in: 'query',
                                    schema: { type: 'string' },
                                },
                                {
                                    name: 'page',
                                    in: 'query',
                                    schema: { type: 'number' },
                                },
                            ],
                            responses: { '200': { description: 'OK' } },
                        },
                    },
                },
            }

            const result = generateRouter(parsePaths(spec), spec)
            expect(result).toContain(`'start-date': z.string().optional()`)
            expect(result).toContain(`'page': z.number().optional()`)
            expect(result).not.toMatch(/[^']start-date:/)
        })

        it('should escape quotes and backslashes in generated strings', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/things': {
                        get: {
                            operationId: 'GetThings',
                            parameters: [
                                {
                                    name: "quo'te\\path",
                                    in: 'query',
                                    schema: { type: 'string' },
                                },
                            ],
                            responses: { '200': { description: 'OK' } },
                        },
                    },
                },
            }

            const result = generateRouter(parsePaths(spec), spec)
            expect(result).toContain(`'quo\\'te\\\\path':`)
        })
    })
})
