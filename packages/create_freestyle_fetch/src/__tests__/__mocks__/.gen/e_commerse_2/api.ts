import { f } from '@freestylejs/fetch';
import { productsDomain } from './domains/products';
import { ordersDomain } from './domains/orders';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || 'https://api.example-commerce.com/api/v2',
        middleware
    }, { ...productsDomain, ...ordersDomain });
}