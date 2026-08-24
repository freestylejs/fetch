// fully extracts GetRouterConfig<StripeClient> and traverses its key topology
import type { GetRouterConfig } from '@freestylejs/fetch'
import { createClient } from '../corpus/stripe/api'

export const client = createClient()
export type StripeClient = ReturnType<typeof createClient>

export type StripeConfig = GetRouterConfig<StripeClient>
export type StripeTopKeys = keyof StripeConfig
export type StripeV1Keys = keyof StripeConfig['v1']

type UnitConfigShape = {
    method: string
    url: string
    body: unknown
    response: unknown
    mode: { isJson: boolean; isSafeFetch: boolean }
}

type DeepConfigKeys<Target> = Target extends UnitConfigShape
    ? keyof Target
    : Target extends object
      ?
            | keyof Target
            | {
                  [Key in keyof Target]: DeepConfigKeys<Target[Key]>
              }[keyof Target]
      : never

export type AllConfigKeys = DeepConfigKeys<StripeConfig>

const hasUnitLeaves: 'method' extends AllConfigKeys
    ? 'isSafeFetch' extends AllConfigKeys
        ? true
        : false
    : false = true
void hasUnitLeaves

const hasRouteSegments: 'account' extends AllConfigKeys
    ? '$outbound_transfer' extends AllConfigKeys
        ? true
        : false
    : false = true
void hasRouteSegments

export type AccountBranchKeys = keyof StripeConfig['v1']['account']
export type TreasuryBranchKeys =
    keyof StripeConfig['v1']['treasury']['outbound_transfers']

type ConfigAt<Leaf> = Leaf extends { method: infer Method }
    ? Method extends string
        ? Leaf & { method: Method }
        : never
    : never

export type ExtractedAccountGet = ConfigAt<StripeConfig['v1']['account']['GET']>
export type ExtractedOutboundTransferGet = ConfigAt<
    StripeConfig['v1']['treasury']['outbound_transfers']['$outbound_transfer']['GET']
>

const accountMethod: ExtractedAccountGet['method'] = 'GET'
void accountMethod
