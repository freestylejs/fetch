import { z } from 'zod'

export const Product = z.object({
    id: z.string().uuid(),
    name: z.string(),
    productType: z.string(),
    price: z.number(),
})

export type ProductModel = z.infer<typeof Product>

export const ElectronicsProduct = z.any()

export type ElectronicsProductModel = z.infer<typeof ElectronicsProduct>

export const ClothingProduct = z.any()

export type ClothingProductModel = z.infer<typeof ClothingProduct>

export const Order = z.object({
    id: z.string().uuid().optional(),
    userId: z.string().optional(),
    products: z.array(Product).optional(),
    total: z.number().optional(),
    status: z.string().optional(),
})

export type OrderModel = z.infer<typeof Order>

export const Error = z.object({
    code: z.number().optional(),
    message: z.string().optional(),
})

export type ErrorModel = z.infer<typeof Error>
