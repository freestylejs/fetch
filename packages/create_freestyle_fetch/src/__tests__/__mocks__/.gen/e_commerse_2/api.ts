import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || 'https://{environment}.example-commerce.com/api/v2',
        middleware
    }, {
/**
 * Product Collection
 *
 * Endpoint for searching and creating products.
 */
'products': {
/**
 * Search and filter products
 */
'GET': f.builder().def_json().def_searchparams(z.object({ searchQuery: z.string().optional(), tags: z.array(z.string()).optional(), page: z.number().int().min(1).optional() }).parse).def_response(async ({ json }) => Model.PaginatedProductResponse.parse(await json())),
/**
 * Add a new product with an image
 */
'POST': f.builder().def_json().def_body(z.instanceof(FormData).parse).def_response(async ({ json }) => Model.Product.parse(await json())),
'$productId': {
/**
 * Get a single product by its ID
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Model.Product.parse(await json()))
}
},
'orders': {
'$orderId': {
'process': {
/**
 * Process an order asynchronously
 *
 * Begins processing an order. A callback URL is invoked upon completion.
 */
'POST': f.builder().def_json()
}
}
}
});
}