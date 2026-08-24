// builds long standalone builder chains and consumes their inferred units

import type { FetchUnitShape } from '@freestylejs/fetch'
import { f } from '@freestylejs/fetch'
import { z } from 'zod'
import type { InferFetchUnit } from '../../../packages/fetch/src/core/fetcher/unit'
import * as Schemas from '../corpus/stripe/schemas'

const toQuery = (value: Record<string, unknown>): Record<string, string> =>
    Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [
            key,
            typeof entry === 'string' ? entry : JSON.stringify(entry),
        ])
    )

export const chain01 = f
    .builder()
    .def_json()
    .def_searchparams(
        z.object({ expand: z.array(z.string()).optional() }).parse
    )
    .def_body((body) =>
        z.object({ limit: z.number().int().optional() }).parse(body)
    )
    .def_response(async ({ json }) => Schemas.parseAccount(await json()))

export const chain02 = f
    .builder()
    .def_json()
    .def_body(
        (body) =>
            new URLSearchParams(
                z.looseObject({}).transform(toQuery).parse(body)
            )
    )
    .def_query_mode('not_throw')
    .def_response(async ({ json }) => Schemas.parseBalance(await json()))

export const chain03 = f
    .builder()
    .def_searchparams(
        z.object({ customer: z.string(), limit: z.number().int() }).parse
    )
    .def_body((body) => new URLSearchParams())
    .def_response(async () => ({ ok: true as const }))

export const chain04 = f
    .builder()
    .def_json()
    .def_searchparams(z.object({ ending_before: z.string().optional() }).parse)
    .def_body((body) =>
        z.object({ currency: z.string(), amount: z.number().int() }).parse(body)
    )
    .def_response(async ({ json }) => ({
        charge: Schemas.parseCharge(await json()),
        refund: Schemas.parseRefund(await json()),
    }))

export const chain05 = f
    .builder()
    .def_json()
    .def_searchparams(z.object({ starting_after: z.string().optional() }).parse)
    .def_query_mode('throw')
    .def_body((body) => new URLSearchParams())
    .def_response(async ({ json }) => Schemas.parseCustomer(await json()))

export const chain06 = f
    .builder()
    .def_searchparams(z.object({ type: z.string() }).parse)
    .def_response(async () => 'raw-text' as const)

export const chain07 = f
    .builder()
    .def_json()
    .def_body((body) =>
        z
            .object({
                items: z.array(
                    z.object({ price: z.string(), quantity: z.number().int() })
                ),
            })
            .parse(body)
    )
    .def_response(async ({ json }) =>
        Schemas.parseCheckoutSession(await json())
    )

export const chain08 = f
    .builder()
    .def_json()
    .def_searchparams(
        z.object({ status: z.enum(['draft', 'open', 'paid']).optional() }).parse
    )
    .def_body((body) => new URLSearchParams(z.object({}).parse(body)))
    .def_response(async ({ json }) => Schemas.parseInvoice(await json()))

export const chain09 = f
    .builder()
    .def_json()
    .def_searchparams(z.object({ expand: z.array(z.string()) }).parse)
    .def_body((body) =>
        z.object({ nickname: z.string().optional() }).parse(body)
    )
    .def_query_mode('not_throw')
    .def_response(async ({ json }) => Schemas.parsePrice(await json()))

export const chain10 = f
    .builder()
    .def_json()
    .def_searchparams(
        z.object({ active: z.boolean().optional(), product: z.string() }).parse
    )
    .def_body((body) => new URLSearchParams())
    .def_response(async ({ json }) => [
        Schemas.parsePaymentMethod(await json()),
    ])

export const chain11 = f
    .builder()
    .def_json()
    .def_body((body) => z.object({ frozen_time: z.number().int() }).parse(body))
    .def_response(async ({ json }) => ({
        clock: Schemas.parseTestHelpersTestClock(await json()),
    }))

export const chain12 = f
    .builder()
    .def_searchparams(z.object({ limit: z.number().int().optional() }).parse)
    .def_body((body) => new URLSearchParams())
    .def_response(async ({ response }) => {
        const payload = (await response.json()) as { status?: unknown }
        return String(payload.status ?? '')
    })

type UnitOf<Chain extends { build: () => FetchUnitShape }> = InferFetchUnit<
    ReturnType<Chain['build']>
>

const c01: UnitOf<typeof chain01>['searchParams']['expand'] | undefined =
    undefined
void c01
const c02: UnitOf<typeof chain02>['mode'] = {
    isJson: true,
    isSafeFetch: true,
}
void c02
const c03: UnitOf<typeof chain03>['searchParams'] = {
    customer: 'cus_1',
    limit: 3,
}
void c03
const c04: UnitOf<typeof chain04>['response'] extends object ? true : false =
    true
void c04
const c05: UnitOf<typeof chain05>['mode']['isSafeFetch'] = false
void c05
const c06: UnitOf<typeof chain06>['response'] = 'raw-text'
void c06
const c07: UnitOf<typeof chain07>['body']['items'][0]['price'] = 'price_1'
void c07
const c08: UnitOf<typeof chain08>['searchParams']['status'] | undefined =
    'draft'
void c08
const c09: UnitOf<typeof chain09>['mode']['isSafeFetch'] = true
void c09
const c10: UnitOf<typeof chain10>['response'] extends readonly unknown[]
    ? true
    : false = true
void c10
const c11: UnitOf<typeof chain11>['body']['frozen_time'] = 1700000000
void c11
const c12: UnitOf<typeof chain12>['mode'] = {
    isJson: false,
    isSafeFetch: false,
}
void c12
