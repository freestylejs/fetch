import type { OpenAPIV3_1 } from 'openapi-types'
import { describe, expect, it } from 'vitest'
import { AuthGenerator } from '../auth_generator'
import { AuthSchemeError, OperationValidationError } from '../errors'
import { parsePaths } from '../path_parser'
import { generateRouter } from '../router_generator'
import { SchemaGenerator } from '../schema_generator'
import { SpecValidator } from '../validator'

const baseSpec = (): OpenAPIV3_1.Document => ({
    openapi: '3.1.0',
    info: { title: 'Test', version: '1.0.0' },
    paths: {},
    components: {
        schemas: {
            // biome-ignore lint/style/useNamingConvention: mirrors OpenAPI component key
            User: {
                type: 'object',
                properties: { id: { type: 'string' } },
            },
        },
    },
})

describe('G-1: requestBody $ref is dereferenced through components/requestBodies', () => {
    const spec = () => {
        const s = baseSpec()
        s.components!.requestBodies = {
            // biome-ignore lint/style/useNamingConvention: mirrors OpenAPI component key
            UserBody: {
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/User' },
                    },
                },
            },
        }
        return s
    }

    it('generates def_body from a requestBodies $ref', () => {
        const s = spec()
        s.paths = {
            '/users': {
                post: {
                    requestBody: {
                        $ref: '#/components/requestBodies/UserBody',
                    },
                    responses: { '200': { description: 'OK' } },
                },
            },
        }
        const code = generateRouter(parsePaths(s), s)
        expect(code).toContain('.def_body(Model.User.parse)')
    })

    it('throws OperationValidationError for an unresolvable requestBody $ref', () => {
        const s = baseSpec()
        s.paths = {
            '/users': {
                post: {
                    requestBody: {
                        $ref: '#/components/requestBodies/Missing',
                    },
                    responses: { '200': { description: 'OK' } },
                },
            },
        }
        expect(() => generateRouter(parsePaths(s), s)).toThrow(
            OperationValidationError
        )
        expect(() => generateRouter(parsePaths(s), s)).toThrow(
            /UserBody|Unresolvable/
        )
    })
})

describe('G-2: x-www-form-urlencoded bodies become URLSearchParams', () => {
    it('generates the URLSearchParams def_body and emits the helper once', () => {
        const s = baseSpec()
        s.paths = {
            '/token': {
                post: {
                    operationId: 'CreateToken',
                    requestBody: {
                        content: {
                            'application/x-www-form-urlencoded': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        // biome-ignore lint/style/useNamingConvention: real-world form field name
                                        grant_type: { type: 'string' },
                                    },
                                    required: ['grant_type'],
                                },
                            },
                        },
                    },
                    responses: { '200': { description: 'OK' } },
                },
            },
        }
        const code = generateRouter(parsePaths(s), s)
        expect(code).toContain(
            `.def_body((body) => new URLSearchParams(z.object({
'grant_type': z.string()
}).transform(toUrlSearchParams).parse(body)))`
        )
        expect(code).toContain('const toUrlSearchParams =')
        // helper emitted exactly once
        expect(code.match(/const toUrlSearchParams =/g)).toHaveLength(1)
    })

    it('prefers application/json over x-www-form-urlencoded', () => {
        const s = baseSpec()
        s.paths = {
            '/mixed': {
                post: {
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                            'application/x-www-form-urlencoded': {
                                schema: { type: 'object' },
                            },
                        },
                    },
                    responses: { '200': { description: 'OK' } },
                },
            },
        }
        const code = generateRouter(parsePaths(s), s)
        expect(code).toContain('.def_body(Model.User.parse)')
        expect(code).not.toContain('URLSearchParams')
    })
})

describe('G-3: response $ref is dereferenced through components/responses', () => {
    it('generates def_response from a responses $ref', () => {
        const s = baseSpec()
        s.components!.responses = {
            // biome-ignore lint/style/useNamingConvention: mirrors OpenAPI component key
            UserResponse: {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/User' },
                    },
                },
            },
        }
        s.paths = {
            '/users/me': {
                get: {
                    responses: {
                        '200': {
                            $ref: '#/components/responses/UserResponse',
                        },
                    },
                },
            },
        }
        const code = generateRouter(parsePaths(s), s)
        expect(code).toContain(
            '.def_response(async ({ json }) => Model.User.parse(await json()))'
        )
    })

    it('throws OperationValidationError for an unresolvable response $ref', () => {
        const s = baseSpec()
        s.paths = {
            '/users/me': {
                get: {
                    responses: {
                        '200': {
                            $ref: '#/components/responses/Missing',
                        },
                    },
                },
            },
        }
        expect(() => generateRouter(parsePaths(s), s)).toThrow(
            OperationValidationError
        )
    })
})

