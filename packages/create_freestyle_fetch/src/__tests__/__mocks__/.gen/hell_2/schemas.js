import { z } from 'zod';

const StringDictionary = z.record(z.string(), z.string());

export const parseStringDictionary = (value) => StringDictionary.parse(value);

const ObjectWithCatchall = z.object({
'id': z.string()
}).catchall(z.number().int());

export const parseObjectWithCatchall = (value) => ObjectWithCatchall.parse(value);

const SimpleUnion = z.union([z.string(), z.boolean()]);

export const parseSimpleUnion = (value) => SimpleUnion.parse(value);

const AnyOfUnion = z.union([StringDictionary, z.number()]);

export const parseAnyOfUnion = (value) => AnyOfUnion.parse(value);

const ConstString = z.literal('FIXED_VALUE');

export const parseConstString = (value) => ConstString.parse(value);

const NullableString = z.string().nullable();

export const parseNullableString = (value) => NullableString.parse(value);