import { f, type Middleware } from '@freestylejs/fetch'

export interface AuthConfig {
    /** apiKeyAuth */
    apiKeyAuth?: {
        value: string | (() => Promise<string>)
    }
    /** basicAuth */
    basicAuth?: {
        username: string
        password: string
    }
    /** bearerAuth */
    bearerAuth?: {
        token: string | (() => Promise<string>)
    }
    /** oauth2 */
    oauth2?: {
        accessToken: string | (() => Promise<string>)
    }
    /** openIdConnect */
    openIdConnect?: {
    }
    /** Client certificate authentication */
    mutualTls?: {
    }
}

export const createAuthMiddleware = (config: AuthConfig) => {
    const middlewares: Middleware[] = []
    if (config.apiKeyAuth) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            const value = typeof config.apiKeyAuth!.value === 'function'
                ? await config.apiKeyAuth!.value()
                : config.apiKeyAuth!.value
            if (value) {
                req.headers.set('X-API-Key', value)
            }
            return next(req)
        })
        middlewares.push(mw)
    }
    if (config.basicAuth) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            const { username, password } = config.basicAuth!
            const token = btoa(`${username}:${password}`)
            req.headers.set('Authorization', `Basic ${token}`)
            return next(req)
        })
        middlewares.push(mw)
    }
    if (config.bearerAuth) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            const token = typeof config.bearerAuth!.token === 'function'
                ? await config.bearerAuth!.token()
                : config.bearerAuth!.token
            if (token) {
                req.headers.set('Authorization', `Bearer ${token}`)
            }
            return next(req)
        })
        middlewares.push(mw)
    }
    if (config.oauth2) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            const token = typeof config.oauth2!.accessToken === 'function'
                ? await config.oauth2!.accessToken()
                : config.oauth2!.accessToken
            if (token) {
                req.headers.set('Authorization', `Bearer ${token}`)
            }
            return next(req)
        })
        middlewares.push(mw)
    }
    if (config.openIdConnect) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            return next(req)
        })
        middlewares.push(mw)
    }
    if (config.mutualTls) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            return next(req)
        })
        middlewares.push(mw)
    }
    return middlewares
}