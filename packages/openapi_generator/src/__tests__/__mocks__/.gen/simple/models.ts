import { z } from 'zod';

export const Book = z.object({
'uuid': z.string(),
'name': z.string(),
'price': z.number(),
'category': z.string(),
'publish_date': z.iso.datetime()
});

export type BookModel = z.infer<typeof Book>;

export const BookRequest = z.object({
'name': z.string(),
'price': z.number(),
'category': z.string()
});

export type BookRequestModel = z.infer<typeof BookRequest>;