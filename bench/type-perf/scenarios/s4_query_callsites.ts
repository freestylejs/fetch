// validates query() callsite signatures with path/search/body across 30 sites
import { createClient } from '../corpus/stripe/api'

export const client = createClient()
type ArgOf<Unit> = Unit extends {
    query: (queryOptions?: infer QueryOptions) => unknown
}
    ? QueryOptions
    : never

const q01: ArgOf<(typeof client)['v1']['account']['GET']> = {
    search: { expand: ['id'] },
    body: new URLSearchParams(),
    timeout: 500,
}
void q01
const q02: ArgOf<(typeof client)['v1']['account']['GET']> = {
    search: {},
    body: new URLSearchParams(),
}
void q02
const q03: ArgOf<(typeof client)['v1']['account_links']['POST']> = {
    body: new URLSearchParams({ type: 'account_onboarding' }),
}
void q03
const q04: ArgOf<(typeof client)['v1']['accounts']['$account']['DELETE']> = {
    path: { account: 'acc_123' },
    body: new URLSearchParams(),
}
void q04
const q05: ArgOf<(typeof client)['v1']['accounts']['$account']['GET']> = {
    path: { account: 'acc_123' },
    search: { expand: ['features'] },
    body: new URLSearchParams(),
}
void q05
const q06: ArgOf<(typeof client)['v1']['accounts']['$account']['POST']> = {
    path: { account: 'acc_123' },
    body: new URLSearchParams({ business_profile_name: 'Acme' }),
    headers: { 'Idempotency-Key': 'abc' },
}
void q06
const q07: ArgOf<(typeof client)['v1']['balance']['GET']> = {
    search: { expand: ['available'] },
    body: new URLSearchParams(),
}
void q07
const q08: ArgOf<(typeof client)['v1']['charges']['POST']> = {
    body: new URLSearchParams({ customer: 'cus_1' }),
}
void q08
const q09: ArgOf<(typeof client)['v1']['checkout']['sessions']['POST']> = {
    body: new URLSearchParams({ success_url: 'https://ok.dev' }),
    options: { cache: 'no-store' },
}
void q09
const q10: ArgOf<(typeof client)['v1']['customers']['POST']> = {
    body: new URLSearchParams({ email: 'a@b.dev' }),
}
void q10
const q11: ArgOf<(typeof client)['v1']['payment_records']['$id']['GET']> = {
    path: { id: 'pr_1' },
    search: { expand: ['from_payment'] },
    body: new URLSearchParams(),
}
void q11
const q12: ArgOf<
    (typeof client)['v1']['sigma']['saved_queries']['$id']['POST']
> = {
    path: { id: 'sq_1' },
    body: new URLSearchParams(),
}
void q12
const q13: ArgOf<
    (typeof client)['v1']['tax']['transactions']['$transaction']['GET']
> = {
    path: { transaction: 'tax_1' },
    search: { expand: ['line_items'] },
    body: new URLSearchParams(),
}
void q13
const q14: ArgOf<(typeof client)['v1']['test_helpers']['test_clocks']['POST']> =
    {
        body: new URLSearchParams({ frozen_time: '1700000000' }),
        signal: new AbortController().signal,
    }
void q14
const q15: ArgOf<(typeof client)['v1']['webhook_endpoints']['GET']> = {
    search: { limit: 5, starting_after: 'we_1' },
    body: new URLSearchParams(),
}
void q15
const q16: ArgOf<(typeof client)['v1']['apps']['secrets']['POST']> = {
    body: new URLSearchParams({ scope_type: 'account' }),
    signal: [new AbortController().signal],
}
void q16
const q17: ArgOf<(typeof client)['v1']['invoices']['POST']> = {
    body: new URLSearchParams({ customer: 'cus_2' }),
}
void q17
const q18: ArgOf<(typeof client)['v1']['files']['POST']> = {
    body: new FormData(),
}
void q18
const q19: ArgOf<(typeof client)['v1']['payment_intents']['POST']> = {
    body: new URLSearchParams({ amount: '1000', currency: 'usd' }),
    timeout: 2500,
}
void q19
const q20: ArgOf<(typeof client)['v1']['subscriptions']['GET']> = {
    search: { status: 'active', limit: 10 },
    body: new URLSearchParams(),
}
void q20
const q21: ArgOf<
    (typeof client)['v1']['issuing']['settlements']['$settlement']['GET']
> = {
    path: { settlement: 'ise_1' },
    search: { expand: ['transactions'] },
    body: new URLSearchParams(),
}
void q21
const q22: ArgOf<
    (typeof client)['v1']['treasury']['outbound_transfers']['$outbound_transfer']['GET']
> = {
    path: { outbound_transfer: 'otr_1' },
    search: { expand: ['status_transitions'] },
    body: new URLSearchParams(),
}
void q22
const q23: ArgOf<
    (typeof client)['v1']['confirmation_tokens']['$confirmation_token']['GET']
> = {
    path: { confirmation_token: 'ct_1' },
    search: { expand: ['payment_method'] },
    body: new URLSearchParams(),
}
void q23
const q24: ArgOf<(typeof client)['v1']['apple_pay']['domains']['POST']> = {
    body: new URLSearchParams({ domain_name: 'pay.example.dev' }),
}
void q24
const q25: ArgOf<(typeof client)['v1']['ephemeral_keys']['POST']> = {
    body: new URLSearchParams(),
}
void q25
const q26: ArgOf<(typeof client)['v1']['coupons']['POST']> = {
    body: new URLSearchParams({ duration: 'once' }),
}
void q26
const q27: ArgOf<(typeof client)['v1']['events']['GET']> = {
    search: { types: ['charge.succeeded'] },
    body: new URLSearchParams(),
}
void q27
const q28: ArgOf<(typeof client)['v1']['payouts']['POST']> = {
    body: new URLSearchParams({ amount: '500', currency: 'usd' }),
    options: { redirect: 'follow' },
}
void q28
const q29: ArgOf<(typeof client)['v1']['prices']['POST']> = {
    body: new URLSearchParams({ currency: 'usd', unit_amount: '1500' }),
}
void q29
const q30: ArgOf<
    (typeof client)['v1']['treasury']['outbound_payments']['$id']['GET']
> = {
    path: { id: 'op_1' },
    search: { expand: ['financial_account'] },
    body: new URLSearchParams(),
}
void q30
