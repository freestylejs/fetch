import { f } from '@freestylejs/fetch';
import { usersDomain } from './domains/users';
import { billingDomain } from './domains/billing';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || 'https://api.multi-domain.test/',
        middleware
    }, { ...usersDomain, ...billingDomain });
}