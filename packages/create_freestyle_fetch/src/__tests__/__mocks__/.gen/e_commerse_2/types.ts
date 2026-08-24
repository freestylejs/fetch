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

export type PaymentMethodModel = CreditCardModel | PayPalModel;

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

export type SearchProductsSearchParamsModel = {
  'searchQuery'?: string | undefined;
  'tags'?: string[] | undefined;
  'page'?: number | undefined;
};

export type ProcessOrderBodyModel = {
  /**
   * The URL to send a callback to upon completion.
   */
  'notificationUrl': string;
};