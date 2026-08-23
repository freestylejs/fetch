import { z } from 'zod';

// Helper types for schemas

export type StringDictionaryModel = {
  [key: string]: string;
};

export type ObjectWithCatchallModel = {
  'id': string;
};

export type SimpleUnionModel = string | boolean;

export type AnyOfUnionModel = StringDictionaryModel | number;

export type ConstStringModel = string;

export type NullableStringModel = string | null;



export const StringDictionary = z.record(z.string(), z.string());

export const ObjectWithCatchall: z.ZodType<ObjectWithCatchallModel> = z.object({
'id': z.string()
}).catchall(z.number().int());

export const SimpleUnion = z.union([z.string(), z.boolean()]);

export const AnyOfUnion = z.union([StringDictionary, z.number()]);

export const ConstString: z.ZodType<ConstStringModel> = z.literal('FIXED_VALUE');

export const NullableString: z.ZodType<NullableStringModel> = z.string().nullable();