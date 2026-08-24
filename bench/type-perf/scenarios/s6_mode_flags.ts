// exhausts conditional consumption of isJson/isSafeFetch mode flags
import type { FetchUnitShape } from '@freestylejs/fetch'
import type { InferFetchUnit } from '../../../packages/fetch/src/core/fetcher/unit'
import { createClient } from '../corpus/stripe/api'

export const client = createClient()
export type StripeClient = ReturnType<typeof createClient>

type ModeOf<Unit extends FetchUnitShape> = InferFetchUnit<Unit>['mode']
type JsonEncode<Unit extends FetchUnitShape> =
    ModeOf<Unit>['isJson'] extends true ? 'json' : 'raw'
type MayReturnUndefined<Unit extends FetchUnitShape> =
    ModeOf<Unit>['isSafeFetch'] extends true ? true : false
type TransportFor<Unit extends FetchUnitShape> =
    ModeOf<Unit> extends { isJson: true; isSafeFetch: true }
        ? 'json-safe'
        : ModeOf<Unit> extends { isJson: true; isSafeFetch: false }
          ? 'json-throw'
          : ModeOf<Unit> extends { isJson: false; isSafeFetch: true }
            ? 'raw-safe'
            : 'raw-throw'

export type TransportAccountGet = TransportFor<
    StripeClient['v1']['account']['GET']
>
export type TransportAccountLinksPost = TransportFor<
    StripeClient['v1']['account_links']['POST']
>
export type TransportBalanceGet = TransportFor<
    StripeClient['v1']['balance']['GET']
>
export type TransportCheckoutPost = TransportFor<
    StripeClient['v1']['checkout']['sessions']['POST']
>

const accountTransport: TransportAccountGet = 'json-throw'
void accountTransport

type FlagMatrix<Unit extends FetchUnitShape> = [
    JsonEncode<Unit>,
    MayReturnUndefined<Unit>,
]

export type Matrix01 = FlagMatrix<StripeClient['v1']['account']['GET']>
export type Matrix02 = FlagMatrix<StripeClient['v1']['charges']['POST']>
export type Matrix03 = FlagMatrix<StripeClient['v1']['events']['GET']>
export type Matrix04 = FlagMatrix<StripeClient['v1']['payment_intents']['POST']>
export type Matrix05 = FlagMatrix<
    StripeClient['v1']['webhook_endpoints']['GET']
>
export type Matrix06 = FlagMatrix<
    StripeClient['v1']['treasury']['outbound_transfers']['$outbound_transfer']['GET']
>
export type Matrix07 = FlagMatrix<
    StripeClient['v1']['test_helpers']['test_clocks']['POST']
>
export type Matrix08 = FlagMatrix<
    StripeClient['v1']['issuing']['settlements']['$settlement']['POST']
>
export type Matrix09 = FlagMatrix<StripeClient['v1']['files']['POST']>
export type Matrix10 = FlagMatrix<StripeClient['v1']['invoices']['POST']>
export type Matrix11 = FlagMatrix<
    StripeClient['v1']['billing_portal']['sessions']['POST']
>
export type Matrix12 = FlagMatrix<StripeClient['v1']['coupons']['POST']>
export type Matrix13 = FlagMatrix<StripeClient['v1']['prices']['POST']>
export type Matrix14 = FlagMatrix<StripeClient['v1']['payouts']['POST']>
export type Matrix15 = FlagMatrix<StripeClient['v1']['customers']['POST']>
export type Matrix16 = FlagMatrix<StripeClient['v1']['apps']['secrets']['POST']>

type NestedFlagLogic<Unit extends FetchUnitShape> =
    ModeOf<Unit>['isJson'] extends true
        ? ModeOf<Unit>['isSafeFetch'] extends true
            ? { parse: true; fallback: true }
            : { parse: true; fallback: false }
        : ModeOf<Unit>['isSafeFetch'] extends true
          ? { parse: false; fallback: true }
          : { parse: false; fallback: false }

export type Nested01 = NestedFlagLogic<StripeClient['v1']['account']['GET']>
export type Nested02 = NestedFlagLogic<
    StripeClient['v1']['accounts']['$account']['DELETE']
>
export type Nested03 = NestedFlagLogic<
    StripeClient['v1']['confirmation_tokens']['$confirmation_token']['GET']
>
export type Nested04 = NestedFlagLogic<
    StripeClient['v1']['sigma']['saved_queries']['$id']['POST']
>
export type Nested05 = NestedFlagLogic<
    StripeClient['v1']['tax']['transactions']['$transaction']['GET']
>
export type Nested06 = NestedFlagLogic<
    StripeClient['v1']['test_helpers']['issuing']['cards']['$card']['shipping']['ship']['POST']
>
export type Nested07 = NestedFlagLogic<
    StripeClient['v1']['terminal']['connection_tokens']['POST']
>
export type Nested08 = NestedFlagLogic<
    StripeClient['v1']['entitlements']['features']['GET']
>

const nestedShape: Nested01['parse'] = true
void nestedShape
