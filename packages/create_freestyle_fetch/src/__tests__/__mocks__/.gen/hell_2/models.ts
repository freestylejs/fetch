import { z } from 'zod';

// Helper types for schemas

export type StringDictionaryModel = {
  [key: string]: string;
};

export type ObjectWithCatchallModel = {
  'id': string;
  [key: string]: number;
};

export type SimpleUnionModel = string | boolean;

export type AnyOfUnionModel = StringDictionaryModel | number;

export type ConstStringModel = string;

export type NullableStringModel = string | null;



export const StringDictionary: z.ZodType<StringDictionaryModel> = z.record(z.string(), z.string());

export const ObjectWithCatchall: z.ZodType<ObjectWithCatchallModel> = z.object({
'id': z.string()
}).catchall(z.number().int());

export const SimpleUnion: z.ZodType<SimpleUnionModel> = z.union([z.string(), z.boolean()]);

export const AnyOfUnion: z.ZodType<AnyOfUnionModel> = z.union([StringDictionary, z.number()]);

export const ConstString: z.ZodType<ConstStringModel> = z.literal('FIXED_VALUE');

export const NullableString: z.ZodType<NullableStringModel> = z.string().nullable();