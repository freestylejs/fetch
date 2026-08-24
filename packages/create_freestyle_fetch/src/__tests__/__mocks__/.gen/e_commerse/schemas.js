import { z } from 'zod';

const Product = z.object({
'id': z.uuid(),
'name': z.string(),
'productType': z.string(),
'price': z.number().min(0)
});

export const parseProduct = (value) => Product.parse(value);

const ElectronicsProduct = Product.and(z.object({
'specs': z.record(z.string(), z.string()).optional()
}));

export const parseElectronicsProduct = (value) => ElectronicsProduct.parse(value);

const ClothingProduct = Product.and(z.object({
'size': z.enum(['S', 'M', 'L', 'XL']).optional(),
'color': z.string().optional()
}));

export const parseClothingProduct = (value) => ClothingProduct.parse(value);

const Order = z.object({
'id': z.uuid().optional(),
'userId': z.string().optional(),
'products': z.array(Product).optional(),
'total': z.number().optional(),
'status': z.enum(['pending', 'shipped', 'delivered']).optional()
});

export const parseOrder = (value) => Order.parse(value);

const Error = z.object({
'code': z.number().int().optional(),
'message': z.string().optional()
});

export const parseError = (value) => Error.parse(value);

export const parseListProductsSearchParams = (value) => z.object({
'category': z.enum(['electronics', 'clothing', 'books']).optional(),
'priceRange': z.array(z.number()).optional(),
'page': z.number().int().min(1).optional(),
'limit': z.number().int().min(1).max(100).optional(),
'sort': z.record(z.string(), z.enum(['asc', 'desc'])).optional()
}).parse(value);

export const parseListProductsResponse = (value) => z.array(Product).parse(value);