import { z } from 'zod'

export const User = z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string().email(),
    profile: z
        .object({
            fullName: z.string().optional(),
            joinDate: z.string().datetime().optional(),
        })
        .optional(),
    legacyId: z.number().optional(),
})

export type UserModel = z.infer<typeof User>

export const ProductInput = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
})

export type ProductInputModel = z.infer<typeof ProductInput>

export const Product = z.any()

export type ProductModel = z.infer<typeof Product>

export const PaginatedResponse = z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
    total: z.number().optional(),
    items: z.array(z.any()).optional(),
})

export type PaginatedResponseModel = z.infer<typeof PaginatedResponse>

export const PaginatedProductResponse = GenericPaginatedResponse

export type PaginatedProductResponseModel = z.infer<
    typeof PaginatedProductResponse
>

export const PaymentMethod = z.any()

export type PaymentMethodModel = z.infer<typeof PaymentMethod>

export const CreditCard = z.object({
    methodType: z.string(),
    cardNumber: z.string(),
    expiry: z.string().optional(),
    cvv: z.string().optional(),
})

export type CreditCardModel = z.infer<typeof CreditCard>

export const PayPal = z.object({
    methodType: z.string(),
    email: z.string().email(),
})

export type PayPalModel = z.infer<typeof PayPal>

export const CallbackPayload = z.object({
    orderId: z.string().uuid().optional(),
    status: z.string().optional(),
    detail: z.string().optional(),
})

export type CallbackPayloadModel = z.infer<typeof CallbackPayload>

export const InventoryUpdatePayload = z.object({
    productId: z.string().uuid().optional(),
    newStockLevel: z.number().optional(),
    timestamp: z.string().datetime().optional(),
})

export type InventoryUpdatePayloadModel = z.infer<typeof InventoryUpdatePayload>

export const ApiError = z.object({
    errorCode: z.string().optional(),
    message: z.string().optional(),
})

export type ApiErrorModel = z.infer<typeof ApiError>
