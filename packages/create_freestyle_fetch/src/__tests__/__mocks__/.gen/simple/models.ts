import { z } from 'zod';

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



export const Book: z.ZodType<BookModel> = z.object({
'uuid': z.string(),
'name': z.string(),
'price': z.number(),
'category': z.string(),
'publish_date': z.iso.datetime()
});

export const BookRequest: z.ZodType<BookRequestModel> = z.object({
'name': z.string(),
'price': z.number(),
'category': z.string()
});