describe('G-4: inline response schemas become explicit Zod expressions', () => {
    it('generates def_response with an inline zod expression', () => {
        const s = baseSpec()
        s.paths = {
            '/health': {
                get: {
                    operationId: 'GetHealth',
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                enum: ['ok'],
                                            },
                                        },
                                        required: ['status'],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }
        const code = generateRouter(parsePaths(s), s)
        expect(code).toContain(
            `.def_response(async ({ json }) => z.object({
'status': z.enum(['ok'])
}).parse(await json()))`
        )
    })

    it('handles inline array-of-inline responses', () => {
        const s = baseSpec()
        s.paths = {
            '/names': {
                get: {
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }
        const code = generateRouter(parsePaths(s), s)
        expect(code).toContain(
            '.def_response(async ({ json }) => z.array(z.string()).parse(await json()))'
        )
    })

    it('wraps impossible inline generation into OperationValidationError', () => {
        const s = baseSpec()
        s.paths = {
            '/broken': {
                get: {
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/',
                                        },
                                    } as any,
                                },
                            },
                        },
                    },
                },
            },
        }
        expect(() => generateRouter(parsePaths(s), s)).toThrow(
            OperationValidationError
        )
    })

    it('reflects inline JSON request bodies as explicit parse expressions', () => {
        const s = baseSpec()
        s.paths = {
            '/webhooks': {
                post: {
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        enabled: { type: 'boolean' },
                                    },
                                    required: ['enabled'],
                                },
                            },
                        },
                    },
                    responses: { '200': { description: 'OK' } },
                },
            },
        }
        const code = generateRouter(parsePaths(s), s)
        expect(code).toContain(
            `.def_body((body) => z.object({
'enabled': z.boolean()
}).parse(body))`
        )
    })
})

describe('G-9: OpenAPI 3.0 boolean nullable', () => {
    it('appends .nullable() on the zod side', () => {
        const spec = baseSpec()
        const gen = new SchemaGenerator(spec)
        expect(
            gen.generateZodSchema({
                type: 'string',
                nullable: true,
            } as any)
        ).toBe('z.string().nullable()')
        expect(
            gen.generateZodSchema({
                type: 'integer',
                minimum: 0,
                nullable: true,
            } as any)
        ).toBe('z.number().int().min(0).nullable()')
    })

    it('does not double-append for 3.1 type arrays', () => {
        const spec = baseSpec()
        const gen = new SchemaGenerator(spec)
        expect(gen.generateZodSchema({ type: ['string', 'null'] } as any)).toBe(
            'z.string().nullable()'
        )
    })

    it('adds "| null" to model types', () => {
        const spec = baseSpec()
        spec.components!.schemas!.NullableHolder = {
            type: 'object',
            properties: {
                nickname: { type: 'string', nullable: true },
            },
        } as any
        const models = new SchemaGenerator(spec).generateModels()
        expect(models).toContain("'nickname': z.string().nullable().optional()")
        expect(models).toContain("'nickname'?: string | null | undefined;")
    })
})

describe('G-13: enums with non-string members', () => {
    it('keeps z.enum for string-only enums', () => {
        const gen = new SchemaGenerator(baseSpec())
        expect(
            gen.generateZodSchema({
                type: 'string',
                enum: ['a', 'b'],
            })
        ).toBe("z.enum(['a', 'b'])")
    })

    it('uses literal unions for numeric enums', () => {
        const gen = new SchemaGenerator(baseSpec())
        // biome-ignore lint/style/noMagicNumbers: enum fixture values
        expect(gen.generateZodSchema({ enum: [1, 2, 3] })).toBe(
            'z.union([z.literal(1), z.literal(2), z.literal(3)])'
        )
    })

    it('uses literal unions for mixed enums regardless of declared type', () => {
        const gen = new SchemaGenerator(baseSpec())
        expect(
            gen.generateZodSchema({
                type: 'string',
                enum: ['all', 0, true],
            } as any)
        ).toBe("z.union([z.literal('all'), z.literal(0), z.literal(true)])")
    })

    it('renders numeric enum members in model type unions', () => {
        const spec = baseSpec()
        spec.components!.schemas!.Code = { enum: [1, 2] } as any
        const models = new SchemaGenerator(spec).generateModels()
        expect(models).toContain('export type CodeModel = 1 | 2;')
        expect(models).toContain(
            'export const Code: z.ZodType<CodeModel> = z.union([z.literal(1), z.literal(2)]);'
        )
    })
})

