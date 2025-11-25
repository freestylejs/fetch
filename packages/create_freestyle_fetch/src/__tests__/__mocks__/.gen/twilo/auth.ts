import { f, type Middleware } from '@freestylejs/fetch'

export interface AuthConfig {
    /** Twilio SendGrid requires you to authenticate with its APIs using an API key. The API key must be sent as a bearer token in the Authorization header. */
    BearerAuth?: {
        token: string | (() => Promise<string>)
    }
}

export const createAuthMiddleware = (config: AuthConfig) => {
    const middlewares: Middleware[] = []
    if (config.BearerAuth) {
        const mw = f.middleware()
        mw.use(async (req, next) => {
            const token = typeof config.BearerAuth!.token === 'function'
                ? await config.BearerAuth!.token()
                : config.BearerAuth!.token
            if (token) {
                req.headers.set('Authorization', `Bearer ${token}`)
            }
            return next(req)
        })
        middlewares.push(mw)
    }
    return middlewares
}