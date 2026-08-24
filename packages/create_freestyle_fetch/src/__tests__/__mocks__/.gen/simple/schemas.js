import { z } from 'zod';

const Book = z.object({
'uuid': z.string(),
'name': z.string(),
'price': z.number(),
'category': z.string(),
'publish_date': z.iso.datetime()
});

export const parseBook = (value) => Book.parse(value);

const BookRequest = z.object({
'name': z.string(),
'price': z.number(),
'category': z.string()
});

export const parseBookRequest = (value) => BookRequest.parse(value);

export const parseBooksGetResponse = (value) => z.array(Book).parse(value);