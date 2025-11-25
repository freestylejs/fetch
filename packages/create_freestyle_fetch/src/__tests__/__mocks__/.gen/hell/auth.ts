import { f, type Middleware } from '@freestylejs/fetch'

export interface AuthConfig {
}

export const createAuthMiddleware = (config: AuthConfig) => {
    const middlewares: Middleware[] = []
    return middlewares
}