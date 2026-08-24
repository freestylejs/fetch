import type { BookModel, BookRequestModel, BooksGetResponseModel } from './types';

export declare const parseBook: (value: unknown) => BookModel;

export declare const parseBookRequest: (value: unknown) => BookRequestModel;

export declare const parseBooksGetResponse: (value: unknown) => BooksGetResponseModel;