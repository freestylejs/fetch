import type { OpenAPIV3_1 } from 'openapi-types'
import { SchemaValidationError } from './errors' // Assumed existing
import { toPascalCase } from './utils' // Assumed existing

export class SchemaGenerator {
    private spec: OpenAPIV3_1.Document

    private processedSchemas: Map<string, string> = new Map()
    private processingStack: Set<string> = new Set()
    private schemaReferences: Map<string, Set<string>> = new Map()
    private cyclicSchemas: Set<string> = new Set()
    private schemaNameMap: Map<string, string> = new Map()

    constructor(spec: OpenAPIV3_1.Document) {
        this.spec = spec
    }

    private isReferenceObject(obj: any): obj is OpenAPIV3_1.ReferenceObject {
        return obj && '$ref' in obj
    }

    private initializeSchemaNames() {
        if (!this.spec.components?.schemas) return

        const usedNames = new Set<string>()
        this.schemaNameMap.clear()

        for (const key of Object.keys(this.spec.components.schemas)) {
            let name = toPascalCase(key)

            // If name already exists (collision), append a counter
            // e.g., if "User" and "user" both exist, second becomes "User_1"
            let attempt = 1
            const originalName = name
            while (usedNames.has(name)) {
                name = `${originalName}_${attempt}`
                attempt++
            }

            usedNames.add(name)
            this.schemaNameMap.set(key, name)
        }
    }

    private getSchemaName(key: string): string {
        return this.schemaNameMap.get(key) || toPascalCase(key)
    }

    public generateZodSchema(
        schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
        nameHint: string = 'inline'
    ): string {
        return this.mapSchemaObjectToZod(nameHint, schema)
    }

    public generateModels(): string {
        if (!this.spec.components || !this.spec.components.schemas) {
            return ''
        }

        this.initializeSchemaNames()

        // 1. First pass: generate all schemas to populate dependency graph
        for (const name of Object.keys(this.spec.components.schemas)) {
            this.mapSchemaObjectToZod(name)
        }

        // 2. Detect Cycles
        this.cyclicSchemas = this.detectCycles()

        // 3. Clear processed cache to regenerate with correct lazy/static strategies
        this.processedSchemas.clear()
        this.processingStack.clear()

        const modelStrings: string[] = [`import { z } from 'zod';`]

        // 4. Sort schemas topologically
        const sortedSchemaNames = this.sortSchemas()

        // 5. Generate Types for ALL schemas for performance
        modelStrings.push('// Helper types for schemas')
        for (const name of sortedSchemaNames) {
            const pascalName = this.getSchemaName(name)
            const typeDef = this.mapSchemaObjectToType(name)
            modelStrings.push(`export type ${pascalName}Model = ${typeDef};`)
        }
        modelStrings.push('')

        // 6. Generate Zod Schemas
        for (const name of sortedSchemaNames) {
            const zodSchema =
                this.processedSchemas.get(name) ||
                this.mapSchemaObjectToZod(name)
            const pascalName = this.getSchemaName(name)

            // Use explicit type for perf.
            modelStrings.push(
                `export const ${pascalName}: z.ZodType<${pascalName}Model> = ${zodSchema};`
            )
        }

        return modelStrings.join('\n\n')
    }

    private mapSchemaObjectToType(
        name: string,
        schemaObject?: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject
    ): string {
        const schema = schemaObject || this.spec.components?.schemas?.[name]
        if (!schema) return 'any'

        if (this.isReferenceObject(schema)) {
            const { name: refName } = this.resolveRef(schema.$ref)
            return `${this.getSchemaName(refName)}Model`
        }

        if (schema.oneOf || schema.anyOf) {
            const items = schema.oneOf || schema.anyOf || []
            const parts = items.map((i) => this.mapSchemaObjectToType(name, i))
            return parts.join(' | ')
        }

        if (schema.allOf) {
            const parts = schema.allOf.map((i) =>
                this.mapSchemaObjectToType(name, i)
            )
            return parts.join(' & ')
        }

        // Handle nullable types (e.g. type: ['string', 'null'])
        if (Array.isArray(schema.type)) {
            const nonNullTypes = schema.type.filter((t) => t !== 'null')
            if (nonNullTypes.length === 1) {
                const innerSchema = {
                    ...schema,
                    type: nonNullTypes[0],
                } as OpenAPIV3_1.SchemaObject
                return `${this.mapSchemaObjectToType(name, innerSchema)} | null`
            }
            return 'any'
        }

        switch (schema.type) {
            case 'string':
                if (schema.enum)
                    return schema.enum.map((e) => `'${e}'`).join(' | ')
                return 'string'
            case 'integer':
            case 'number':
                return 'number'
            case 'boolean':
                return 'boolean'
            case 'array': {
                if (!schema.items) return 'any[]'
                const itemType = this.mapSchemaObjectToType(name, schema.items)
                // Wrap in parens if union/intersection to ensure Array syntax validity
                return itemType.includes('|') || itemType.includes('&')
                    ? `Array<${itemType}>`
                    : `${itemType}[]`
            }
            case 'object': {
                // Check purely for properties vs dictionary
                if (!schema.properties && !schema.additionalProperties)
                    return '{}'

                const props: string[] = []
                if (schema.properties) {
                    Object.entries(schema.properties).forEach(
                        ([key, value]) => {
                            const isRequired = schema.required?.includes(key)
                            const typeStr = this.mapSchemaObjectToType(
                                key,
                                value
                            )
                            props.push(
                                `  '${key}'${isRequired ? '' : '?'}: ${typeStr}${isRequired ? '' : ' | undefined'};`
                            )
                        }
                    )
                }

                if (schema.additionalProperties) {
                    const additionalTypes =
                        typeof schema.additionalProperties === 'object'
                            ? this.mapSchemaObjectToType(
                                  name,
                                  schema.additionalProperties
                              )
                            : 'any'
                    props.push(`  [key: string]: ${additionalTypes};`)
                }
                return `{\n${props.join('\n')}\n}`
            }
            default:
                return 'any'
        }
    }

