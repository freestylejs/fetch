// drills deep client[...]['GET']['response'] access chains across branches
import type { GetRouterConfig } from '@freestylejs/fetch'
import { createClient } from '../corpus/stripe/api'

export const client = createClient()
type Config = GetRouterConfig<ReturnType<typeof createClient>>

export type Chain01 = Config['v1']['account']['GET']['response']
export type Chain02 = Config['v1']['accounts']['$account']['GET']['response']
export type Chain03 =
    Config['v1']['checkout']['sessions']['POST']['response'] extends {
        total_details: infer TotalDetails
    }
        ? TotalDetails
        : never
export type Chain04 = Config['v1']['charges']['GET']['searchParams']
export type Chain05 =
    Config['v1']['customers']['POST']['body'] extends URLSearchParams
        ? Config['v1']['customers']['POST']['response']
        : never
export type Chain06 =
    Config['v1']['treasury']['outbound_transfers']['$outbound_transfer']['GET']['response']
export type Chain07 =
    Config['v1']['test_helpers']['issuing']['cards']['$card']['shipping']['deliver']['POST']['response']
export type Chain08 =
    Config['v1']['test_helpers']['treasury']['inbound_transfers']['$id']['succeed']['POST']['mode']['isSafeFetch']
export type Chain09 =
    Config['v1']['sigma']['saved_queries']['$id']['POST']['pathParams']
export type Chain10 =
    Config['v1']['billing_portal']['configurations']['GET']['response']
export type Chain11 = ArrayElement<Chain01>
export type Chain12 = ArrayElement<
    NonNullable<Config['v1']['payment_links']['GET']['response']> extends never
        ? Config['v1']['webhook_endpoints']['GET']['response']['data']
        : Config['v1']['webhook_endpoints']['GET']['response']['data']
>
export type Chain13 =
    Config['v1']['accounts']['$account']['GET']['url'] extends `${string}/accounts/${string}`
        ? Config['v1']['accounts']['$account']['GET']['pathParams']
        : never
export type Chain14 =
    Config['v1']['identity']['verification_sessions']['GET']['searchParams'] extends {
        status?: infer Status
    }
        ? Status
        : never

type ArrayElement<ArrayType> = ArrayType extends readonly (infer Element)[]
    ? Element
    : never

const c01: Config['v1']['account']['GET']['method'] = 'GET'
void c01
const c03: Chain04['customer'] | undefined = undefined
void c03
const c04: Chain08 = false
void c04
const c05: keyof Chain09 = 'id'
void c05
const c06: Chain11['object'] extends string ? true : false = true
void c06
const c07: Chain13['account'] = 'acc_9'
void c07
