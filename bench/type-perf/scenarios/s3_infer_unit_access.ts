// accesses every InferFetchUnit field across 22 representative stripe endpoints
import type { InferFetchUnit } from '../../../packages/fetch/src/core/fetcher/unit'
import { createClient } from '../corpus/stripe/api'

export const client = createClient()
export type StripeClient = ReturnType<typeof createClient>

type Unit01 = InferFetchUnit<StripeClient['v1']['account']['GET']>
type Unit02 = InferFetchUnit<StripeClient['v1']['account_links']['POST']>
type Unit03 = InferFetchUnit<StripeClient['v1']['account_sessions']['POST']>
type Unit04 = InferFetchUnit<
    StripeClient['v1']['accounts']['$account']['DELETE']
>
type Unit05 = InferFetchUnit<StripeClient['v1']['accounts']['$account']['GET']>
type Unit06 = InferFetchUnit<StripeClient['v1']['balance']['GET']>
type Unit07 = InferFetchUnit<StripeClient['v1']['charges']['POST']>
type Unit08 = InferFetchUnit<StripeClient['v1']['checkout']['sessions']['POST']>
type Unit09 = InferFetchUnit<
    StripeClient['v1']['confirmation_tokens']['$confirmation_token']['GET']
>
type Unit10 = InferFetchUnit<StripeClient['v1']['customers']['POST']>
type Unit11 = InferFetchUnit<
    StripeClient['v1']['payment_records']['$id']['GET']
>
type Unit12 = InferFetchUnit<
    StripeClient['v1']['sigma']['saved_queries']['$id']['POST']
>
type Unit13 = InferFetchUnit<
    StripeClient['v1']['tax']['transactions']['$transaction']['GET']
>
type Unit14 = InferFetchUnit<
    StripeClient['v1']['test_helpers']['test_clocks']['POST']
>
type Unit15 = InferFetchUnit<
    StripeClient['v1']['treasury']['outbound_transfers']['$outbound_transfer']['GET']
>
type Unit16 = InferFetchUnit<StripeClient['v1']['webhook_endpoints']['GET']>
type Unit17 = InferFetchUnit<StripeClient['v1']['apps']['secrets']['POST']>
type Unit18 = InferFetchUnit<
    StripeClient['v1']['issuing']['settlements']['$settlement']['POST']
>
type Unit19 = InferFetchUnit<StripeClient['v1']['invoices']['POST']>
type Unit20 = InferFetchUnit<StripeClient['v1']['files']['POST']>
type Unit21 = InferFetchUnit<StripeClient['v1']['payment_intents']['POST']>
type Unit22 = InferFetchUnit<StripeClient['v1']['subscriptions']['POST']>

