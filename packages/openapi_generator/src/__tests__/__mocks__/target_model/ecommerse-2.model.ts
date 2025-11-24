import { z } from 'zod'

export const User = z.object({
    id: z.uuid(),
    username: z.string().regex(/^[a-zA-Z0-9_-]{3,16}$/),
    email: z.email(),
    profile: z
        .object({
            fullName: z.string().optional(),
            joinDate: z.iso.datetime().optional(),
        })
        .optional(),
    legacyId: z.number().int().optional(),
})

export type UserModel = z.infer<typeof User>

export const ProductInput = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number().min(0),
})

export type ProductInputModel = z.infer<typeof ProductInput>

export const Product = ProductInput.and(
    z.object({
        id: z.uuid().optional(),
        imageUrl: z.url().optional(),
        stock: z.number().int().optional(),
    })
)

export type ProductModel = z.infer<typeof Product>

export const PaginatedResponse = z.object({
    page: z.number().int().optional(),
    pageSize: z.number().int().optional(),
    total: z.number().int().optional(),
    items: z.array(z.any()).optional(),
})

export type PaginatedResponseModel = z.infer<typeof PaginatedResponse>

export const PaginatedProductResponse = z.object({
    page: z.number().int().optional(),
    pageSize: z.number().int().optional(),
    total: z.number().int().optional(),
    items: z.array(Product).optional(),
})

export type PaginatedProductResponseModel = z.infer<
    typeof PaginatedProductResponse
>

export const CreditCard = z.object({
    methodType: z.enum(['card']),
    cardNumber: z.string(),
    expiry: z.string().optional(),
    cvv: z.string().optional(),
})

export type CreditCardModel = z.infer<typeof CreditCard>

export const PayPal = z.object({
    methodType: z.enum(['paypal_account']),
    email: z.email(),
})

export type PayPalModel = z.infer<typeof PayPal>

export const PaymentMethod = z.discriminatedUnion('methodType', [
    CreditCard,
    PayPal,
])

export type PaymentMethodModel = z.infer<typeof PaymentMethod>

export const CallbackPayload = z.object({
    orderId: z.uuid().optional(),
    status: z.enum(['PROCESSED', 'FAILED']).optional(),
    detail: z.string().optional(),
})

export type CallbackPayloadModel = z.infer<typeof CallbackPayload>

export const InventoryUpdatePayload = z.object({
    productId: z.uuid().optional(),
    newStockLevel: z.number().int().optional(),
    timestamp: z.iso.datetime().optional(),
})

export type InventoryUpdatePayloadModel = z.infer<typeof InventoryUpdatePayload>

export const ApiError = z.object({
    errorCode: z.string().optional(),
    message: z.string().optional(),
})

export type ApiErrorModel = z.infer<typeof ApiError>
