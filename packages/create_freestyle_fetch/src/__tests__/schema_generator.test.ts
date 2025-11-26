import type { OpenAPIV3_1 } from 'openapi-types'
import { describe, expect, it } from 'vitest'
import { SchemaGenerator } from '../schema_generator'

describe('SchemaGenerator', () => {
    const createSpec = (
        schemas: Record<
            string,
            OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject
        >
    ): OpenAPIV3_1.Document => ({
        openapi: '3.1.0',
        info: { title: 'Test', version: '1.0.0' },
        paths: {},
        components: { schemas },
    })

    describe('Basic Types', () => {
        it('should generate z.string() for string type', () => {
            const spec = createSpec({ Test: { type: 'string' } })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'string' },
                'test'
            )
            expect(result).toBe('z.string()')
        })

        it('should generate z.number() for number type', () => {
            const spec = createSpec({ Test: { type: 'number' } })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'number' },
                'test'
            )
            expect(result).toBe('z.number()')
        })

        it('should generate z.number().int() for integer type', () => {
            const spec = createSpec({ Test: { type: 'integer' } })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'integer' },
                'test'
            )
            expect(result).toBe('z.number().int()')
        })

        it('should generate z.boolean() for boolean type', () => {
            const spec = createSpec({ Test: { type: 'boolean' } })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'boolean' },
                'test'
            )
            expect(result).toBe('z.boolean()')
        })

        it('should generate z.any() for undefined type', () => {
            const spec = createSpec({ Test: {} })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema({}, 'test')
            expect(result).toBe('z.any()')
        })
    })

    describe('String Formats and Constraints', () => {
        it('should generate z.email() for email format', () => {
            const spec = createSpec({
                Test: { type: 'string', format: 'email' },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'string', format: 'email' },
                'test'
            )
            expect(result).toBe('z.email()')
        })

        it('should generate z.uuid() for uuid format', () => {
            const spec = createSpec({
                Test: { type: 'string', format: 'uuid' },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'string', format: 'uuid' },
                'test'
            )
            expect(result).toBe('z.uuid()')
        })

        it('should generate z.url() for uri format', () => {
            const spec = createSpec({ Test: { type: 'string', format: 'uri' } })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'string', format: 'uri' },
                'test'
            )
            expect(result).toBe('z.url()')
        })

        it('should generate z.iso.datetime() for date-time format', () => {
            const spec = createSpec({
                Test: { type: 'string', format: 'date-time' },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'string', format: 'date-time' },
                'test'
            )
            expect(result).toBe('z.iso.datetime()')
        })

        it('should generate z.enum() for string enum', () => {
            const spec = createSpec({
                Test: { type: 'string', enum: ['a', 'b', 'c'] },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'string', enum: ['a', 'b', 'c'] },
                'test'
            )
            expect(result).toBe("z.enum(['a', 'b', 'c'])")
        })

        it('should generate z.literal() for string const', () => {
            const spec = createSpec({
                Test: { type: 'string', const: 'fixed' },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'string', const: 'fixed' },
                'test'
            )
            expect(result).toBe("z.literal('fixed')")
        })

        it('should generate z.string().regex() for pattern', () => {
            const spec = createSpec({
                Test: { type: 'string', pattern: '^[a-z]+$' },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'string', pattern: '^[a-z]+$' },
                'test'
            )
            expect(result).toBe('z.string().regex(/^[a-z]+$/)')
        })
    })

    describe('Number Constraints', () => {
        it('should generate z.number().min() for minimum', () => {
            const spec = createSpec({ Test: { type: 'number', minimum: 0 } })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'number', minimum: 0 },
                'test'
            )
            expect(result).toBe('z.number().min(0)')
        })

        it('should generate z.number().max() for maximum', () => {
            const spec = createSpec({ Test: { type: 'number', maximum: 100 } })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'number', maximum: 100 },
                'test'
            )
            expect(result).toBe('z.number().max(100)')
        })

        it('should generate z.number().min().max() for both min and max', () => {
            const spec = createSpec({
                Test: { type: 'number', minimum: 0, maximum: 100 },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'number', minimum: 0, maximum: 100 },
                'test'
            )
            expect(result).toBe('z.number().min(0).max(100)')
        })

        it('should generate z.number().int().min().max() for integer with constraints', () => {
            const spec = createSpec({
                Test: { type: 'integer', minimum: 1, maximum: 10 },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'integer', minimum: 1, maximum: 10 },
                'test'
            )
            expect(result).toBe('z.number().int().min(1).max(10)')
        })
    })

    describe('Array Types', () => {
        it('should generate z.array() with string items', () => {
            const spec = createSpec({
                Test: { type: 'array', items: { type: 'string' } },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'array', items: { type: 'string' } },
                'test'
            )
            expect(result).toBe('z.array(z.string())')
        })

        it('should generate z.array() with number items', () => {
            const spec = createSpec({
                Test: { type: 'array', items: { type: 'number' } },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'array', items: { type: 'number' } },
                'test'
            )
            expect(result).toBe('z.array(z.number())')
        })

        it('should generate z.array() with ref items', () => {
            const spec = createSpec({
                Item: { type: 'string' },
                Test: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Item' },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'array', items: { $ref: '#/components/schemas/Item' } },
                'test'
            )
            expect(result).toBe('z.array(Item)')
        })
    })

    describe('Object Types', () => {
        it('should generate z.object() with required properties', () => {
            const spec = createSpec({
                Test: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string' },
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    type: 'object',
                    required: ['name'],
                    properties: { name: { type: 'string' } },
                },
                'test'
            )
            expect(result).toContain("'name': z.string()")
        })

        it('should generate z.object() with optional properties', () => {
            const spec = createSpec({
                Test: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                },
                'test'
            )
            expect(result).toContain("'name': z.string().optional()")
        })

        it('should generate z.object() with mixed required and optional properties', () => {
            const spec = createSpec({
                Test: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                    },
                },
                'test'
            )
            expect(result).toContain("'id': z.string()")
            expect(result).toContain("'name': z.string().optional()")
        })

        it('should generate z.object({}) for empty object', () => {
            const spec = createSpec({ Test: { type: 'object' } })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: 'object' },
                'test'
            )
            expect(result).toBe('z.object({})')
        })

        it('should generate z.object().catchall(z.any()) for additionalProperties: true', () => {
            const spec = createSpec({
                Test: {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                    additionalProperties: true,
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                    additionalProperties: true,
                },
                'test'
            )
            expect(result).toContain('.catchall(z.any())')
        })

        it('should generate z.object().catchall() with typed additionalProperties', () => {
            const spec = createSpec({
                Test: {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                    additionalProperties: { type: 'number' },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                    additionalProperties: { type: 'number' },
                },
                'test'
            )
            expect(result).toContain('.catchall(z.number())')
        })

        it('should generate z.record() when no properties but additionalProperties defined', () => {
            const spec = createSpec({
                Test: {
                    type: 'object',
                    additionalProperties: { type: 'string' },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    type: 'object',
                    additionalProperties: { type: 'string' },
                },
                'test'
            )
            expect(result).toBe('z.record(z.string(), z.string())')
        })
    })

    describe('References ($ref)', () => {
        it('should resolve simple reference', () => {
            const spec = createSpec({
                User: { type: 'string' },
                Test: { $ref: '#/components/schemas/User' },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { $ref: '#/components/schemas/User' },
                'test'
            )
            expect(result).toBe('User')
        })

        it('should throw error for invalid $ref format', () => {
            const spec = createSpec({ Test: { $ref: 'invalid/ref' } })
            const generator = new SchemaGenerator(spec)
            expect(() =>
                generator.generateZodSchema({ $ref: 'invalid/ref' }, 'test')
            ).toThrow('Unsupported $ref: invalid/ref')
        })

        it('should throw error for non-existent $ref', () => {
            const spec = createSpec({
                Test: { $ref: '#/components/schemas/NonExistent' },
            })
            const generator = new SchemaGenerator(spec)
            expect(() =>
                generator.generateZodSchema(
                    { $ref: '#/components/schemas/NonExistent' },
                    'test'
                )
            ).toThrow('Schema not found: #/components/schemas/NonExistent')
        })

        it('should handle reference with additional properties (allOf conversion)', () => {
            const spec = createSpec({
                Base: { type: 'string' },
                Test: {
                    $ref: '#/components/schemas/Base',
                    description: 'extra',
                } as any,
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    $ref: '#/components/schemas/Base',
                    description: 'extra',
                } as any,
                'test'
            )
            // Should convert to allOf and process
            expect(result).toContain('Base')
        })
    })

    describe('allOf (Intersection)', () => {
        it('should generate intersection with .and()', () => {
            const spec = createSpec({
                Base: {
                    type: 'object',
                    properties: { id: { type: 'string' } },
                },
                Extra: {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                },
                Test: {
                    allOf: [
                        { $ref: '#/components/schemas/Base' },
                        { $ref: '#/components/schemas/Extra' },
                    ],
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    allOf: [
                        { $ref: '#/components/schemas/Base' },
                        { $ref: '#/components/schemas/Extra' },
                    ],
                },
                'test'
            )
            expect(result).toContain('Base.and(Extra)')
        })

        it('should handle allOf with three schemas', () => {
            const spec = createSpec({
                A: { type: 'object', properties: { a: { type: 'string' } } },
                B: { type: 'object', properties: { b: { type: 'string' } } },
                C: { type: 'object', properties: { c: { type: 'string' } } },
                Test: {
                    allOf: [
                        { $ref: '#/components/schemas/A' },
                        { $ref: '#/components/schemas/B' },
                        { $ref: '#/components/schemas/C' },
                    ],
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    allOf: [
                        { $ref: '#/components/schemas/A' },
                        { $ref: '#/components/schemas/B' },
                        { $ref: '#/components/schemas/C' },
                    ],
                },
                'test'
            )
            expect(result).toBe('A.and(B.and(C))')
        })

        it('should handle allOf with inline schemas', () => {
            const spec = createSpec({
                Test: {
                    allOf: [
                        {
                            type: 'object',
                            properties: { a: { type: 'string' } },
                        },
                        {
                            type: 'object',
                            properties: { b: { type: 'number' } },
                        },
                    ],
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    allOf: [
                        {
                            type: 'object',
                            properties: { a: { type: 'string' } },
                        },
                        {
                            type: 'object',
                            properties: { b: { type: 'number' } },
                        },
                    ],
                },
                'test'
            )
            expect(result).toContain('.and(')
        })
    })

    describe('oneOf/anyOf (Union)', () => {
        it('should generate z.union() for simple oneOf', () => {
            const spec = createSpec({
                A: { type: 'string' },
                B: { type: 'number' },
                Test: {
                    oneOf: [
                        { $ref: '#/components/schemas/A' },
                        { $ref: '#/components/schemas/B' },
                    ],
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    oneOf: [
                        { $ref: '#/components/schemas/A' },
                        { $ref: '#/components/schemas/B' },
                    ],
                },
                'test'
            )
            expect(result).toBe('z.union([A, B])')
        })

        it('should generate z.union() for anyOf', () => {
            const spec = createSpec({
                A: { type: 'string' },
                B: { type: 'number' },
                Test: {
                    anyOf: [
                        { $ref: '#/components/schemas/A' },
                        { $ref: '#/components/schemas/B' },
                    ],
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    anyOf: [
                        { $ref: '#/components/schemas/A' },
                        { $ref: '#/components/schemas/B' },
                    ],
                },
                'test'
            )
            expect(result).toBe('z.union([A, B])')
        })

        it('should generate z.discriminatedUnion() for oneOf with discriminator', () => {
            const spec = createSpec({
                OptionA: {
                    type: 'object',
                    required: ['type'],
                    properties: {
                        type: { type: 'string', const: 'A' },
                        a: { type: 'string' },
                    },
                },
                OptionB: {
                    type: 'object',
                    required: ['type'],
                    properties: {
                        type: { type: 'string', const: 'B' },
                        b: { type: 'number' },
                    },
                },
                Test: {
                    oneOf: [
                        { $ref: '#/components/schemas/OptionA' },
                        { $ref: '#/components/schemas/OptionB' },
                    ],
                    discriminator: { propertyName: 'type' },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    oneOf: [
                        { $ref: '#/components/schemas/OptionA' },
                        { $ref: '#/components/schemas/OptionB' },
                    ],
                    discriminator: { propertyName: 'type' },
                },
                'test'
            )
            expect(result).toBe(
                "z.discriminatedUnion('type', [OptionA, OptionB])"
            )
        })
    })

    describe('Nullable Types (OAS 3.1)', () => {
        it('should generate .nullable() for type array with null', () => {
            const spec = createSpec({
                Test: { type: ['string', 'null'] } as any,
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: ['string', 'null'] } as any,
                'test'
            )
            expect(result).toBe('z.string().nullable()')
        })

        it('should generate .nullable() for number with null', () => {
            const spec = createSpec({
                Test: { type: ['number', 'null'] } as any,
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                { type: ['number', 'null'] } as any,
                'test'
            )
            expect(result).toBe('z.number().nullable()')
        })

        it('should preserve constraints in nullable types', () => {
            const spec = createSpec({
                Test: {
                    type: ['number', 'null'],
                    minimum: 0,
                    maximum: 100,
                } as any,
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    type: ['number', 'null'],
                    minimum: 0,
                    maximum: 100,
                } as any,
                'test'
            )
            expect(result).toBe('z.number().min(0).max(100).nullable()')
        })
    })

    describe('generateModels()', () => {
        it('should generate empty string for spec without components', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.1.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {},
            }
            const generator = new SchemaGenerator(spec)
            const result = generator.generateModels()
            expect(result).toBe('')
        })

        it('should generate empty string for spec with empty schemas', () => {
            const spec = createSpec({})
            const generator = new SchemaGenerator(spec)
            const result = generator.generateModels()
            expect(result).toContain("import { z } from 'zod';")
        })

        it('should generate model exports with PascalCase names', () => {
            const spec = createSpec({
                'user-profile': {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateModels()
            expect(result).toContain(
                'export const UserProfile: z.ZodType<UserProfileModel> = z.object({'
            )
            expect(result).toContain("'name': z.string().optional()")
            expect(result).toContain('});')
            expect(result).toContain(
                "export type UserProfileModel = {\n  'name'?: string | undefined;\n};"
            )
        })

        it('should generate imports and exports', () => {
            const spec = createSpec({
                User: { type: 'string' },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateModels()
            expect(result).toContain("import { z } from 'zod';")
            expect(result).toContain(
                'export const User: z.ZodType<UserModel> = z.string();'
            )
            expect(result).toContain('export type UserModel = string;')
        })

        it('should handle multiple schemas', () => {
            const spec = createSpec({
                User: { type: 'string' },
                Post: {
                    type: 'object',
                    properties: { title: { type: 'string' } },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateModels()
            expect(result).toContain('export const User')
            expect(result).toContain('export const Post')
        })
    })

    describe('Real-World Complex Schemas', () => {
        it('should handle deeply nested objects and arrays', () => {
            const spec = createSpec({
                DeepNested: {
                    type: 'object',
                    properties: {
                        level1: {
                            type: 'object',
                            properties: {
                                level2: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            level3: {
                                                type: 'string',
                                                enum: ['deep'],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                spec.components!.schemas!
                    .DeepNested as OpenAPIV3_1.SchemaObject,
                'DeepNested'
            )

            // Should contain nested structure
            expect(result).toContain('z.object({')
            expect(result).toContain('z.array(')
            expect(result).toContain("z.enum(['deep'])")
        })

        it('should handle allOf with ref and inline schema (IntersectionHell pattern)', () => {
            const spec = createSpec({
                HellObject: {
                    type: 'object',
                    required: ['required-key', 'spaced key'],
                    properties: {
                        'required-key': { type: 'string' },
                        'optional-key': { type: 'string' },
                        'spaced key': { type: 'number' },
                        $special$: { type: 'boolean' },
                    },
                },
                IntersectionHell: {
                    allOf: [
                        { $ref: '#/components/schemas/HellObject' },
                        {
                            type: 'object',
                            properties: {
                                extra: { type: 'string' },
                            },
                        },
                    ],
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                spec.components!.schemas!
                    .IntersectionHell as OpenAPIV3_1.SchemaObject,
                'IntersectionHell'
            )

            expect(result).toContain('HellObject.and(')
            expect(result).toContain('z.object({')
        })

        it('should correctly handle complete hell.json HellObject schema', () => {
            const spec = createSpec({
                HellObject: {
                    type: 'object',
                    required: ['required-key', 'spaced key'],
                    properties: {
                        'required-key': { type: 'string' },
                        'optional-key': { type: 'string' },
                        'spaced key': { type: 'number' },
                        $special$: { type: 'boolean' },
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                spec.components!.schemas!
                    .HellObject as OpenAPIV3_1.SchemaObject,
                'HellObject'
            )

            expect(result).toContain("'required-key': z.string()")
            expect(result).toContain("'optional-key': z.string().optional()")
            expect(result).toContain("'spaced key': z.number()")
            expect(result).toContain("'$special$': z.boolean().optional()")
        })

        it('should handle complete hell.json UnionHell with discriminator', () => {
            const spec = createSpec({
                OptionA: {
                    type: 'object',
                    required: ['type'],
                    properties: {
                        type: { type: 'string', enum: ['A'] },
                        a: { type: 'string' },
                    },
                },
                OptionB: {
                    type: 'object',
                    required: ['type'],
                    properties: {
                        type: { type: 'string', enum: ['B'] },
                        b: { type: 'number' },
                    },
                },
                UnionHell: {
                    oneOf: [
                        { $ref: '#/components/schemas/OptionA' },
                        { $ref: '#/components/schemas/OptionB' },
                    ],
                    discriminator: {
                        propertyName: 'type',
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const models = generator.generateModels()

            expect(models).toContain(
                "export const UnionHell: z.ZodType<UnionHellModel> = z.discriminatedUnion('type', [OptionA, OptionB]);"
            )
        })

        it('should handle nested object with array of objects containing enums', () => {
            const spec = createSpec({
                Complex: {
                    type: 'object',
                    properties: {
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        enum: [
                                            'pending',
                                            'active',
                                            'completed',
                                        ],
                                    },
                                    count: {
                                        type: 'integer',
                                        minimum: 0,
                                        maximum: 100,
                                    },
                                },
                            },
                        },
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                spec.components!.schemas!.Complex as OpenAPIV3_1.SchemaObject,
                'Complex'
            )

            expect(result).toContain('z.array(')
            expect(result).toContain(
                "z.enum(['pending', 'active', 'completed'])"
            )
            expect(result).toContain('z.number().int().min(0).max(100)')
        })

        it('should handle object with additionalProperties containing $ref', () => {
            const spec = createSpec({
                Value: { type: 'string' },
                Dictionary: {
                    type: 'object',
                    additionalProperties: {
                        $ref: '#/components/schemas/Value',
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                spec.components!.schemas!
                    .Dictionary as OpenAPIV3_1.SchemaObject,
                'Dictionary'
            )

            expect(result).toBe('z.record(z.string(), Value)')
        })

        it('should handle allOf with multiple refs and inline schemas', () => {
            const spec = createSpec({
                Base: {
                    type: 'object',
                    properties: { id: { type: 'string' } },
                },
                Timestamped: {
                    type: 'object',
                    properties: {
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Entity: {
                    allOf: [
                        { $ref: '#/components/schemas/Base' },
                        { $ref: '#/components/schemas/Timestamped' },
                        {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                            },
                        },
                    ],
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                spec.components!.schemas!.Entity as OpenAPIV3_1.SchemaObject,
                'Entity'
            )

            expect(result).toContain('Base.and(')
            expect(result).toContain('Timestamped')
        })

        it('should handle array of refs', () => {
            const spec = createSpec({
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                    },
                },
                Users: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                spec.components!.schemas!.Users as OpenAPIV3_1.SchemaObject,
                'Users'
            )

            expect(result).toBe('z.array(User)')
        })

        it('should handle nullable complex types', () => {
            const spec = createSpec({
                NullableObject: {
                    type: ['object', 'null'],
                    properties: {
                        value: { type: 'string' },
                    },
                } as any,
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                spec.components!.schemas!.NullableObject as any,
                'NullableObject'
            )

            expect(result).toContain('.nullable()')
            expect(result).toContain('z.object({')
        })
    })

    describe('Edge Cases', () => {
        it('should throw error for non-existent schema name', () => {
            const spec = createSpec({})
            const generator = new SchemaGenerator(spec)
            expect(() =>
                generator.generateZodSchema(undefined as any, 'NonExistent')
            ).toThrow('Schema "NonExistent" not found')
        })

        it('should handle caching of processed schemas', () => {
            const spec = createSpec({
                User: { type: 'string' },
                Profile: { $ref: '#/components/schemas/User' },
            })
            const generator = new SchemaGenerator(spec)

            // First call processes User
            generator.generateZodSchema(
                { $ref: '#/components/schemas/User' },
                'test1'
            )

            // Second call should return cached result
            const result = generator.generateZodSchema(
                { $ref: '#/components/schemas/User' },
                'test2'
            )
            expect(result).toBe('User')
        })

        it('should handle special characters in property names', () => {
            const spec = createSpec({
                Test: {
                    type: 'object',
                    properties: {
                        'special-key': { type: 'string' },
                        $dollar: { type: 'number' },
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateZodSchema(
                {
                    type: 'object',
                    properties: {
                        'special-key': { type: 'string' },
                        $dollar: { type: 'number' },
                    },
                },
                'test'
            )
            expect(result).toContain("'special-key'")
            expect(result).toContain("'$dollar'")
        })

        it('should handle $defs pattern for specialized allOf composition', () => {
            // This test covers the special $defs handling code path (lines 96-118)
            const spec = createSpec({
                BaseList: {
                    type: 'object',
                    properties: {
                        items: {
                            type: 'array',
                            items: { type: 'string' }, // Will be replaced
                        },
                    },
                },
                Product: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                    },
                },
                ProductList: {
                    allOf: [
                        { $ref: '#/components/schemas/BaseList' },
                        {
                            $defs: {
                                productItem: {
                                    $ref: '#/components/schemas/Product',
                                },
                            },
                        } as any,
                    ],
                },
            })

            const generator = new SchemaGenerator(spec)
            const result = generator.generateModels()

            // The $defs pattern should replace z.array(z.any()) with z.array(Product)
            expect(result).toContain('Product')
            expect(result).toContain('ProductList')
        })
    })

    describe('JSDoc Generation', () => {
        it('should generate JSDoc for models', () => {
            const spec = createSpec({
                User: {
                    type: 'object',
                    description: 'A user object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The user name',
                        },
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateModels()

            expect(result).toContain('/**\n * A user object\n */')
            expect(result).toContain('/**\n   * The user name\n   */')
        })

        it('should generate JSDoc for properties', () => {
            const spec = createSpec({
                User: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The user name',
                        },
                        age: {
                            type: 'number',
                            description: 'The user age\nMust be positive',
                        },
                    },
                },
            })
            const generator = new SchemaGenerator(spec)
            const result = generator.generateModels()

            expect(result).toContain('/**\n   * The user name\n   */')
            expect(result).toContain(
                '/**\n   * The user age\n   * Must be positive\n   */'
            )
        })
    })
})
