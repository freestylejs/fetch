import type { OpenAPIV3_1 } from 'openapi-types'
import { toPascalCase } from './utils'

function isReferenceObject(obj: any): obj is OpenAPIV3_1.ReferenceObject {
    return obj && '$ref' in obj
}

export class SchemaGenerator {
    private spec: OpenAPIV3_1.Document
    private processedSchemas: Map<string, string> = new Map()

    constructor(spec: OpenAPIV3_1.Document) {
        this.spec = spec
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
        const schemas = Object.entries(this.spec.components.schemas)
        const modelStrings: string[] = [`import { z } from 'zod';`]

        for (const [name] of schemas) {
            this.mapSchemaObjectToZod(name)
        }

        for (const [name, zodSchema] of this.processedSchemas.entries()) {
            const pascalName = toPascalCase(name)
            modelStrings.push(`export const ${pascalName} = ${zodSchema};`)
            modelStrings.push(
                `export type ${pascalName}Model = z.infer<typeof ${pascalName}>;`
            )
        }
        return modelStrings.join('\n\n')
    }

    private resolveRef(ref: string): {
        name: string
        schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject
    } {
        if (!ref.startsWith('#/components/schemas/')) {
            throw new Error(
                `Unsupported $ref format: ${ref}. Only local component schema references are supported.`
            )
        }
        const name = ref.split('/').pop()
        if (!name) throw new Error(`Invalid $ref: ${ref}`)
        const schema = this.spec.components?.schemas?.[name]
        if (!schema) throw new Error(`Schema not found for $ref: ${ref}`)
        return { name, schema }
    }

