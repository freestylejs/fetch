import { z } from 'zod'

const Book = z.object({
    name: z.string(),
    price: z.number(),
    category: z.string(),
    // server data
    publish_date: z.string(),
    uuid: z.string(),
})

export type BookModel = z.Infer<typeof Book>

const BookRequest = z.object({
    name: z.string(),
    price: z.number(),
    category: z.string(),
})
export type BookRequestModel = z.Infer<typeof BookRequest>

const BookList = z.array(Book)
export type BookModelList = z.Infer<typeof BookList>

const BookQueryBody = z.object({
    name: z.string(),
})
export type BookQueryBodyModel = z.Infer<typeof BookQueryBody>

const Author = z.object({
    name: z.array(z.null()),
    books: BookList,
})

export type AuthorModel = z.Infer<typeof Author>

const AuthorList = z.array(Author)
export type AuthorListModel = z.Infer<typeof AuthorList>

export const Model = {
    // books
    book: Book,
    bookList: BookList,
    bookRequest: BookRequest,
    bookQueryBody: BookQueryBody,
    // author
    author: Author,
    authorList: AuthorList,
} as const
