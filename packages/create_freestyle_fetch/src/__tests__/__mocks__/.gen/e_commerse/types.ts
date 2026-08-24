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

export type ListProductsSearchParamsModel = {
  'category'?: 'electronics' | 'clothing' | 'books' | undefined;
  'priceRange'?: number[] | undefined;
  'page'?: number | undefined;
  'limit'?: number | undefined;
  'sort'?: {
  [key: string]: 'asc' | 'desc';
} | undefined;
};

export type ListProductsResponseModel = ProductModel[];