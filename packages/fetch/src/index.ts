import {
    FetchPathParamsError,
    FetchResponseError,
    FetchSearchParamsError,
} from './core/error'
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

export type {
    FetchOption,
    FetchQueryOptions,
    FetchUnitOption,
} from './core/fetcher/core.type'
export type { FetchBuilder, FetchUnitShape, GetRouterConfig, Middleware }
export { FetchPathParamsError, FetchResponseError, FetchSearchParamsError }
