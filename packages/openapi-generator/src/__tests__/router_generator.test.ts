import type { OpenAPIV3_1 } from 'openapi-types'
import { describe, expect, it } from 'vitest'
import { parsePaths } from '../path_parser'
import { generateRouter } from '../router_generator'

describe('Router Generator Comprehensive Tests', () => {
    const baseSpec: OpenAPIV3_1.Document = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {},
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: { id: { type: 'string' } },
                },
                UserList: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                },
            },
        },
    }

    it('should generate query parameters correctly', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/users': {
                    get: {
                        parameters: [
                            {
                                name: 'page',
                                in: 'query',
                                schema: { type: 'number' },
                            },
                            {
                                name: 'sort',
                                in: 'query',
                                required: true,
                                schema: { type: 'string' },
                            },
                        ],
                        responses: { '200': { description: 'OK' } },
                    },
                },
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        expect(code).toContain(
            '.def_searchparams(z.object({ page: z.number().optional(), sort: z.string() }).parse)'
        )
    })

    it('should generate request body with JSON ref correctly', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/users': {
                    post: {
                        requestBody: {
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                        responses: { '201': { description: 'Created' } },
                    },
                },
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        expect(code).toContain('.def_body(Model.User.parse)')
    })

    it('should generate request body with FormData correctly', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/upload': {
                    post: {
                        requestBody: {
                            content: {
                                'multipart/form-data': {
                                    schema: { type: 'object' },
                                },
                            },
                        },
                        responses: { '200': { description: 'OK' } },
                    },
                },
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        expect(code).toContain('.def_body(z.instanceof(FormData).parse)')
    })

    it('should generate response with JSON ref correctly', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/users/1': {
                    get: {
                        responses: {
                            '200': {
                                content: {
                                    'application/json': {
                                        schema: {
                                            $ref: '#/components/schemas/User',
                                        },
                                    },
                                },
                                description: 'OK',
                            },
                        },
                    },
                },
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        expect(code).toContain(
            '.def_response(async ({ json }) => Model.User.parse(await json()))'
        )
    })

    it('should generate response with Array of refs correctly', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/users': {
                    get: {
                        responses: {
                            '200': {
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/User',
                                            },
                                        },
                                    },
                                },
                                description: 'OK',
                            },
                        },
                    },
                },
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        expect(code).toContain(
            '.def_response(async ({ json }) => z.array(Model.User).parse(await json()))'
        )
    })

    it('should handle nested routes and path parameters', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/users/{userId}/posts': {
                    get: { responses: { '200': { description: 'OK' } } },
                },
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        // Check structure nesting
        expect(code).toContain("'users': {")
        expect(code).toContain("'$userId': {")
        expect(code).toContain("'posts': {")
        expect(code).toContain("'GET': f.builder()")
    })

    it('should inherit path level parameters', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/users': {
                    parameters: [
                        {
                            name: 'common',
                            in: 'query',
                            schema: { type: 'string' },
                        },
                    ],
                    get: {
                        responses: { '200': { description: 'OK' } },
                    },
                    post: {
                        parameters: [
                            {
                                name: 'specific',
                                in: 'query',
                                schema: { type: 'number' },
                            },
                        ],
                        responses: { '200': { description: 'OK' } },
                    },
                },
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        // GET should have common param
        expect(code).toContain('common: z.string().optional()')

        expect(code).toMatch(
            /def_searchparams\(z\.object\({.*common: z\.string\(\)\.optional\(\).*}\)\.parse\)/
        )
        expect(code).toMatch(
            /def_searchparams\(z\.object\({.*specific: z\.number\(\)\.optional\(\).*}\)\.parse\)/
        )
    })

    it('should handle empty paths gracefully', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {},
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        expect(code).toContain("export const api = f.router('', {\n\n});")
    })

    it('should ignore metadata keys in path objects', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/users': {
                    summary: 'User operations',
                    description: 'All user related things',
                    get: { responses: { '200': { description: 'OK' } } },
                } as any, // Cast to any to allow non-standard fields if strict types complain, though summary/desc are valid in PathItem
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        expect(code).not.toContain('summary')
        expect(code).not.toContain('description')
        expect(code).toContain("'GET': f.builder()")
    })

    it('should handle mixed static and dynamic paths correctly', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/users/me': {
                    get: { responses: { '200': { description: 'OK' } } },
                },
                '/users/{userId}': {
                    get: { responses: { '200': { description: 'OK' } } },
                },
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        expect(code).toContain("'me': {")
        expect(code).toContain("'$userId': {")
    })

    it('should not generate searchparams if no query params exist', () => {
        const spec: OpenAPIV3_1.Document = {
            ...baseSpec,
            paths: {
                '/users': {
                    get: {
                        parameters: [
                            {
                                name: 'id',
                                in: 'path',
                                required: true,
                                schema: { type: 'string' },
                            },
                            {
                                name: 'header-param',
                                in: 'header',
                                schema: { type: 'string' },
                            },
                        ],
                        responses: { '200': { description: 'OK' } },
                    },
                },
            },
        }
        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        expect(code).not.toContain('.def_searchparams')
    })
})
