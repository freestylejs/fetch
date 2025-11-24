/**
 * Converts a string to PascalCase
 * Handles kebab-case, snake_case, camelCase, spaces, and special characters
 *
 * @example
 * toPascalCase("user-profile") // "UserProfile"
 * toPascalCase("user_profile") // "UserProfile"
 * toPascalCase("userProfile")  // "UserProfile"
 * toPascalCase("user profile") // "UserProfile"
 * toPascalCase("$special-key") // "$SpecialKey"
 * toPascalCase("APIKey")       // "ApiKey" (treats consecutive capitals as one word)
 */
export function toPascalCase(str: string): string {
    if (!str) return str

    if (!/[\s\-_]/.test(str)) {
        const words = str
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase: "userId" -> "user Id"
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Split "XMLParser" -> "XML Parser"
            .split(' ')
            .filter((word) => word.length > 0)

        if (words.length === 1) {
            const match = str.match(/^([^a-zA-Z0-9]*)(.*)$/)
            if (!match) return str
            const [, prefix, rest] = match
            if (!rest) return str
            return prefix + rest.charAt(0).toUpperCase() + rest.slice(1)
        }
    }

    const words = str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase: "userId" -> "user Id"
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Split "XMLParser" -> "XML Parser"
        .split(/[\s\-_]+/) // Split on spaces, hyphens, underscores
        .filter((word) => word.length > 0)

    return words
        .map((word) => {
            // Preserve leading special characters (but not underscore which is a separator)
            const match = word.match(/^([^a-zA-Z0-9]*)(.*)$/)
            if (!match) return word

            const [, prefix, rest] = match
            if (!rest) return word

            return (
                prefix +
                rest.charAt(0).toUpperCase() +
                rest.slice(1).toLowerCase()
            )
        })
        .join('')
}