export const fieldAccess = {
    u01: {
        method: undefined as unknown as Unit01['method'],
        url: undefined as unknown as Unit01['url'],
        searchParams: undefined as unknown as Unit01['searchParams'],
        body: undefined as unknown as Unit01['body'],
        response: undefined as unknown as Unit01['response'],
        modeJson: undefined as unknown as Unit01['mode']['isJson'],
        modeSafe: undefined as unknown as Unit01['mode']['isSafeFetch'],
    },
    u02: {
        method: undefined as unknown as Unit02['method'],
        url: undefined as unknown as Unit02['url'],
        body: undefined as unknown as Unit02['body'],
        response: undefined as unknown as Unit02['response'],
        modeJson: undefined as unknown as Unit02['mode']['isJson'],
    },
    u03: {
        method: undefined as unknown as Unit03['method'],
        url: undefined as unknown as Unit03['url'],
        response: undefined as unknown as Unit03['response'],
        modeSafe: undefined as unknown as Unit03['mode']['isSafeFetch'],
    },
    u04: {
        method: undefined as unknown as Unit04['method'],
        url: undefined as unknown as Unit04['url'],
        pathParams: undefined as unknown as Unit04['pathParams'],
        body: undefined as unknown as Unit04['body'],
        response: undefined as unknown as Unit04['response'],
    },
    u05: {
        method: undefined as unknown as Unit05['method'],
        pathParams: undefined as unknown as Unit05['pathParams'],
        searchParams: undefined as unknown as Unit05['searchParams'],
        response: undefined as unknown as Unit05['response'],
        modeJson: undefined as unknown as Unit05['mode']['isJson'],
    },
    u06: {
        url: undefined as unknown as Unit06['url'],
        searchParams: undefined as unknown as Unit06['searchParams'],
        response: undefined as unknown as Unit06['response'],
    },
    u07: {
        method: undefined as unknown as Unit07['method'],
        url: undefined as unknown as Unit07['url'],
        body: undefined as unknown as Unit07['body'],
        response: undefined as unknown as Unit07['response'],
        modeSafe: undefined as unknown as Unit07['mode']['isSafeFetch'],
    },
    u08: {
        method: undefined as unknown as Unit08['method'],
        url: undefined as unknown as Unit08['url'],
        body: undefined as unknown as Unit08['body'],
        response: undefined as unknown as Unit08['response'],
    },
    u09: {
        method: undefined as unknown as Unit09['method'],
        url: undefined as unknown as Unit09['url'],
        pathParams: undefined as unknown as Unit09['pathParams'],
        searchParams: undefined as unknown as Unit09['searchParams'],
        response: undefined as unknown as Unit09['response'],
    },
    u10: {
        method: undefined as unknown as Unit10['method'],
        body: undefined as unknown as Unit10['body'],
        response: undefined as unknown as Unit10['response'],
        modeJson: undefined as unknown as Unit10['mode']['isJson'],
    },
    u11: {
        url: undefined as unknown as Unit11['url'],
        pathParams: undefined as unknown as Unit11['pathParams'],
        searchParams: undefined as unknown as Unit11['searchParams'],
        response: undefined as unknown as Unit11['response'],
    },
    u12: {
        method: undefined as unknown as Unit12['method'],
        pathParams: undefined as unknown as Unit12['pathParams'],
        body: undefined as unknown as Unit12['body'],
        response: undefined as unknown as Unit12['response'],
    },
    u13: {
        method: undefined as unknown as Unit13['method'],
        url: undefined as unknown as Unit13['url'],
        pathParams: undefined as unknown as Unit13['pathParams'],
        searchParams: undefined as unknown as Unit13['searchParams'],
        response: undefined as unknown as Unit13['response'],
    },
    u14: {
        method: undefined as unknown as Unit14['method'],
        body: undefined as unknown as Unit14['body'],
        response: undefined as unknown as Unit14['response'],
        modeSafe: undefined as unknown as Unit14['mode']['isSafeFetch'],
    },
    u15: {
        method: undefined as unknown as Unit15['method'],
        url: undefined as unknown as Unit15['url'],
        pathParams: undefined as unknown as Unit15['pathParams'],
        searchParams: undefined as unknown as Unit15['searchParams'],
        response: undefined as unknown as Unit15['response'],
    },
    u16: {
        method: undefined as unknown as Unit16['method'],
        url: undefined as unknown as Unit16['url'],
        searchParams: undefined as unknown as Unit16['searchParams'],
        response: undefined as unknown as Unit16['response'],
        modeJson: undefined as unknown as Unit16['mode']['isJson'],
    },
    u17: {
        method: undefined as unknown as Unit17['method'],
        url: undefined as unknown as Unit17['url'],
        body: undefined as unknown as Unit17['body'],
        response: undefined as unknown as Unit17['response'],
    },
    u18: {
        method: undefined as unknown as Unit18['method'],
        url: undefined as unknown as Unit18['url'],
        pathParams: undefined as unknown as Unit18['pathParams'],
        response: undefined as unknown as Unit18['response'],
        modeSafe: undefined as unknown as Unit18['mode']['isSafeFetch'],
    },
    u19: {
        method: undefined as unknown as Unit19['method'],
        body: undefined as unknown as Unit19['body'],
        response: undefined as unknown as Unit19['response'],
    },
    u20: {
        method: undefined as unknown as Unit20['method'],
        body: undefined as unknown as Unit20['body'],
        response: undefined as unknown as Unit20['response'],
    },
    u21: {
        method: undefined as unknown as Unit21['method'],
        body: undefined as unknown as Unit21['body'],
        response: undefined as unknown as Unit21['response'],
        modeJson: undefined as unknown as Unit21['mode']['isJson'],
    },
    u22: {
        method: undefined as unknown as Unit22['method'],
        body: undefined as unknown as Unit22['body'],
        response: undefined as unknown as Unit22['response'],
        modeSafe: undefined as unknown as Unit22['mode']['isSafeFetch'],
    },
} as const
