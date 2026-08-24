// Helper types for schemas

export type BookModel = {
  'uuid': string;
  'name': string;
  'price': number;
  'category': string;
  'publish_date': string;
};

export type BookRequestModel = {
  'name': string;
  'price': number;
  'category': string;
};

export type BooksGetResponseModel = BookModel[];