    private sortSchemas(): string[] {
        const visited = new Set<string>()
        const sorted: string[] = []
        const recursionStack = new Set<string>()

        const visit = (name: string) => {
            if (recursionStack.has(name)) return
            if (visited.has(name)) return

            recursionStack.add(name)

            const refs = this.schemaReferences.get(name) || new Set()
            for (const ref of refs) {
                visit(ref)
            }

            recursionStack.delete(name)
            visited.add(name)
            sorted.push(name)
        }

        if (this.spec.components?.schemas) {
            for (const name of Object.keys(this.spec.components.schemas)) {
                visit(name)
            }
        }

        return sorted
    }

    private mapSchemaObjectToZod(
        name: string,
        schemaObject?: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
        currentSchema?: string
    ): string {
        const schema = schemaObject || this.spec.components?.schemas?.[name]
        if (!schema) {
            throw new SchemaValidationError(
                `Schema "${name}" not found`,
                name,
                `components.schemas.${name}`
            )
        }

        // Used cached string if fully processed
        if (this.processedSchemas.has(name) && !schemaObject) {
            // IMPORTANT: Use the unique name
            return this.getSchemaName(name)
        }

        // Lazy Loading for Cycles
        if (!schemaObject && this.processingStack.has(name)) {
            const from = currentSchema || name
            this.trackReference(from, name)
            return `z.lazy(() => ${this.getSchemaName(name)})`
        }

        if (!schemaObject) {
            this.processingStack.add(name)
        }

        // Handle References
        if (this.isReferenceObject(schema)) {
            const { name: refName } = this.resolveRef(schema.$ref)

            // Track dependency
            if (this.processingStack.size > 0) {
                const stackArray = Array.from(this.processingStack)
                const currentlyProcessing = stackArray[stackArray.length - 1]!
                this.trackReference(currentlyProcessing, refName)
            }

            // Lazy load if cyclic or recursion detected
            const isCyclic = this.cyclicSchemas.has(refName)
            const isRecursive = this.processingStack.has(refName)
            const isForwardRef =
                !this.processedSchemas.has(refName) &&
                !this.processingStack.has(refName) &&
                !schemaObject

            if (isCyclic || isRecursive || isForwardRef) {
                if (
                    !this.processedSchemas.has(refName) &&
                    !this.processingStack.has(refName)
                ) {
                    this.mapSchemaObjectToZod(refName, undefined, name)
                }
                const result = `z.lazy(() => ${this.getSchemaName(refName)})`

                if (!schemaObject) {
                    this.processingStack.delete(name)
                    this.processedSchemas.set(name, result)
                }
                return result
            }

            // Standard Reference
            this.mapSchemaObjectToZod(refName, undefined, name)
            const result = this.getSchemaName(refName)

            if (!schemaObject) {
                this.processingStack.delete(name)
                this.processedSchemas.set(name, result)
            }
            return result
        }

        // Handle allOf, oneOf, anyOf, and Types
        if (schema.allOf) {
            const allOfSchemas = schema.allOf
                .map((s) => this.mapSchemaObjectToZod(name, s))
                .join('.and(')
            const zodSchema = allOfSchemas + ')'.repeat(schema.allOf.length - 1)
            if (!schemaObject) {
                this.processedSchemas.set(name, zodSchema)
                this.processingStack.delete(name)
            }
            return zodSchema
        }

        if (schema.oneOf || schema.anyOf) {
            const items = schema.oneOf || schema.anyOf || []
            const options = items.map((s) => this.mapSchemaObjectToZod(name, s))

            let zodSchema: string
            if (schema.oneOf && schema.discriminator) {
                zodSchema = `z.discriminatedUnion('${schema.discriminator.propertyName}', [${options.join(', ')}])`
            } else {
                zodSchema = `z.union([${options.join(', ')}])`
            }

            if (!schemaObject) {
                this.processedSchemas.set(name, zodSchema)
                this.processingStack.delete(name)
            }
            return zodSchema
        }

        // Standard Types
        let zodString = 'z.any()'

        // Handle nullable types
        if (Array.isArray(schema.type)) {
            if (schema.type.includes('null')) {
                const nonNullTypes = schema.type.filter((t) => t !== 'null')
                if (nonNullTypes.length === 1) {
                    const innerSchema = {
                        ...schema,
                        type: nonNullTypes[0],
                    } as OpenAPIV3_1.SchemaObject
                    zodString = `${this.mapSchemaObjectToZod(name, innerSchema)}.nullable()`
                } else {
                    // Complex union nullable
                    zodString = 'z.any()' // Simplification for complex union arrays
                }
            }
        } else {
            switch (schema.type) {
                case 'string':
                    if (schema.const) {
                        zodString = `z.literal('${schema.const}')`
                    } else if (schema.enum) {
                        zodString = `z.enum([${schema.enum.map((e) => `'${e}'`).join(', ')}])`
                    } else {
                        zodString = 'z.string()'
                        if (schema.format === 'date-time')
                            zodString = 'z.iso.datetime()' // Zod 3.20+
                        else if (schema.format === 'email')
                            zodString = 'z.email()'
                        else if (schema.format === 'uri') zodString = 'z.url()'
                        else if (schema.format === 'uuid')
                            zodString = 'z.uuid()'
                        if (schema.pattern) {
                            const escapedPattern = schema.pattern
                                .replace(/\\/g, '\\\\')
                                .replace(/\//g, '\\/')
                            zodString += `.regex(/${escapedPattern}/)`
                        }
                    }
                    break
                case 'number':
                case 'integer':
                    zodString = 'z.number()'
                    if (schema.type === 'integer') zodString += '.int()'
                    if (schema.minimum !== undefined)
                        zodString += `.min(${schema.minimum})`
                    if (schema.maximum !== undefined)
                        zodString += `.max(${schema.maximum})`
                    break
                case 'boolean':
                    zodString = 'z.boolean()'
                    break
                case 'array': {
                    if (schema.items) {
                        const itemSchema = this.mapSchemaObjectToZod(
                            name,
                            schema.items
                        )
                        zodString = `z.array(${itemSchema})`
                    } else {
                        zodString = 'z.array(z.any())'
                    }
                    break
                }
                case 'object':
                    if (schema.properties) {
                        const properties = Object.entries(schema.properties)
                            .map(([key, value]) => {
                                const isRequired =
                                    schema.required?.includes(key)
                                const zodType = this.mapSchemaObjectToZod(
                                    key,
                                    value
                                )
                                return `'${key}': ${isRequired ? zodType : `${zodType}.optional()`}`
                            })
                            .join(',\n')
                        zodString = `z.object({\n${properties}\n})`
                    } else {
                        zodString = `z.object({})`
                    }

                    if (schema.additionalProperties) {
                        if (schema.additionalProperties === true) {
                            zodString += `.catchall(z.any())`
                        } else if (
                            typeof schema.additionalProperties === 'object'
                        ) {
                            const additionalSchema = this.mapSchemaObjectToZod(
                                name,
                                schema.additionalProperties
                            )
                            // If it's a record (no properties defined), use z.record
                            if (schema.properties) {
                                zodString += `.catchall(${additionalSchema})`
                            } else {
                                zodString = `z.record(z.string(), ${additionalSchema})`
                            }
                        }
                    }
                    break
                default:
                    zodString = 'z.any()'
                    break
            }
        }

        if (!schemaObject) {
            this.processedSchemas.set(name, zodString)
            this.processingStack.delete(name)
        }
        return zodString
    }

    private resolveRef(ref: string): {
        name: string
        schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject
    } {
        if (!ref.startsWith('#/components/schemas/')) {
            throw new SchemaValidationError(
                `Unsupported $ref: ${ref}`,
                'unknown',
                ref
            )
        }
        const name = ref.split('/').pop()!
        const schema = this.spec.components?.schemas?.[name]
        if (!schema) {
            throw new SchemaValidationError(
                `Schema not found: ${ref}`,
                name,
                ref
            )
        }
        return { name, schema }
    }

    private trackReference(from: string, to: string): void {
        if (!this.schemaReferences.has(from)) {
            this.schemaReferences.set(from, new Set())
        }
        this.schemaReferences.get(from)!.add(to)
    }

    private detectCycles(): Set<string> {
        const cyclicSchemas = new Set<string>()
        const visited = new Set<string>()
        const recursionStack = new Set<string>()

        const dfs = (schema: string): boolean => {
            if (recursionStack.has(schema)) {
                cyclicSchemas.add(schema)
                return true
            }
            if (visited.has(schema)) return false

            visited.add(schema)
            recursionStack.add(schema)

            const refs = this.schemaReferences.get(schema) || new Set()
            for (const ref of refs) {
                if (dfs(ref)) cyclicSchemas.add(schema)
            }

            recursionStack.delete(schema)
            return cyclicSchemas.has(schema)
        }

        for (const schema of this.schemaReferences.keys()) {
            if (!visited.has(schema)) dfs(schema)
        }

        return cyclicSchemas
    }
}
