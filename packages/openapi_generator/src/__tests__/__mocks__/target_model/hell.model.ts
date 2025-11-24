import { z } from 'zod'

export const HellObject = z.object({
    'required-key': z.string(),
    'optional-key': z.string().optional(),
    'spaced key': z.number(),
    $special$: z.boolean().optional(),
})

export type HellObjectModel = z.infer<typeof HellObject>

export const DeepNested = z.object({
    level1: z
        .object({
            level2: z
                .array(
                    z.object({
                        level3: z.enum(['deep']).optional(),
                    })
                )
                .optional(),
        })
        .optional(),
})

export type DeepNestedModel = z.infer<typeof DeepNested>

export const IntersectionHell = HellObject.and(
    z.object({
        extra: z.string().optional(),
    })
)

export type IntersectionHellModel = z.infer<typeof IntersectionHell>

export const OptionA = z.object({
    type: z.enum(['A']),
    a: z.string().optional(),
})

export type OptionAModel = z.infer<typeof OptionA>

export const OptionB = z.object({
    type: z.enum(['B']),
    b: z.number().optional(),
})

export type OptionBModel = z.infer<typeof OptionB>

export const UnionHell = z.discriminatedUnion('type', [OptionA, OptionB])

export type UnionHellModel = z.infer<typeof UnionHell>
