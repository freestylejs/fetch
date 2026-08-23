import type { OpenAPIV3_1 } from 'openapi-types'
import { SchemaValidationError } from './errors' // Assumed existing
import {
    createJSDocComment,
    formatZodLiteral,
    quoteString,
    toPascalCase,
    toSafeIdentifier,
} from './utils' // Assumed existing

/**
 * Output context for generated Zod expressions.
 * - "models": references are bare exported names (models.ts scope)
 * - "api": references are qualified as Model.<ExportedName> (api.ts scope)
 */
export type OutputContext = 'models' | 'api'

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
            let name = toSafeIdentifier(toPascalCase(key))

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

    /**
     * Lazily builds the collision-resolution map if it has not been built yet.
     */
    private ensureSchemaNames() {
        if (
            this.schemaNameMap.size === 0 &&
            this.spec.components?.schemas &&
            Object.keys(this.spec.components.schemas).length > 0
        ) {
            this.initializeSchemaNames()
        }
    }

    private getSchemaName(key: string): string {
        return (
            this.schemaNameMap.get(key) ?? toSafeIdentifier(toPascalCase(key))
        )
    }

    /**
     * Resolves a raw component schema key (e.g. the terminal segment of a
     * $ref) to the exported model name, honoring collision resolution
     * ("_1" suffixes) and identifier sanitization.
     */
    public getExportedName(rawName: string): string {
        this.ensureSchemaNames()
        return this.getSchemaName(rawName)
    }

    /**
     * The raw schema key → exported model name collision-resolution map.
     * Consumers generating references into models.ts must go through it.
     */
    public getCollisionMap(): ReadonlyMap<string, string> {
        this.ensureSchemaNames()
        return new Map(this.schemaNameMap)
    }

    public generateZodSchema(
        schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
        nameHint: string = 'inline',
        outputContext: OutputContext = 'models'
    ): string {
        return this.mapSchemaObjectToZod(
            nameHint,
            schema,
            undefined,
            outputContext
        )
    }

    /**
     * Schemas that must NOT get an explicit `: z.ZodType<X>` annotation:
     * - union/discriminatedUnion/intersection results (their inferred type
     *   is not compatible with a plain ZodType<X> declaration), and
     * - schemas referenced as members of such compositions (the annotation
     *   erases discriminant/propValues info required by z.discriminatedUnion).
     */
    private computeAnnotationExemptions(): Set<string> {
        const exempt = new Set<string>()
        const schemas = this.spec.components?.schemas
        if (!schemas) return exempt

        const isComposition = (schema: any): boolean =>
            schema &&
            !this.isReferenceObject(schema) &&
            Boolean(schema.allOf || schema.oneOf || schema.anyOf)

        for (const [parentName, refs] of this.schemaReferences) {
            if (!isComposition(schemas[parentName])) continue
            for (const ref of refs) exempt.add(ref)
        }
        return exempt
    }

    private shouldAnnotate(name: string, exemptions: Set<string>): boolean {
        const schema = this.spec.components?.schemas?.[name]
        if (!schema || this.isReferenceObject(schema)) return false

        // Cyclic schemas must keep their explicit annotation: the initializer
        // chain relies on it to break TS7022 circularity. Losing it degrades
        // every `z.lazy(() => X)` that references them to `any`.
        if (this.cyclicSchemas.has(name)) return true

        // Composition results rely on inference (G-7).
        if (schema.allOf || schema.oneOf || schema.anyOf) return false

        return !exemptions.has(name)
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

        // 2.5. Determine which schemas must rely on type inference
        const annotationExemptions = this.computeAnnotationExemptions()

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
            const schema = this.spec.components?.schemas?.[name]
            const description =
                schema && !this.isReferenceObject(schema)
                    ? schema.description
                    : undefined
            const jsDoc = createJSDocComment(undefined, description)

            const typeDef = this.mapSchemaObjectToType(name)
            modelStrings.push(
                `${jsDoc}export type ${pascalName}Model = ${typeDef};`
            )
        }
        modelStrings.push('')

        // 6. Generate Zod Schemas
        for (const name of sortedSchemaNames) {
            const zodSchema =
                this.processedSchemas.get(name) ||
                this.mapSchemaObjectToZod(name)
            const pascalName = this.getSchemaName(name)

            // Use explicit type for perf, unless inference is required (G-7).
            const schema = this.spec.components?.schemas?.[name]
            const description =
                schema && !this.isReferenceObject(schema)
                    ? schema.description
                    : undefined
            const jsDoc = createJSDocComment(undefined, description)

            const typeAnnotation = this.shouldAnnotate(
                name,
                annotationExemptions
            )
                ? `: z.ZodType<${pascalName}Model>`
                : ''

            modelStrings.push(
                `${jsDoc}export const ${pascalName}${typeAnnotation} = ${zodSchema};`
            )
        }

        return modelStrings.join('\n\n')
    }

    /**
     * G-9: OpenAPI 3.0 `nullable: true` widens the generated model type
     * with `| null` (mirroring the `.nullable()` added on the Zod side).
     */
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

        const baseType = this.computeBaseType(name, schema)

        // Nullability already expressed via a 3.1 type array is handled inside
        // computeBaseType; only the boolean 3.0 keyword appends here.
        const typeArrayIncludesNull =
            Array.isArray(schema.type) && schema.type.includes('null')
        // `nullable` is an OpenAPI 3.0 keyword absent from the 3.1 typings.
        const isNullable = (schema as { nullable?: boolean }).nullable === true
        if (isNullable && !typeArrayIncludesNull) {
            return `${baseType} | null`
        }
        return baseType
    }

    private computeBaseType(
        name: string,
        schema: OpenAPIV3_1.SchemaObject
    ): string {
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

        // G-13: enums with non-string members must keep their literal types.
        // String-only enums render identically through the same path.
        if (schema.enum) {
            return schema.enum.map((e) => formatZodLiteral(e)).join(' | ')
        }

        switch (schema.type) {
            case 'string':
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
                            const description =
                                'description' in value
                                    ? (value.description as string)
                                    : undefined
                            const jsDoc = createJSDocComment(
                                undefined,
                                description,
                                '  '
                            )
                            props.push(
                                `${jsDoc}  ${quoteString(key)}${isRequired ? '' : '?'}: ${typeStr}${isRequired ? '' : ' | undefined'};`
                            )
                        }
                    )
                }

                // G-8: a properties-bearing schema must not also declare a
                // string index signature (conflicting member types, TS2411).
                // The runtime catchall on the Zod side is preserved.
                if (schema.additionalProperties && !schema.properties) {
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

    /**
     * Qualifies a bare exported model name for the given output context.
     * In api.ts scope, models live behind the `Model` namespace import.
     */
    private modelRef(name: string, outputContext: OutputContext): string {
        return outputContext === 'api' ? `Model.${name}` : name
    }

    private mapSchemaObjectToZod(
        name: string,
        schemaObject?: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
        currentSchema?: string,
        outputContext: OutputContext = 'models'
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
            return this.modelRef(this.getSchemaName(name), outputContext)
        }

        // Lazy Loading for Cycles
        if (!schemaObject && this.processingStack.has(name)) {
            const from = currentSchema || name
            this.trackReference(from, name)
            return `z.lazy(() => ${this.modelRef(this.getSchemaName(name), outputContext)})`
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
                    this.mapSchemaObjectToZod(
                        refName,
                        undefined,
                        name,
                        outputContext
                    )
                }
                const result = `z.lazy(() => ${this.modelRef(this.getSchemaName(refName), outputContext)})`

                if (!schemaObject) {
                    this.processingStack.delete(name)
                    this.processedSchemas.set(name, result)
                }
                return result
            }

            // Standard Reference
            this.mapSchemaObjectToZod(refName, undefined, name, outputContext)
            const result = this.modelRef(
                this.getSchemaName(refName),
                outputContext
            )

            if (!schemaObject) {
                this.processingStack.delete(name)
                this.processedSchemas.set(name, result)
            }
            return result
        }

        // Handle allOf, oneOf, anyOf, and Types
        if (schema.allOf) {
            const allOfSchemas = schema.allOf
                .map((s) =>
                    this.mapSchemaObjectToZod(name, s, undefined, outputContext)
                )
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
            const options = items.map((s) =>
                this.mapSchemaObjectToZod(name, s, undefined, outputContext)
            )

            let zodSchema: string
            if (schema.oneOf && schema.discriminator) {
                zodSchema = `z.discriminatedUnion(${quoteString(schema.discriminator.propertyName)}, [${options.join(', ')}])`
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

        // G-13: const/enum values are handled generically (independent of the
        // declared type) so non-string members and type-less enums keep their
        // literal values instead of degrading to z.any()/plain primitives.
        if (schema.const !== undefined) {
            zodString = `z.literal(${formatZodLiteral(schema.const)})`
        } else if (
            schema.enum &&
            schema.enum.every((e) => typeof e === 'string')
        ) {
            // G-13: string-only enums keep z.enum
            zodString = `z.enum([${schema.enum
                .map((e) => quoteString(e))
                .join(', ')}])`
        } else if (schema.enum) {
            // G-13: non-string members require literal unions
            zodString = `z.union([${schema.enum
                .map((e) => `z.literal(${formatZodLiteral(e)})`)
                .join(', ')}])`
        }
        // Handle nullable types
        else if (Array.isArray(schema.type)) {
            if (schema.type.includes('null')) {
                const nonNullTypes = schema.type.filter((t) => t !== 'null')
                if (nonNullTypes.length === 1) {
                    const innerSchema = {
                        ...schema,
                        type: nonNullTypes[0],
                    } as OpenAPIV3_1.SchemaObject
                    zodString = `${this.mapSchemaObjectToZod(name, innerSchema, currentSchema, outputContext)}.nullable()`
                } else {
                    // Complex union nullable
                    zodString = 'z.any()' // Simplification for complex union arrays
                }
            }
        } else {
            switch (schema.type) {
                case 'string':
                    zodString = 'z.string()'
                    if (schema.format === 'date-time')
                        zodString = 'z.iso.datetime()' // Zod 3.20+
                    else if (schema.format === 'email') zodString = 'z.email()'
                    else if (schema.format === 'uri') zodString = 'z.url()'
                    else if (schema.format === 'uuid') zodString = 'z.uuid()'
                    if (schema.pattern) {
                        const escapedPattern = schema.pattern
                            .replace(/\\/g, '\\\\')
                            .replace(/\//g, '\\/')
                        zodString += `.regex(/${escapedPattern}/)`
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
                            schema.items,
                            currentSchema,
                            outputContext
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
                                    value,
                                    currentSchema,
                                    outputContext
                                )
                                return `${quoteString(key)}: ${isRequired ? zodType : `${zodType}.optional()`}`
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
                                schema.additionalProperties,
                                currentSchema,
                                outputContext
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

        // G-9: OpenAPI 3.0 boolean `nullable: true` appends .nullable().
        // Nullability already expressed via a 3.1 type array is handled above.
        // `nullable` is an OpenAPI 3.0 keyword absent from the 3.1 typings.
        const isNullable = (schema as { nullable?: boolean }).nullable === true
        if (isNullable && !Array.isArray(schema.type)) {
            zodString += '.nullable()'
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
