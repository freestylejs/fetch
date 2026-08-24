// stresses MiddlewareFunction generic boundaries across many compositions

import { f, type Middleware } from '@freestylejs/fetch'
import type {
    MiddlewareFunction,
    NextFunction,
} from '../../../packages/fetch/src/utils/middleware'

export const middlewareAuth: MiddlewareFunction = async (request, next) => {
    request.headers.set('Authorization', 'Bearer tok')
    return next(request)
}

export const middlewareIdempotency: MiddlewareFunction = async (
    request,
    next
) => {
    if (!request.headers.has('Idempotency-Key')) {
        request.headers.set('Idempotency-Key', crypto.randomUUID())
    }
    return next(request)
}

export const middlewareRetry: MiddlewareFunction = async (request, next) => {
    let attempt = 0
    for (;;) {
        try {
            return await next(request)
        } catch (error) {
            attempt += 1
            if (attempt >= 3 || error instanceof TypeError) throw error
        }
    }
}

export const middlewareTimeoutSignal: MiddlewareFunction = (request, next) =>
    next(new Request(request, { signal: AbortSignal.timeout(4000) }))

export const middlewareCorrelation: MiddlewareFunction = async (
    request,
    next
) => {
    const response = await next(request)
    response.headers.set(
        'X-Correlation-Id',
        request.headers.get('X-Req-Id') ?? 'none'
    )
    return response
}

export const middlewareRateLimit: MiddlewareFunction = async (
    request,
    next
) => {
    const response = await next(request.clone())
    if (response.status === 429) {
        return new Response(null, { status: 503 })
    }
    return response
}

const loggingWrapper =
    (label: string): MiddlewareFunction =>
    async (request, next) => {
        void label
        return next(request)
    }

export const middlewareLoggingA = loggingWrapper('a')
export const middlewareLoggingB = loggingWrapper('b')
export const middlewareLoggingC = loggingWrapper('c')

export const middlewarePipeline: Array<MiddlewareFunction> = [
    middlewareAuth,
    middlewareIdempotency,
    middlewareRetry,
    middlewareTimeoutSignal,
    middlewareCorrelation,
    middlewareRateLimit,
    middlewareLoggingA,
    middlewareLoggingB,
]

export const middlewareInstanceA: Middleware = f.middleware()
middlewareInstanceA.use(middlewarePipeline)
middlewareInstanceA.use(middlewareLoggingC)

export const middlewareInstanceB: Middleware = f.middleware()
middlewareInstanceB.use([
    middlewareCorrelation,
    (request, next) => {
        request.headers.set('X-Traced', 'true')
        return next(request)
    },
    async (request, next) => {
        const response = await next(request)
        if (!response.ok) throw new Error(`upstream ${response.status}`)
        return response
    },
])

type WithHeader<Next extends NextFunction> = (
    request: Request,
    next: Next
) => Promise<Response>

export const typedHeaderMiddleware: WithHeader<NextFunction> = async (
    request,
    next
) => {
    request.headers.set('X-Typed', 'yes')
    return next(request)
}

const composeAll =
    (list: ReadonlyArray<MiddlewareFunction>): MiddlewareFunction =>
    async (request, end) => {
        const chain = list.reduceRight<NextFunction>(
            (next, current) => (req) => current(req, next),
            (req) => end(req)
        )
        return chain(request)
    }

export const composedMiddleware = composeAll([
    middlewareAuth,
    middlewareRetry,
    typedHeaderMiddleware,
])

const tapRequest =
    (tap: (request: Request) => void): MiddlewareFunction =>
    (request, next) => {
        tap(request)
        return next(request)
    }

export const middlewareTapUserAgent = tapRequest((request) => {
    request.headers.set('User-Agent', 'type-perf/1.0')
})
export const middlewareTapLocale = tapRequest((request) => {
    request.headers.set('Accept-Language', 'ko-KR')
})
