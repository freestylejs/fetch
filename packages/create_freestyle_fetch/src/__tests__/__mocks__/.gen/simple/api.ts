import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || '',
        middleware
    }, {
'books': {
/**
 * Get a list of books
 */
'GET': f.builder().def_json().def_response(async ({ json }) => z.array(Model.Book).parse(await json())),
/**
 * Create a new book
 */
'POST': f.builder().def_json().def_body(Model.BookRequest.parse).def_response(async ({ json }) => Model.Book.parse(await json())),
'$id': {
/**
 * Get a book by ID
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Model.Book.parse(await json()))
}
}
});
}