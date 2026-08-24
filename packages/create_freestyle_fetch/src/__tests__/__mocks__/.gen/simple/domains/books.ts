import { f } from '@freestylejs/fetch';
import * as Schemas from '../schemas';

/**
 * Plain router structure for the 'books' domain.
 * Leaves are uncompiled f.builder() chains; api.ts composes them.
 */
export const booksDomain = {
'books': {
/**
 * Get a list of books
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Schemas.parseBooksGetResponse(await json())),
/**
 * Create a new book
 */
'POST': f.builder().def_json().def_body(Schemas.parseBookRequest).def_response(async ({ json }) => Schemas.parseBook(await json())),
'$id': {
/**
 * Get a book by ID
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Schemas.parseBook(await json()))
}
}
};
