// topology lockfile — resolved types must stay exactly equal after optimization
import type { GetRouterConfig } from '@freestylejs/fetch'
import { f } from '@freestylejs/fetch'
import type { TypeEqual } from 'ts-expect'
import type { Param } from '../../../packages/fetch/src/core/fetcher/core.type'
import type { InferFetchUnit } from '../../../packages/fetch/src/core/fetcher/unit'
import type { OmitNever } from '../../../packages/fetch/src/utils/types'
import { createClient } from '../corpus/stripe/api'
import type * as Model from '../corpus/stripe/models'

declare const eq: <Assertion extends true>() => void

export const stripeClient = createClient()
export type StripeClient = ReturnType<typeof createClient>

type AccountGetUnit = InferFetchUnit<StripeClient['v1']['account']['GET']>
eq<
    TypeEqual<
        AccountGetUnit,
        {
            method: 'GET'
            url: `${string}/v1/account`
            searchParams: { expand?: string[] | undefined }
            body: URLSearchParams
            response: Model.AccountModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type AccountLinksPostUnit = InferFetchUnit<
    StripeClient['v1']['account_links']['POST']
>
eq<
    TypeEqual<
        AccountLinksPostUnit,
        {
            method: 'POST'
            url: `${string}/v1/account_links`
            body: URLSearchParams
            response: Model.AccountLinkModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type AccountSessionsPostUnit = InferFetchUnit<
    StripeClient['v1']['account_sessions']['POST']
>
eq<
    TypeEqual<
        AccountSessionsPostUnit,
        {
            method: 'POST'
            url: `${string}/v1/account_sessions`
            body: URLSearchParams
            response: Model.AccountSessionModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type AccountDeleteUnit = InferFetchUnit<
    StripeClient['v1']['accounts']['$account']['DELETE']
>
eq<
    TypeEqual<
        AccountDeleteUnit,
        {
            method: 'DELETE'
            url: `${string}/v1/accounts/${string}`
            pathParams: { account: Param }
            body: URLSearchParams
            response: Model.DeletedAccountModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type AccountDynamicGetUnit = InferFetchUnit<
    StripeClient['v1']['accounts']['$account']['GET']
>
eq<
    TypeEqual<
        AccountDynamicGetUnit,
        {
            method: 'GET'
            url: `${string}/v1/accounts/${string}`
            pathParams: { account: Param }
            searchParams: { expand?: string[] | undefined }
            body: URLSearchParams
            response: Model.AccountModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type BalanceGetUnit = InferFetchUnit<StripeClient['v1']['balance']['GET']>
eq<
    TypeEqual<
        BalanceGetUnit,
        {
            method: 'GET'
            url: `${string}/v1/balance`
            searchParams: { expand?: string[] | undefined }
            body: URLSearchParams
            response: Model.BalanceModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type ChargesPostUnit = InferFetchUnit<StripeClient['v1']['charges']['POST']>
eq<
    TypeEqual<
        ChargesPostUnit,
        {
            method: 'POST'
            url: `${string}/v1/charges`
            body: URLSearchParams
            response: Model.ChargeModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type CheckoutSessionPostUnit = InferFetchUnit<
    StripeClient['v1']['checkout']['sessions']['POST']
>
eq<
    TypeEqual<
        CheckoutSessionPostUnit,
        {
            method: 'POST'
            url: `${string}/v1/checkout/sessions`
            body: URLSearchParams
            response: Model.CheckoutSessionModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type ConfirmationTokenGetUnit = InferFetchUnit<
    StripeClient['v1']['confirmation_tokens']['$confirmation_token']['GET']
>
eq<
    TypeEqual<
        ConfirmationTokenGetUnit,
        {
            method: 'GET'
            url: `${string}/v1/confirmation_tokens/${string}`
            pathParams: { confirmation_token: Param }
            searchParams: { expand?: string[] | undefined }
            body: URLSearchParams
            response: Model.ConfirmationTokenModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type CustomersPostUnit = InferFetchUnit<StripeClient['v1']['customers']['POST']>
eq<
    TypeEqual<
        CustomersPostUnit,
        {
            method: 'POST'
            url: `${string}/v1/customers`
            body: URLSearchParams
            response: Model.CustomerModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type PaymentRecordGetUnit = InferFetchUnit<
    StripeClient['v1']['payment_records']['$id']['GET']
>
eq<
    TypeEqual<
        PaymentRecordGetUnit,
        {
            method: 'GET'
            url: `${string}/v1/payment_records/${string}`
            pathParams: { id: Param }
            searchParams: { expand?: string[] | undefined }
            body: URLSearchParams
            response: Model.PaymentRecordModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type SigmaSavedQueryPostUnit = InferFetchUnit<
    StripeClient['v1']['sigma']['saved_queries']['$id']['POST']
>
eq<
    TypeEqual<
        SigmaSavedQueryPostUnit,
        {
            method: 'POST'
            url: `${string}/v1/sigma/saved_queries/${string}`
            pathParams: { id: Param }
            body: URLSearchParams
            response: Model.SigmaSigmaApiQueryModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type TaxTransactionGetUnit = InferFetchUnit<
    StripeClient['v1']['tax']['transactions']['$transaction']['GET']
>
eq<
    TypeEqual<
        TaxTransactionGetUnit,
        {
            method: 'GET'
            url: `${string}/v1/tax/transactions/${string}`
            pathParams: { transaction: Param }
            searchParams: { expand?: string[] | undefined }
            body: URLSearchParams
            response: Model.TaxTransactionModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type TestClockPostUnit = InferFetchUnit<
    StripeClient['v1']['test_helpers']['test_clocks']['POST']
>
eq<
    TypeEqual<
        TestClockPostUnit,
        {
            method: 'POST'
            url: `${string}/v1/test_helpers/test_clocks`
            body: URLSearchParams
            response: Model.TestHelpersTestClockModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type OutboundTransferGetUnit = InferFetchUnit<
    StripeClient['v1']['treasury']['outbound_transfers']['$outbound_transfer']['GET']
>
eq<
    TypeEqual<
        OutboundTransferGetUnit,
        {
            method: 'GET'
            url: `${string}/v1/treasury/outbound_transfers/${string}`
            pathParams: { outbound_transfer: Param }
            searchParams: { expand?: string[] | undefined }
            body: URLSearchParams
            response: Model.TreasuryOutboundTransferModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type WebhookEndpointListGetUnit = InferFetchUnit<
    StripeClient['v1']['webhook_endpoints']['GET']
>
eq<
    TypeEqual<
        WebhookEndpointListGetUnit,
        {
            method: 'GET'
            url: `${string}/v1/webhook_endpoints`
            searchParams: {
                ending_before?: string | undefined
                expand?: string[] | undefined
                limit?: number | undefined
                starting_after?: string | undefined
            }
            body: URLSearchParams
            response: {
                data: Model.WebhookEndpointModel[]
                has_more: boolean
                object: 'list'
                url: string
            }
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type AppsSecretPostUnit = InferFetchUnit<
    StripeClient['v1']['apps']['secrets']['POST']
>
eq<
    TypeEqual<
        AppsSecretPostUnit,
        {
            method: 'POST'
            url: `${string}/v1/apps/secrets`
            body: URLSearchParams
            response: Model.AppsSecretModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

type IssuingSettlementPostUnit = InferFetchUnit<
    StripeClient['v1']['issuing']['settlements']['$settlement']['POST']
>
eq<
    TypeEqual<
        IssuingSettlementPostUnit,
        {
            method: 'POST'
            url: `${string}/v1/issuing/settlements/${string}`
            pathParams: { settlement: Param }
            body: URLSearchParams
            response: Model.IssuingSettlementModel
            mode: {
                isJson: true
                isSafeFetch: false
            }
        }
    >
>()

eq<
    TypeEqual<
        keyof AccountGetUnit,
        'method' | 'url' | 'searchParams' | 'body' | 'response' | 'mode'
    >
>()
eq<
    TypeEqual<
        keyof AccountDeleteUnit,
        'method' | 'url' | 'pathParams' | 'body' | 'response' | 'mode'
    >
>()

type RouterConfig = GetRouterConfig<StripeClient>
eq<TypeEqual<RouterConfig['v1']['account']['GET'], AccountGetUnit>>()
eq<
    TypeEqual<
        RouterConfig['v1']['accounts']['$account']['DELETE'],
        AccountDeleteUnit
    >
>()
eq<
    TypeEqual<
        RouterConfig['v1']['treasury']['outbound_transfers']['$outbound_transfer']['GET'],
        OutboundTransferGetUnit
    >
>()

const trailingSlashBase = f.router('https://join.example.com/', {
    ping: { GET: f.builder() },
})
eq<
    TypeEqual<
        InferFetchUnit<(typeof trailingSlashBase)['ping']['GET']>['url'],
        'https://join.example.com/ping'
    >
>()

const multiSlashBase = f.router('https://join.example.com///', {
    ping: { GET: f.builder() },
})
eq<
    TypeEqual<
        InferFetchUnit<(typeof multiSlashBase)['ping']['GET']>['url'],
        'https://join.example.com/ping'
    >
>()

const emptyBaseUrl = f.router('', {
    a: { $id: { b: { POST: f.builder().def_json() } } },
})
eq<
    TypeEqual<
        InferFetchUnit<(typeof emptyBaseUrl)['a']['$id']['b']['POST']>['url'],
        `a/${string}/b`
    >
>()
eq<
    TypeEqual<
        InferFetchUnit<
            (typeof emptyBaseUrl)['a']['$id']['b']['POST']
        >['pathParams'],
        { id: Param }
    >
>()

const configOverloadBase = f.router(
    { baseUrl: 'https://cfg.example.io/' },
    {
        deep: { nested: { PUT: f.builder() } },
    }
)
eq<
    TypeEqual<
        InferFetchUnit<
            (typeof configOverloadBase)['deep']['nested']['PUT']
        >['url'],
        'https://cfg.example.io/deep/nested'
    >
>()

const safeQueryBuilder = f.builder().def_json().def_query_mode('not_throw')
eq<
    TypeEqual<
        InferFetchUnit<ReturnType<typeof safeQueryBuilder.build>>['mode'],
        {
            isJson: true
            isSafeFetch: true
        }
    >
>()

const widenQueryModeBuilder = (queryMode: 'throw' | 'not_throw') =>
    f.builder().def_query_mode(queryMode)
eq<
    TypeEqual<
        InferFetchUnit<
            ReturnType<ReturnType<typeof widenQueryModeBuilder>['build']>
        >['mode'],
        {
            isJson: false
            isSafeFetch: boolean
        }
    >
>()

eq<
    TypeEqual<
        OmitNever<{ keptAny: any; droppedUnknown: unknown; optional?: string }>,
        { keptAny: any; optional?: string | undefined }
    >
>()
