import { z } from 'zod';

// Helper types for schemas

export type ProductModel = {
  'id': string;
  'name': string;
  'productType': string;
  'price': number;
};

export type ElectronicsProductModel = ProductModel & {
  'specs'?: {
  [key: string]: string;
} | undefined;
};

export type ClothingProductModel = ProductModel & {
  'size'?: 'S' | 'M' | 'L' | 'XL' | undefined;
  'color'?: string | undefined;
};

export type OrderModel = {
  'id'?: string | undefined;
  'userId'?: string | undefined;
  'products'?: ProductModel[] | undefined;
  'total'?: number | undefined;
  'status'?: 'pending' | 'shipped' | 'delivered' | undefined;
};

export type ErrorModel = {
  'code'?: number | undefined;
  'message'?: string | undefined;
};



export const Product: z.ZodType<ProductModel> = z.object({
'id': z.uuid(),
'name': z.string(),
'productType': z.string(),
'price': z.number().min(0)
});

export const ElectronicsProduct: z.ZodType<ElectronicsProductModel> = Product.and(z.object({
'specs': z.record(z.string(), z.string()).optional()
}));

export const ClothingProduct: z.ZodType<ClothingProductModel> = Product.and(z.object({
'size': z.enum(['S', 'M', 'L', 'XL']).optional(),
'color': z.string().optional()
}));

export const Order: z.ZodType<OrderModel> = z.object({
'id': z.uuid().optional(),
'userId': z.string().optional(),
'products': z.array(Product).optional(),
'total': z.number().optional(),
'status': z.enum(['pending', 'shipped', 'delivered']).optional()
});

export const Error: z.ZodType<ErrorModel> = z.object({
'code': z.number().int().optional(),
'message': z.string().optional()
});