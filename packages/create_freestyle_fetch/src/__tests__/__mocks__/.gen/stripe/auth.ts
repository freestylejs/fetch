import { f, type Middleware } from '@freestylejs/fetch'

export interface AuthConfig {
    /** Basic HTTP authentication. Allowed headers-- Authorization: Basic <api_key> | Authorization: Basic <base64 hash of `api_key:`> */
    basicAuth?: {
        username: string
        password: string
    }
    /** Bearer HTTP authentication. Allowed headers-- Authorization: Bearer <api_key> */
    bearerAuth?: {
        token: string | (() => Promise<string>)
    }
}

export const createAuthMiddleware = (config: AuthConfig) => {
    const middlewares: Middleware[] = []
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
    return middlewares
}