import { describe, expect, it } from 'vitest'
import {
    convertHtmlToMarkdown,
    createJSDocComment,
    toPascalCase,
} from '../utils'

describe('utils', () => {
    describe('convertHtmlToMarkdown', () => {
        it('should return empty string for empty input', () => {
            expect(convertHtmlToMarkdown('')).toBe('')
        })

        it('should convert paragraphs to newlines', () => {
            expect(convertHtmlToMarkdown('<p>Hello</p><p>World</p>')).toBe(
                'Hello\n\nWorld'
            )
        })

        it('should convert links to markdown', () => {
            expect(
                convertHtmlToMarkdown(
                    '<a href="https://example.com">Example</a>'
                )
            ).toBe('[Example](https://example.com)')
        })

        it('should convert code tags to backticks', () => {
            expect(convertHtmlToMarkdown('<code>code</code>')).toBe('`code`')
        })

        it('should convert bold tags', () => {
            expect(convertHtmlToMarkdown('<strong>bold</strong>')).toBe(
                '**bold**'
            )
            expect(convertHtmlToMarkdown('<b>bold</b>')).toBe('**bold**')
        })

        it('should convert italic tags', () => {
            expect(convertHtmlToMarkdown('<em>italic</em>')).toBe('*italic*')
            expect(convertHtmlToMarkdown('<i>italic</i>')).toBe('*italic*')
        })

        it('should convert lists', () => {
            expect(
                convertHtmlToMarkdown('<ul><li>Item 1</li><li>Item 2</li></ul>')
            ).toBe('- Item 1\n- Item 2')
        })

        it('should handle complex nested HTML', () => {
            const html = `
                <p>This is a <strong>bold</strong> statement.</p>
                <p>Check out <a href="/link">this link</a>.</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2 with <code>code</code></li>
                </ul>
            `
            const expected = `This is a **bold** statement.\n\nCheck out [this link](/link).\n\n- Item 1\n- Item 2 with \`code\``
            // Normalize whitespace for comparison
            expect(
                convertHtmlToMarkdown(html).replace(/\s+/g, ' ').trim()
            ).toBe(expected.replace(/\s+/g, ' ').trim())
        })

        it('should decode HTML entities', () => {
            expect(convertHtmlToMarkdown('&lt;div&gt;')).toBe('<div>')
            expect(convertHtmlToMarkdown('&amp;')).toBe('&')
        })
    })

    describe('createJSDocComment', () => {
        it('should return empty string if no summary or description', () => {
            expect(createJSDocComment()).toBe('')
            expect(createJSDocComment(undefined, undefined)).toBe('')
        })

        it('should generate JSDoc with summary only', () => {
            const result = createJSDocComment('This is a summary')
            expect(result).toBe('/**\n * This is a summary\n */\n')
        })

        it('should generate JSDoc with description only', () => {
            const result = createJSDocComment(
                undefined,
                'This is a description'
            )
            expect(result).toBe('/**\n * This is a description\n */\n')
        })

        it('should generate JSDoc with summary and description', () => {
            const result = createJSDocComment('Summary', 'Description')
            expect(result).toBe('/**\n * Summary\n *\n * Description\n */\n')
        })

        it('should handle multi-line descriptions', () => {
            const result = createJSDocComment('Summary', 'Line 1\nLine 2')
            expect(result).toBe(
                '/**\n * Summary\n *\n * Line 1\n * Line 2\n */\n'
            )
        })

        it('should handle indentation', () => {
            const result = createJSDocComment('Summary', undefined, '  ')
            expect(result).toBe('  /**\n   * Summary\n   */\n')
        })
    })

    describe('toPascalCase', () => {
        it('should convert kebab-case to PascalCase', () => {
            expect(toPascalCase('user-profile')).toBe('UserProfile')
            expect(toPascalCase('api-key')).toBe('ApiKey')
            expect(toPascalCase('my-long-variable-name')).toBe(
                'MyLongVariableName'
            )
        })

        it('should convert snake_case to PascalCase', () => {
            expect(toPascalCase('user_profile')).toBe('UserProfile')
            expect(toPascalCase('api_key')).toBe('ApiKey')
            expect(toPascalCase('my_long_variable_name')).toBe(
                'MyLongVariableName'
            )
        })

        it('should convert camelCase to PascalCase', () => {
            expect(toPascalCase('userProfile')).toBe('UserProfile')
            expect(toPascalCase('apiKey')).toBe('ApiKey')
            expect(toPascalCase('myLongVariableName')).toBe(
                'MyLongVariableName'
            )
        })

        it('should convert space-separated to PascalCase', () => {
            expect(toPascalCase('user profile')).toBe('UserProfile')
            expect(toPascalCase('api key')).toBe('ApiKey')
            expect(toPascalCase('my long variable name')).toBe(
                'MyLongVariableName'
            )
        })

        it('should handle already PascalCase strings', () => {
            expect(toPascalCase('UserProfile')).toBe('UserProfile')
            expect(toPascalCase('APIKey')).toBe('ApiKey') // Splits API and Key
        })

        it('should preserve leading special characters', () => {
            expect(toPascalCase('$special-key')).toBe('$SpecialKey')
            expect(toPascalCase('$dollar')).toBe('$Dollar')
            // Underscore at the start is treated as separator, not special char
            expect(toPascalCase('_private-var')).toBe('PrivateVar')
        })

        it('should handle mixed separators', () => {
            expect(toPascalCase('user-profile_name')).toBe('UserProfileName')
            expect(toPascalCase('api_key-value')).toBe('ApiKeyValue')
        })

        it('should handle empty string', () => {
            expect(toPascalCase('')).toBe('')
        })

        it('should handle single word', () => {
            expect(toPascalCase('user')).toBe('User')
            expect(toPascalCase('api')).toBe('Api')
        })

        it('should handle all uppercase', () => {
            expect(toPascalCase('API')).toBe('API') // Single word, already uppercase
            expect(toPascalCase('HTTP')).toBe('HTTP')
        })

        it('should handle numbers in names', () => {
            expect(toPascalCase('user-1-profile')).toBe('User1Profile')
            expect(toPascalCase('api2-key')).toBe('Api2Key')
        })

        it('should handle consecutive separators', () => {
            expect(toPascalCase('user--profile')).toBe('UserProfile')
            expect(toPascalCase('api__key')).toBe('ApiKey')
            expect(toPascalCase('my  name')).toBe('MyName')
        })

        it('should handle real-world cases from codebase', () => {
            expect(toPascalCase('user-profile')).toBe('UserProfile')
            expect(toPascalCase('HellObject')).toBe('HellObject') // No separators, preserve
            expect(toPascalCase('BaseList')).toBe('BaseList')
            expect(toPascalCase('ProductList')).toBe('ProductList')
        })
    })
})
