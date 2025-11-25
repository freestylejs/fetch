import type { OpenAPIV3_1 } from 'openapi-types'
import { describe, expect, it } from 'vitest'
import { SpecValidator } from '../validator'

describe('SpecValidator', () => {
    it('should detect missing operation IDs', () => {
        const spec: OpenAPIV3_1.Document = {
            openapi: '3.1.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: {
                '/users': {
                    get: {
                        responses: { '200': { description: 'OK' } },
                    },
                },
            },
        }

        const validator = new SpecValidator(spec)
        const warnings = validator.validate()

        expect(warnings).toHaveLength(1)
        expect(warnings[0]).toEqual({
            code: 'MISSING_OPERATION_ID',
            message:
                'Missing operationId for GET operation. A generated ID will be used, but explicit IDs are recommended for better client method names.',
            path: 'GET /users',
        })
    })

    it('should not warn if operation IDs are present', () => {
        const spec: OpenAPIV3_1.Document = {
            openapi: '3.1.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: {
                '/users': {
                    get: {
                        operationId: 'getUsers',
                        responses: { '200': { description: 'OK' } },
                    },
                },
            },
        }

        const validator = new SpecValidator(spec)
        const warnings = validator.validate()

        expect(warnings).toHaveLength(0)
    })

    it('should format warnings correctly', () => {
        const spec: OpenAPIV3_1.Document = {
            openapi: '3.1.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: {
                '/users': {
                    get: {
                        responses: { '200': { description: 'OK' } },
                    },
                },
            },
        }

        const validator = new SpecValidator(spec)
        validator.validate()
        const formatted = validator.formatWarnings()

        expect(formatted).toContain('Validation Warnings:')
        expect(formatted).toContain('Missing operationId')
        expect(formatted).toContain('Path:')
        expect(formatted).toContain('GET /users')
    })

    it('should return empty string for no warnings', () => {
        const spec: OpenAPIV3_1.Document = {
            openapi: '3.1.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: {},
        }

        const validator = new SpecValidator(spec)
        validator.validate()
        const formatted = validator.formatWarnings()

        expect(formatted).toBe('')
    })
})