describe('G-10: server variable substitution and validation warning', () => {
    it('substitutes {var} placeholders with defaults', () => {
        const s = baseSpec()
        s.servers = [
            {
                url: 'https://{environment}.example.com/v{version}',
                variables: {
                    environment: { default: 'api' },
                    version: { default: '2' },
                },
            },
        ]
        const code = generateRouter(parsePaths(s), s)
        expect(code).toContain(
            "baseUrl: config.baseUrl || 'https://api.example.com/v2'"
        )
    })

    it('leaves unresolved placeholders literal and warns via SpecValidator', () => {
        const s = baseSpec()
        s.servers = [
            {
                url: 'https://{region}.example.com',
                variables: {},
            },
        ]
        const code = generateRouter(parsePaths(s), s)
        expect(code).toContain(
            "baseUrl: config.baseUrl || 'https://{region}.example.com'"
        )

        const validator = new SpecValidator(s)
        const warnings = validator.validate()
        const serverWarnings = warnings.filter(
            (w) => w.code === 'UNRESOLVED_SERVER_VARIABLE'
        )
        expect(serverWarnings).toHaveLength(1)
        expect(serverWarnings[0]!.message).toContain('{region}')
    })
})

describe('G-11: securitySchemes $refs are dereferenced', () => {
    it('resolves a scheme alias through components/securitySchemes', () => {
        const s = baseSpec()
        s.components!.securitySchemes = {
            realBearer: { type: 'http', scheme: 'bearer' },
            bearerAlias: {
                $ref: '#/components/securitySchemes/realBearer',
            } as any,
        }
        s.security = [{ bearerAlias: [] }]
        const auth = new AuthGenerator(s).generateFileContent()
        expect(auth).toContain('bearerAlias?: {')
        expect(auth).toContain('token: string | (() => Promise<string>)')
    })

    it('throws AuthSchemeError for an unresolvable scheme $ref', () => {
        const s = baseSpec()
        s.components!.securitySchemes = {
            broken: {
                $ref: '#/components/securitySchemes/nope',
            } as any,
        }
        expect(() => new AuthGenerator(s)).toThrow(AuthSchemeError)
    })
})

describe('G-12: unsupported security schemes fail loudly when required', () => {
    it('throws AuthSchemeError naming the scheme when referenced', () => {
        const s = baseSpec()
        s.components!.securitySchemes = {
            oidc: {
                type: 'openIdConnect',
                openIdConnectUrl: 'https://example.com/.well-known',
            },
        }
        s.security = [{ oidc: [] }]
        expect(() => new AuthGenerator(s)).toThrow(AuthSchemeError)
        expect(() => new AuthGenerator(s)).toThrow(/oidc/)
    })

    it('throws for unsupported http schemes like digest when referenced', () => {
        const s = baseSpec()
        s.components!.securitySchemes = {
            digestAuth: { type: 'http', scheme: 'digest' },
        }
        s.paths = {
            '/secret': {
                get: {
                    security: [{ digestAuth: [] }],
                    responses: { '200': { description: 'OK' } },
                },
            },
        }
        expect(() => new AuthGenerator(s)).toThrow(/digestAuth/)
    })

    it('excludes unreferenced unsupported schemes instead of emitting no-ops', () => {
        const s = baseSpec()
        s.components!.securitySchemes = {
            apiKeyAuth: {
                type: 'apiKey',
                name: 'X-Key',
                in: 'header',
            },
            mutualTls: { type: 'mutualTLS' } as any,
        }
        s.security = [{ apiKeyAuth: [] }]
        const auth = new AuthGenerator(s).generateFileContent()
        expect(auth).toContain('apiKeyAuth?: {')
        expect(auth).not.toContain('mutualTls')
        // no dead middleware blocks
        expect(auth).not.toContain('config.mutualTls')
    })
})
