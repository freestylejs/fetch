import { f } from '@freestylejs/fetch';
import { v1Domain } from './domains/v1';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || 'https://api.stripe.com/',
        middleware
    }, { ...v1Domain });
}