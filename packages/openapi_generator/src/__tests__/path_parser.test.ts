import { existsSync, unlinkSync, writeFileSync } from 'fs-extra'
import type { OpenAPIV3_1 } from 'openapi-types'
import { tmpdir } from 'os'
import { basename, join } from 'path'
import { describe, expect, it } from 'vitest'
import { SpecParsingError } from '../errors'
import { parseOpenApiSpec, parsePaths } from '../path_parser'

describe('path_parser', () => {
    describe('parseOpenApiSpec', () => {
        it('should parse a valid OpenAPI JSON file', async () => {
            const tempFile = join(tmpdir(), 'test-spec.json')
            const spec = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {},
            }

            writeFileSync(tempFile, JSON.stringify(spec))

            try {
                const result = await parseOpenApiSpec(tempFile)
                expect(result.openapi).toBe('3.0.0')
                expect(result.info.title).toBe('Test')
                expect(result.paths).toBeDefined()
            } finally {
                unlinkSync(tempFile)
            }
        })

        it('should parse a valid OpenAPI YAML file', async () => {
            const tempFile = join(tmpdir(), 'test-spec.yaml')
            const yamlContent = `
openapi: 3.0.0
info:
  title: Test API
  version: 1.0.0
paths:
  /users:
    get:
      responses:
        '200':
          description: Success
            `

            writeFileSync(tempFile, yamlContent)

            try {
                const result = await parseOpenApiSpec(tempFile)
                expect(result.openapi).toBe('3.0.0')
                expect(result.info.title).toBe('Test API')
                expect(result.paths?.['/users']).toBeDefined()
            } finally {
                unlinkSync(tempFile)
            }
        })

        it('should parse YAML file with .yml extension', async () => {
            const tempFile = join(tmpdir(), 'test-spec.yml')
            const yamlContent = `
openapi: 3.0.0
info:
  title: YML Test
  version: 1.0.0
paths: {}
            `

            writeFileSync(tempFile, yamlContent)

            try {
                const result = await parseOpenApiSpec(tempFile)
                expect(result.info.title).toBe('YML Test')
            } finally {
                unlinkSync(tempFile)
            }
        })

        it('should resolve internal $ref in YAML', async () => {
            const tempFile = join(tmpdir(), 'test-with-ref.yaml')
            const yamlContent = `
openapi: 3.0.0
info:
  title: Test
  version: 1.0.0
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
paths:
  /users:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
            `

            writeFileSync(tempFile, yamlContent)

            try {
                const result = await parseOpenApiSpec(tempFile)
                // Should be bundled - $ref should remain pointing to internal component
                const response =
                    result.paths?.['/users']?.get?.responses?.['200']
                const schema = (response as any)?.content?.['application/json']
                    ?.schema
                expect(schema).toBeDefined()
                expect(schema.$ref).toBe('#/components/schemas/User')
                // Verify the component exists
                expect(result.components?.schemas?.['User']).toBeDefined()
            } finally {
                unlinkSync(tempFile)
            }
        })

        it('should resolve external $ref across YAML files', async () => {
            const uniqueId = Math.random().toString(36).substring(7)
            const schemasFile = join(tmpdir(), `schemas-${uniqueId}.yaml`)
            const apiFile = join(tmpdir(), `api-${uniqueId}.yaml`)

            // Create external schemas file
            const schemasContent = `
components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
            `

            // Create API file with external ref
            const apiContent = `
openapi: 3.0.0
info:
  title: API with External Refs
  version: 1.0.0
paths:
  /products:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '${basename(schemasFile)}#/components/schemas/Product'
            `

            writeFileSync(schemasFile, schemasContent)
            writeFileSync(apiFile, apiContent)

            try {
                const result = await parseOpenApiSpec(apiFile)
                const response =
                    result.paths?.['/products']?.get?.responses?.['200']
                const schema = (response as any)?.content?.['application/json']
                    ?.schema

                // External ref should be bundled.
                // In this simple case, swagger-parser inlines it.
                expect(schema).toBeDefined()
                if ((schema as any).$ref) {
                    // If it's a ref, verify it points to a component
                    const refName = (schema as any).$ref.split('/').pop()!
                    const component = result.components?.schemas?.[
                        refName
                    ] as any
                    expect(component).toBeDefined()
                    expect(component.properties.id).toBeDefined()
                    expect(component.properties.name).toBeDefined()
                } else {
                    // If it's inlined, verify the properties
                    expect(schema.type).toBe('object')
                    expect(schema.properties.id).toBeDefined()
                    expect(schema.properties.name).toBeDefined()
                }
            } finally {
                if (existsSync(schemasFile)) unlinkSync(schemasFile)
                if (existsSync(apiFile)) unlinkSync(apiFile)
            }
        })

        it('should throw error for invalid YAML syntax', async () => {
            const tempFile = join(tmpdir(), 'invalid.yaml')
            const invalidYaml = `
openapi: 3.0.0
info:
  title: "Unclosed string
  version: 1.0.0
            `

            writeFileSync(tempFile, invalidYaml)

            try {
                await expect(parseOpenApiSpec(tempFile)).rejects.toThrow(
                    SpecParsingError
                )
            } finally {
                unlinkSync(tempFile)
            }
        })

        it('should throw error for missing file', async () => {
            const nonExistentFile = join(tmpdir(), 'does-not-exist.yaml')

            await expect(parseOpenApiSpec(nonExistentFile)).rejects.toThrow(
                SpecParsingError
            )
        })

        it('should throw error for invalid external $ref', async () => {
            const apiFile = join(tmpdir(), 'api-bad-ref.yaml')
            const apiContent = `
openapi: 3.0.0
info:
  title: Bad Ref
  version: 1.0.0
paths:
  /test:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: 'missing-file.yaml#/components/schemas/Missing'
            `

            writeFileSync(apiFile, apiContent)

            try {
                await expect(parseOpenApiSpec(apiFile)).rejects.toThrow(
                    SpecParsingError
                )
            } finally {
                unlinkSync(apiFile)
            }
        })
    })

    describe('parsePaths', () => {
        it('should return empty object when spec has no paths', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: undefined as any,
            }

            const result = parsePaths(spec)
            expect(result).toEqual({})
        })

        it('should skip null or undefined pathItems', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users': null as any,
                    '/posts': { get: { responses: {} } },
                },
            }

            const result = parsePaths(spec)
            expect(result.users).toBeUndefined()
            expect(result.posts).toBeDefined()
        })

        it('should parse simple paths', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users': {
                        get: { responses: {} },
                    },
                },
            }

            const result = parsePaths(spec)
            expect(result.users).toBeDefined()
            expect(result.users.get).toBeDefined()
        })

        it('should parse nested paths', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users/profile': {
                        get: { responses: {} },
                    },
                },
            }

            const result = parsePaths(spec)
            expect(result.users.profile.get).toBeDefined()
        })

        it('should convert path parameters to $ prefix', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users/{userId}': {
                        get: { responses: {} },
                    },
                },
            }

            const result = parsePaths(spec)
            expect(result.users.$userId).toBeDefined()
            expect(result.users.$userId.get).toBeDefined()
        })

        it('should handle multiple dynamic segments', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users/{userId}/posts/{postId}': {
                        get: { responses: {} },
                    },
                },
            }

            const result = parsePaths(spec)
            expect(result.users.$userId.posts.$postId.get).toBeDefined()
        })

        it('should merge multiple operations on the same path', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users': {
                        get: { responses: {} },
                        post: { responses: {} },
                    },
                },
            }

            const result = parsePaths(spec)
            expect(result.users.get).toBeDefined()
            expect(result.users.post).toBeDefined()
        })

        it('should handle paths with leading slash only', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/': {
                        get: { responses: {} },
                    },
                },
            }

            const result = parsePaths(spec)
            // Path "/" after split and filter becomes empty array, so result should be empty
            expect(Object.keys(result).length).toBe(0)
        })

        it('should handle paths with trailing slashes', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users/': {
                        get: { responses: {} },
                    },
                },
            }

            const result = parsePaths(spec)
            expect(result.users.get).toBeDefined()
        })

        it('should handle empty paths object', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {},
            }

            const result = parsePaths(spec)
            expect(result).toEqual({})
        })

        it('should handle complex nested structure with mixed static and dynamic paths', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/api/v1/users/{userId}/posts/{postId}/comments': {
                        get: { responses: {} },
                        post: { responses: {} },
                    },
                },
            }

            const result = parsePaths(spec)
            expect(
                result.api.v1.users.$userId.posts.$postId.comments.get
            ).toBeDefined()
            expect(
                result.api.v1.users.$userId.posts.$postId.comments.post
            ).toBeDefined()
        })

        it('should preserve path-level parameters and metadata', () => {
            const spec: OpenAPIV3_1.Document = {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: {
                    '/users': {
                        parameters: [{ name: 'test', in: 'query' }],
                        get: { responses: {} },
                    },
                },
            }

            const result = parsePaths(spec)
            expect(result.users.parameters).toBeDefined()
            expect(result.users.get).toBeDefined()
        })
    })
})
