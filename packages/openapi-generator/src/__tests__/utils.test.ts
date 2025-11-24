import { describe, expect, it } from 'vitest'
import { toPascalCase } from '../utils'

describe('utils', () => {
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
