// forces f.router type recursion over a large stripe-shaped literal structure

import { f } from '@freestylejs/fetch'
import { z } from 'zod'
import * as Model from '../corpus/stripe/models'

const toQuery = (value: Record<string, unknown>): Record<string, string> =>
    Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [
            key,
            typeof entry === 'string' ? entry : JSON.stringify(entry),
        ])
    )

export const syntheticStripeRouter = f.router('https://api.synthetic.dev/', {
    v1: {
        accounts: {
            GET: f
                .builder()
                .def_json()
                .def_searchparams(
                    z.object({
                        limit: z.number().int().optional(),
                        expand: z.array(z.string()).optional(),
                    }).parse
                )
                .def_response(async ({ json }) => ({
                    data: [Model.Account.parse(await json())],
                    has_more: true,
                })),
            POST: f
                .builder()
                .def_json()
                .def_body((body) =>
                    z
                        .object({
                            country: z.string(),
                            email: z.string().optional(),
                            business_type: z.enum(['individual', 'company']),
                        })
                        .transform(toQuery)
                        .parse(body)
                )
                .def_response(async ({ json }) =>
                    Model.Account.parse(await json())
                ),
            $account: {
                GET: f
                    .builder()
                    .def_json()
                    .def_response(async ({ json }) => ({
                        account: Model.Account.parse(await json()),
                    })),
                DELETE: f
                    .builder()
                    .def_json()
                    .def_response(async () => ({
                        deleted: true as const,
                        id: 'acc_123',
                    })),
                capabilities: {
                    $capability: {
                        POST: f
                            .builder()
                            .def_json()
                            .def_body((body) => new URLSearchParams())
                            .def_response(async ({ json }) => {
                                const payload = (await json()) as Record<
                                    string,
                                    unknown
                                >
                                return {
                                    capability: String(
                                        payload.capability ?? ''
                                    ),
                                }
                            }),
                    },
                },
            },
        },
        balance: {
            GET: f
                .builder()
                .def_json()
                .def_response(async ({ json }) => ({
                    available: Model.Balance.parse(await json()),
                    pending: Model.Balance.parse(await json()),
                })),
        },
        charges: {
            GET: f
                .builder()
                .def_json()
                .def_searchparams(
                    z.object({ customer: z.string().optional() }).parse
                )
                .def_response(async ({ json }) => ({
                    data: [Model.Charge.parse(await json())],
                    has_more: false,
                })),
            POST: f
                .builder()
                .def_json()
                .def_body((body) =>
                    z
                        .object({
                            amount: z.number().int(),
                            currency: z.string(),
                            customer: z.string(),
                        })
                        .transform(toQuery)
                        .parse(body)
                )
                .def_response(async ({ json }) =>
                    Model.Charge.parse(await json())
                ),
        },
        customers: {
            GET: f
                .builder()
                .def_json()
                .def_searchparams(
                    z.object({
                        email: z.string().optional(),
                        starting_after: z.string().optional(),
                    }).parse
                )
                .def_response(async ({ json }) => ({
                    data: [Model.Customer.parse(await json())],
                })),
            $customer: {
                GET: f
                    .builder()
                    .def_json()
                    .def_response(async ({ json }) =>
                        Model.Customer.parse(await json())
                    ),
                PATCH: f
                    .builder()
                    .def_json()
                    .def_body((body) =>
                        z.object({ name: z.string().optional() }).parse(body)
                    )
                    .def_response(async ({ json }) =>
                        Model.Customer.parse(await json())
                    ),
                payment_methods: {
                    GET: f
                        .builder()
                        .def_json()
                        .def_response(async ({ json }) => ({
                            methods: Model.PaymentMethod.parse(await json()),
                        })),
                },
            },
        },
        invoices: {
            $invoice: {
                GET: f
                    .builder()
                    .def_json()
                    .def_response(async ({ json }) => ({
                        invoice: Model.Invoice.parse(await json()),
                        refund: Model.Refund.parse(await json()),
                    })),
                void: {
                    POST: f
                        .builder()
                        .def_json()
                        .def_body((body) => new URLSearchParams())
                        .def_response(async ({ json }) =>
                            Model.Invoice.parse(await json())
                        ),
                },
            },
        },
        prices: {
            GET: f
                .builder()
                .def_json()
                .def_searchparams(
                    z.object({
                        currency: z.string().optional(),
                        lookup_keys: z.array(z.string()).optional(),
                    }).parse
                )
                .def_response(async ({ json }) => ({
                    data: [Model.Price.parse(await json())],
                    has_more: false,
                })),
        },
        subscriptions: {
            $subscription: {
                DELETE: f
                    .builder()
                    .def_json()
                    .def_body((body) => new URLSearchParams())
                    .def_response(async ({ json }) => ({
                        subscription: Model.Subscription.parse(await json()),
                        refundedCharge: Model.Charge.parse(await json()),
                    })),
            },
        },
        webhooks: {
            signing_secret: {
                GET: f
                    .builder()
                    .def_json()
                    .def_response(async ({ json }) => {
                        const payload = (await json()) as Record<
                            string,
                            unknown
                        >
                        return { secret: String(payload.secret ?? '') }
                    }),
            },
        },
    },
})

type DeepKeys<Target> = Target extends object
    ?
          | keyof Target
          | {
                [Key in keyof Target]: DeepKeys<Target[Key]>
            }[keyof Target]
    : never

export type SyntheticRouterKeys = DeepKeys<typeof syntheticStripeRouter>
const coversRouterTree: 'signing_secret' extends SyntheticRouterKeys
    ? '$capability' extends SyntheticRouterKeys
        ? true
        : false
    : false = true
void coversRouterTree

export type SyntheticTopLevelKeys = keyof typeof syntheticStripeRouter.v1
