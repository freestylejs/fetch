import { f, type Middleware } from '@freestylejs/fetch'

export interface AuthConfig {
    /** Oauth2 */
    Oauth2?: {
        accessToken: string | (() => Promise<string>)
    }
}

export const createAuthMiddleware = (config: AuthConfig) => {
    const middlewares: Middleware[] = []
    if (config.Oauth2) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            const token = typeof config.Oauth2!.accessToken === 'function'
                ? await config.Oauth2!.accessToken()
                : config.Oauth2!.accessToken
            if (token) {
                req.headers.set('Authorization', `Bearer ${token}`)
            }
            return next(req)
        })
        middlewares.push(mw)
    }
    return middlewares
}