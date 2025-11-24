import { z } from 'zod';

export const Product = z.object({
'id': z.uuid(),
'name': z.string(),
'productType': z.string(),
'price': z.number().min(0)
});

export type ProductModel = z.infer<typeof Product>;

export const ElectronicsProduct = Product.and(z.object({
'specs': z.record(z.string(), z.any()).optional()
}));

export type ElectronicsProductModel = z.infer<typeof ElectronicsProduct>;

export const ClothingProduct = Product.and(z.object({
'size': z.enum(['S', 'M', 'L', 'XL']).optional(),
'color': z.string().optional()
}));

export type ClothingProductModel = z.infer<typeof ClothingProduct>;

export const Order = z.object({
'id': z.uuid().optional(),
'userId': z.string().optional(),
'products': z.array(Product).optional(),
'total': z.number().optional(),
'status': z.enum(['pending', 'shipped', 'delivered']).optional()
});

export type OrderModel = z.infer<typeof Order>;

export const Error = z.object({
'code': z.number().int().optional(),
'message': z.string().optional()
});

export type ErrorModel = z.infer<typeof Error>;