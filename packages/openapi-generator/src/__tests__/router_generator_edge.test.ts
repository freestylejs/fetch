import type { OpenAPIV3_1 } from 'openapi-types'
import { describe, expect, it } from 'vitest'
import { generateRouter } from '../router_generator'

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
            expect(result).toContain('export const api')
        })

        it('should handle request body with malformed $ref', () => {
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

            // Should handle the empty string from .pop()
            const result = generateRouter(parsedPaths, spec)
            expect(result).toContain('.def_body(Model..parse)') // Empty modelName
        })

        it('should handle response with malformed $ref', () => {
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

            // Should handle the empty string from .pop()
            const result = generateRouter(parsedPaths, spec)
            expect(result).toContain('Model..parse') // Empty modelName
        })

        it('should handle array response with malformed $ref in items', () => {
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

            // Should handle the empty string from .pop()
            const result = generateRouter(parsedPaths, spec)
            expect(result).toContain('z.array(Model.)') // Empty modelName
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
            expect(result).toContain('export const api')
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
            const sharedCount = (result.match(/shared:/g) || []).length
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
            expect(result).toContain('export const api')
        })
    })
})
