import { z } from 'zod';

// Helper types for schemas

export type HellObjectModel = {
  'required-key': string;
  'optional-key'?: string | undefined;
  'spaced key': number;
  '$special$'?: boolean | undefined;
};

export type DeepNestedModel = {
  'level1'?: {
  'level2'?: Array<{
  'level3'?: 'deep' | undefined;
}> | undefined;
} | undefined;
};

export type IntersectionHellModel = HellObjectModel & {
  'extra'?: string | undefined;
};

export type OptionAModel = {
  'type': 'A';
  'a'?: string | undefined;
};

export type OptionBModel = {
  'type': 'B';
  'b'?: number | undefined;
};

export type UnionHellModel = OptionAModel | OptionBModel;



export const HellObject: z.ZodType<HellObjectModel> = z.object({
'required-key': z.string(),
'optional-key': z.string().optional(),
'spaced key': z.number(),
'$special$': z.boolean().optional()
});

export const DeepNested: z.ZodType<DeepNestedModel> = z.object({
'level1': z.object({
'level2': z.array(z.object({
'level3': z.enum(['deep']).optional()
})).optional()
}).optional()
});

export const IntersectionHell: z.ZodType<IntersectionHellModel> = HellObject.and(z.object({
'extra': z.string().optional()
}));

export const OptionA: z.ZodType<OptionAModel> = z.object({
'type': z.enum(['A']),
'a': z.string().optional()
});

export const OptionB: z.ZodType<OptionBModel> = z.object({
'type': z.enum(['B']),
'b': z.number().optional()
});

export const UnionHell: z.ZodType<UnionHellModel> = z.discriminatedUnion('type', [OptionA, OptionB]);