import { z } from 'zod';

// Helper types for schemas

export type UserModel = {
  'id': string;
  'username': string;
  'email': string;
  'profile'?: {
  'fullName'?: string | undefined;
  'joinDate'?: string | undefined;
} | undefined;
  'legacyId'?: number | undefined;
};

export type ProductInputModel = {
  'name': string;
  'description'?: string | undefined;
  'price': number;
};

export type ProductModel = ProductInputModel & {
  'id'?: string | undefined;
  'imageUrl'?: string | undefined;
  'stock'?: number | undefined;
};

export type PaginatedResponseModel = {
  'page'?: number | undefined;
  'pageSize'?: number | undefined;
  'total'?: number | undefined;
  'items'?: any[] | undefined;
};

export type PaginatedProductResponseModel = PaginatedResponseModel;

export type CreditCardModel = {
  'methodType': 'card';
  'cardNumber': string;
  'expiry'?: string | undefined;
  'cvv'?: string | undefined;
};

export type PayPalModel = {
  'methodType': 'paypal_account';
  'email': string;
};

export type PaymentMethodModel = CreditCardModel | PayPalModel;

export type CallbackPayloadModel = {
  'orderId'?: string | undefined;
  'status'?: 'PROCESSED' | 'FAILED' | undefined;
  'detail'?: string | undefined;
};

export type InventoryUpdatePayloadModel = {
  'productId'?: string | undefined;
  'newStockLevel'?: number | undefined;
  'timestamp'?: string | undefined;
};

export type ApiErrorModel = {
  'errorCode'?: string | undefined;
  'message'?: string | undefined;
};



export const User: z.ZodType<UserModel> = z.object({
'id': z.uuid(),
'username': z.string().regex(/^[a-zA-Z0-9_-]{3,16}$/),
'email': z.email(),
'profile': z.object({
'fullName': z.string().optional(),
'joinDate': z.iso.datetime().optional()
}).optional(),
'legacyId': z.number().int().optional()
});

export const ProductInput: z.ZodType<ProductInputModel> = z.object({
'name': z.string(),
'description': z.string().optional(),
'price': z.number().min(0)
});

export const Product: z.ZodType<ProductModel> = ProductInput.and(z.object({
'id': z.uuid().optional(),
'imageUrl': z.url().optional(),
'stock': z.number().int().optional()
}));

export const PaginatedResponse: z.ZodType<PaginatedResponseModel> = z.object({
'page': z.number().int().optional(),
'pageSize': z.number().int().optional(),
'total': z.number().int().optional(),
'items': z.array(z.any()).optional()
});

export const PaginatedProductResponse: z.ZodType<PaginatedProductResponseModel> = PaginatedResponse;

export const CreditCard: z.ZodType<CreditCardModel> = z.object({
'methodType': z.enum(['card']),
'cardNumber': z.string(),
'expiry': z.string().optional(),
'cvv': z.string().optional()
});

export const PayPal: z.ZodType<PayPalModel> = z.object({
'methodType': z.enum(['paypal_account']),
'email': z.email()
});

export const PaymentMethod: z.ZodType<PaymentMethodModel> = z.discriminatedUnion('methodType', [CreditCard, PayPal]);

export const CallbackPayload: z.ZodType<CallbackPayloadModel> = z.object({
'orderId': z.uuid().optional(),
'status': z.enum(['PROCESSED', 'FAILED']).optional(),
'detail': z.string().optional()
});

export const InventoryUpdatePayload: z.ZodType<InventoryUpdatePayloadModel> = z.object({
'productId': z.uuid().optional(),
'newStockLevel': z.number().int().optional(),
'timestamp': z.iso.datetime().optional()
});

export const ApiError: z.ZodType<ApiErrorModel> = z.object({
'errorCode': z.string().optional(),
'message': z.string().optional()
});