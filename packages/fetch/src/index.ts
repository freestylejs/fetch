import { builder, type FetchBuilder, type FetchUnitShape } from './core/fetcher'
import { type GetRouterConfig, router } from './core/router'
import { type Middleware, middleware } from './utils/middleware'

/**
 * Fetch core namespace
 */
export const f: {
    builder: typeof builder
    router: typeof router
    middleware: () => Middleware
} = {
    builder,
    router,
    middleware,
}

export type { GetRouterConfig, FetchUnitShape, FetchBuilder, Middleware }
