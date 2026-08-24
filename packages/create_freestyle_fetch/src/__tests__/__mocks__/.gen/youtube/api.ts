import { f } from '@freestylejs/fetch';
import { youtubeDomain } from './domains/youtube';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || 'https://youtube.googleapis.com/',
        middleware
    }, { ...youtubeDomain });
}