    private mapSchemaObjectToZod(
        name: string,
        schemaObject?: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject
    ): string {
        const schema = schemaObject || this.spec.components?.schemas?.[name]
        if (!schema) {
            throw new Error(`Schema with name ${name} not found.`)
        }

        if (this.processedSchemas.has(name) && !schemaObject) {
            return toPascalCase(name)
        }

        if (isReferenceObject(schema) && Object.keys(schema).length > 1) {
            const { $ref, ...rest } = schema
            const allOfSchema: OpenAPIV3_1.SchemaObject = {
                allOf: [{ $ref }, rest as OpenAPIV3_1.SchemaObject],
            }
            return this.mapSchemaObjectToZod(name, allOfSchema)
        }

        if (isReferenceObject(schema)) {
            const { name: refName } = this.resolveRef(schema.$ref)
            this.mapSchemaObjectToZod(refName)
            return toPascalCase(refName)
        }

        if (schema.allOf) {
            const baseRef = schema.allOf[0]
            const overrides = schema.allOf[1]

            if (isReferenceObject(baseRef) && (overrides as any).$defs) {
                const baseSchemaName = this.resolveRef(baseRef.$ref).name
                this.mapSchemaObjectToZod(baseSchemaName)
                const baseSchemaString =
                    this.processedSchemas.get(baseSchemaName)

                if (!baseSchemaString) {
                    throw new Error(
                        `Base schema ${baseSchemaName} not found in processed schemas`
                    )
                }

                const itemRef = (overrides as any).$defs.productItem.$ref
                const itemSchemaName = this.resolveRef(itemRef).name
                const itemSchemaString =
                    this.mapSchemaObjectToZod(itemSchemaName)

                const zodSchema = baseSchemaString.replace(
                    'z.array(z.any())',
                    `z.array(${itemSchemaString})`
                )
                this.processedSchemas.set(name, zodSchema)
                return zodSchema
            }

            const allOfSchemas = schema.allOf
                .map((s) => this.mapSchemaObjectToZod(name, s))
                .join('.and(')
            const zodSchema = allOfSchemas + ')'.repeat(schema.allOf.length - 1)
            if (!schemaObject) this.processedSchemas.set(name, zodSchema)
            return zodSchema
        }

        // Expanded Union Handling: oneOf (discriminated & simple) and anyOf
        if (schema.oneOf || schema.anyOf) {
            const items = schema.oneOf || schema.anyOf || []
            if (schema.oneOf && schema.discriminator) {
                const discriminator = schema.discriminator.propertyName
                const options = items.map((s) => {
                    if (!isReferenceObject(s))
                        throw new Error(
                            'oneOf with discriminator must use $ref objects'
                        )
                    return this.mapSchemaObjectToZod(name, s)
                })
                const zodSchema = `z.discriminatedUnion('${discriminator}', [${options.join(', ')}])`
                if (!schemaObject) this.processedSchemas.set(name, zodSchema)
                return zodSchema
            } else {
                const options = items.map((s) =>
                    this.mapSchemaObjectToZod(name, s)
                )
                const zodSchema = `z.union([${options.join(', ')}])`
                if (!schemaObject) this.processedSchemas.set(name, zodSchema)
                return zodSchema
            }
        }

        let zodString = 'z.any()'

        // Handle simple types defined as arrays (e.g. type: ["string", "null"]) for OAS 3.1 nullability
        if (Array.isArray(schema.type)) {
            if (schema.type.length === 2 && schema.type.includes('null')) {
                const nonNullType = schema.type.find((t) => t !== 'null')
                if (nonNullType) {
                    // Create a temporary schema object to recurse
                    const innerSchema = {
                        ...schema,
                        type: nonNullType,
                    } as OpenAPIV3_1.SchemaObject
                    // We must remove 'null' from the type array to avoid infinite recursion if we passed schema.type back,
                    // but here we are constructing a new single-type object.
                    // Note: We lose other constraints if they were specific to one type, but standard OAS constraints apply to the instance.
                    zodString = `${this.mapSchemaObjectToZod(name, innerSchema)}.nullable()`
                }
            }
        } else {
            switch (schema.type) {
                case 'string':
                    if (schema.const) {
                        zodString = `z.literal('${schema.const}')`
                    } else {
                        zodString = 'z.string()'
                        if (schema.enum) {
                            zodString = `z.enum([${schema.enum.map((e) => `'${e}'`).join(', ')}])`
                        }
                        if (schema.format === 'date-time')
                            zodString = 'z.iso.datetime()'
                        else if (schema.format === 'email')
                            zodString = 'z.email()'
                        else if (schema.format === 'uri') zodString = 'z.url()'
                        else if (schema.format === 'uuid')
                            zodString = 'z.uuid()' // use z.uuid() (not z.string().uuid())
                        if (schema.pattern)
                            zodString += `.regex(/${schema.pattern}/)`
                    }
                    break
                case 'number':
                    zodString = 'z.number()'
                    if (schema.minimum !== undefined)
                        zodString += `.min(${schema.minimum})`
                    if (schema.maximum !== undefined)
                        zodString += `.max(${schema.maximum})`
                    break
                case 'integer':
                    zodString = 'z.number().int()'
                    if (schema.minimum !== undefined)
                        zodString += `.min(${schema.minimum})`
                    if (schema.maximum !== undefined)
                        zodString += `.max(${schema.maximum})`
                    break
                case 'boolean':
                    zodString = 'z.boolean()'
                    break
                case 'array': {
                    if (!schema.items)
                        throw new Error('Array schema must have items defined.')
                    const itemSchema = this.mapSchemaObjectToZod(
                        name,
                        schema.items
                    )
                    zodString = `z.array(${itemSchema})`
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
                                const finalType = isRequired
                                    ? zodType
                                    : `${zodType}.optional()`
                                return `'${key}': ${finalType}`
                            })
                            .join(',\n')
                        zodString = `z.object({
${properties}
})`
                    } else {
                        zodString = `z.object({})`
                    }

                    // Handle additionalProperties
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
                            if (schema.properties) {
                                zodString += `.catchall(${additionalSchema})`
                            } else {
                                // If no properties, it is a Record
                                zodString = `z.record(${additionalSchema}, z.any())`
                            }
                        }
                    }
                    break
                default:
                    break
            }
        }

        if (!schemaObject) {
            this.processedSchemas.set(name, zodString)
        }
        return zodString
    }
}
