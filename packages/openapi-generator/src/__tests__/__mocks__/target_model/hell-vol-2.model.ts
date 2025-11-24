import { z } from 'zod'

export const StringDictionary = z.record(z.string(), z.any())

export type StringDictionaryModel = z.infer<typeof StringDictionary>

export const ObjectWithCatchall = z
    .object({
        id: z.string(),
    })
    .catchall(z.number().int())

export type ObjectWithCatchallModel = z.infer<typeof ObjectWithCatchall>

export const SimpleUnion = z.union([z.string(), z.boolean()])

export type SimpleUnionModel = z.infer<typeof SimpleUnion>

export const AnyOfUnion = z.union([StringDictionary, z.number()])

export type AnyOfUnionModel = z.infer<typeof AnyOfUnion>

export const ConstString = z.literal('FIXED_VALUE')

export type ConstStringModel = z.infer<typeof ConstString>

export const NullableString = z.string().nullable()

export type NullableStringModel = z.infer<typeof NullableString>
