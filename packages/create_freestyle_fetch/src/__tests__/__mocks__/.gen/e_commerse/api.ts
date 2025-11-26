import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || 'https://{environment}.example.com/v{version}',
        middleware
    }, {
/**
 * Product catalog operations
 *
 * Endpoints for managing products in the store.
 */
'products': {
/**
 * List products
 *
 * Retrieve a paginated list of products with filtering options.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ category: z.enum(['electronics', 'clothing', 'books']).optional(), priceRange: z.array(z.number()).optional(), page: z.number().int().min(1).optional(), limit: z.number().int().min(1).max(100).optional(), sort: z.record(z.string(), z.enum(['asc', 'desc'])).optional() }).parse).def_response(async ({ json }) => z.array(Model.Product).parse(await json())),
/**
 * Create a new product
 *
 * Add a new product to the catalog. Supports different product types via polymorphism.
 */
'POST': f.builder().def_json().def_body(Model.Product.parse).def_response(async ({ json }) => Model.Product.parse(await json()))
},
'orders': {
'$orderId': {
/**
 * Get order details
 *
 * Retrieve details of a specific order.
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Model.Order.parse(await json()))
}
}
});
}