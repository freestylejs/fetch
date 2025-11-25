import { f, type Middleware } from '@freestylejs/fetch'

export interface AuthConfig {
    /** OAuth2 for end-user authentication. */
    oauth2_user?: {
        accessToken: string | (() => Promise<string>)
    }
    /** API Key for internal, machine-to-machine services. */
    apiKey_internal?: {
        value: string | (() => Promise<string>)
    }
}

export const createAuthMiddleware = (config: AuthConfig) => {
    const middlewares: Middleware[] = []
    if (config.oauth2_user) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            const token = typeof config.oauth2_user!.accessToken === 'function'
                ? await config.oauth2_user!.accessToken()
                : config.oauth2_user!.accessToken
            if (token) {
                req.headers.set('Authorization', `Bearer ${token}`)
            }
            return next(req)
        })
        middlewares.push(mw)
    }
    if (config.apiKey_internal) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            const value = typeof config.apiKey_internal!.value === 'function'
                ? await config.apiKey_internal!.value()
                : config.apiKey_internal!.value
            if (value) {
                req.headers.set('X-Internal-API-Key', value)
            }
            return next(req)
        })
        middlewares.push(mw)
    }
    return middlewares
}