import { builder, type FetchBuilder, type FetchUnitShape } from './core/fetcher'
import { type GetRouterConfig, router } from './core/router'
import { Middleware } from './utils/middleware'

/**
 * @description Metal Fetch Root
 */
export const f: {
    builder: typeof builder
    router: typeof router
    Middleware: typeof Middleware
} = {
    builder,
    router,
    Middleware,
}

export type { GetRouterConfig, FetchUnitShape, FetchBuilder }
