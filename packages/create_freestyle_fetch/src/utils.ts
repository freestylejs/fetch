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

    if (!/[\s\-_.]/.test(str)) {
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
        .split(/[\s\-_.]+/) // Split on spaces, hyphens, underscores, and dots
        .filter((word) => word.length > 0)

    return words
        .map((word) => {
            // Preserve leading special characters (but not underscore/dot which are separators)
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

/**
 * Quotes a value as a single-quoted string literal safe for embedding in
 * generated code, escaping backslashes and single quotes.
 *
 * @example
 * quoteString("start-date") // "'start-date'"
 * quoteString("it's")       // "'it\\'s'"
 * quoteString("a\\b")       // "'a\\\\b'"
 */
export function quoteString(value: string): string {
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

/**
 * Formats a scalar enum/const value as a Zod literal expression fragment.
 * Strings are quoted, null stays bare, numbers/booleans render as-is.
 *
 * @example
 * formatZodLiteral("a")  // "'a'"
 * formatZodLiteral(42)   // "42"
 * formatZodLiteral(null) // "null"
 */
export function formatZodLiteral(value: unknown): string {
    if (typeof value === 'string') return quoteString(value)
    if (value === null) return 'null'
    return String(value)
}

/**
 * Ensures a name is a valid ECMAScript identifier by prefixing an underscore
 * when it starts with a character that cannot begin an identifier (e.g. a digit).
 *
 * @example
 * toSafeIdentifier("UserProfile") // "UserProfile"
 * toSafeIdentifier("2fa")         // "_2fa"
 * toSafeIdentifier("")            // "_"
 */
export function toSafeIdentifier(name: string): string {
    if (!name) return '_'
    return /^[A-Za-z_$]/.test(name) ? name : `_${name}`
}

/**
 * Converts HTML content to Markdown for better JSDoc rendering
 */
export function convertHtmlToMarkdown(html: string): string {
    if (!html) return ''

    let markdown = html
        // Replace <p> tags with double newlines
        .replace(/<p>/g, '\n\n')
        .replace(/<\/p>/g, '')
        // Replace <br> with newline
        .replace(/<br\s*\/?>/g, '\n')
        // Replace <a> tags with markdown links [text](url)
        .replace(
            /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/g,
            '[$2]($1)'
        )
        // Replace <code> tags with backticks
        .replace(/<code>(.*?)<\/code>/g, '`$1`')
        // Replace <strong> and <b> with bold
        .replace(/<(?:strong|b)>(.*?)<\/(?:strong|b)>/g, '**$1**')
        // Replace <em> and <i> with italic
        .replace(/<(?:em|i)>(.*?)<\/(?:em|i)>/g, '*$1*')
        // Replace <ul> and <li>
        .replace(/<ul>/g, '\n')
        .replace(/<\/ul>/g, '')
        .replace(/<li>/g, '- ')
        .replace(/<\/li>/g, '\n')

    // Remove any remaining HTML tags
    markdown = markdown.replace(/<[^>]*>/g, '')

    // Decode common HTML entities
    markdown = markdown
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")

    // Fix multiple newlines (more than 2)
    markdown = markdown.replace(/\n{3,}/g, '\n\n')

    // Trim whitespace
    return markdown.trim()
}

/**
 * Creates a formatted JSDoc comment string
 * @param summary - Brief summary of the item
 * @param description - Detailed description of the item
 * @param indent - Indentation string (default: '')
 * @returns Formatted JSDoc string or empty string if no content
 */
export function createJSDocComment(
    summary?: string,
    description?: string,
    indent: string = ''
): string {
    if (!summary && !description) return ''

    const lines: string[] = ['/**']

    if (summary) {
        const cleanSummary = convertHtmlToMarkdown(summary)
        lines.push(` * ${cleanSummary}`)
        if (description) lines.push(' *')
    }

    if (description) {
        const cleanDescription = convertHtmlToMarkdown(description)
        // Split description into lines and handle potential multi-line descriptions
        const descLines = cleanDescription.split('\n')
        descLines.forEach((line) => {
            lines.push(` * ${line}`)
        })
    }

    lines.push(' */')

    return lines.map((line) => `${indent}${line}`).join('\n') + '\n'
}

export const GENERATED_FILE_HEADER = [
    '// GENERATED FILE - DO NOT EDIT.',
    '// Machine-generated by create-freestyle-fetch; manual changes are lost on regeneration.',
].join('\n')
