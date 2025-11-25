import { describe, expect, it } from 'vitest'
import {
    ConfigurationError,
    FileSystemError,
    SchemaValidationError,
    SpecParsingError,
} from '../errors'

describe('GeneratorError classes', () => {
    describe('SpecParsingError', () => {
        it('should format error with file path only', () => {
            const error = new SpecParsingError(
                'Invalid OpenAPI version',
                '/path/to/spec.yaml'
            )
            const formatted = error.format()

            expect(formatted).toContain('Error parsing OpenAPI specification')
            expect(formatted).toContain('/path/to/spec.yaml')
            expect(formatted).toContain('Invalid OpenAPI version')
        })

        it('should format error with line and column', () => {
            const error = new SpecParsingError(
                'Unexpected token',
                '/path/to/spec.yaml',
                42,
                15
            )
            const formatted = error.format()

            expect(formatted).toContain('/path/to/spec.yaml:42:15')
            expect(formatted).toContain('Unexpected token')
        })

        it('should include suggestion when provided', () => {
            const error = new SpecParsingError(
                'Missing required field',
                '/path/to/spec.yaml',
                undefined,
                undefined,
                'Add the "info" section to your spec'
            )
            const formatted = error.format()

            expect(formatted).toContain('💡 Suggestion:')
            expect(formatted).toContain('Add the "info" section')
        })

        it('should format error with line but no column', () => {
            const error = new SpecParsingError(
                'Indentation error',
                '/path/to/spec.yaml',
                10
            )
            const formatted = error.format()

            expect(formatted).toContain('/path/to/spec.yaml:10')
            expect(formatted).not.toContain(':10:')
        })
    })

    describe('SchemaValidationError', () => {
        it('should format error with schema context', () => {
            const error = new SchemaValidationError(
                'Type mismatch',
                'UserSchema',
                '#/components/schemas/User'
            )
            const formatted = error.format()

            expect(formatted).toContain('Invalid Schema')
            expect(formatted).toContain('UserSchema')
            expect(formatted).toContain('#/components/schemas/User')
            expect(formatted).toContain('Type mismatch')
        })

        it('should include suggestion when provided', () => {
            const error = new SchemaValidationError(
                'Missing type field',
                'UserSchema',
                '#/components/schemas/User',
                'Add a "type" field to the schema'
            )
            const formatted = error.format()

            expect(formatted).toContain('💡 Suggestion:')
            expect(formatted).toContain('Add a "type" field')
        })
    })

    describe('FileSystemError', () => {
        it('should format read error', () => {
            const error = new FileSystemError(
                'File not found',
                'read',
                '/path/to/file.json'
            )
            const formatted = error.format()

            expect(formatted).toContain('File System Error (read)')
            expect(formatted).toContain('/path/to/file.json')
            expect(formatted).toContain('File not found')
        })

        it('should format write error', () => {
            const error = new FileSystemError(
                'Permission denied',
                'write',
                '/path/to/output.ts'
            )
            const formatted = error.format()

            expect(formatted).toContain('File System Error (write)')
            expect(formatted).toContain('Permission denied')
        })
    })

    describe('ConfigurationError', () => {
        it('should format error with option and value', () => {
            const error = new ConfigurationError(
                'Invalid output path',
                'output',
                '/invalid/path',
                'Provide a valid directory path'
            )
            const formatted = error.format()

            expect(formatted).toContain('Configuration Error')
            expect(formatted).toContain('--output')
            expect(formatted).toContain('/invalid/path')
            expect(formatted).toContain('Invalid output path')
            expect(formatted).toContain('💡 Suggestion:')
        })

        it('should format error without option', () => {
            const error = new ConfigurationError('Missing required arguments')
            const formatted = error.format()

            expect(formatted).toContain('Configuration Error')
            expect(formatted).toContain('Missing required arguments')
            expect(formatted).not.toContain('Option:')
        })

        it('should format error with option but no value', () => {
            const error = new ConfigurationError(
                'Option is required',
                'input',
                undefined,
                'Provide the path to your OpenAPI spec'
            )
            const formatted = error.format()

            expect(formatted).toContain('--input')
            expect(formatted).not.toContain('Provided:')
            expect(formatted).toContain('💡 Suggestion:')
        })
    })

    describe('Error instanceof checks', () => {
        it('should be instances of Error', () => {
            const specError = new SpecParsingError('test', '/path/to/spec.yaml')
            const schemaError = new SchemaValidationError(
                'test',
                'Schema',
                'path'
            )
            const fsError = new FileSystemError('test', 'read', '/path')
            const configError = new ConfigurationError('test')

            expect(specError).toBeInstanceOf(Error)
            expect(schemaError).toBeInstanceOf(Error)
            expect(fsError).toBeInstanceOf(Error)
            expect(configError).toBeInstanceOf(Error)
        })

        it('should capture stack traces', () => {
            const error = new SpecParsingError('test', '/path/to/spec.yaml')

            expect(error.stack).toBeDefined()
            expect(error.stack).toContain('SpecParsingError')
        })
    })
})
