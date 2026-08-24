import { expectType, type TypeEqual } from 'ts-expect'
import { describe, expect, it, vi } from 'vitest'
import { f } from '..'
import type { Param } from '../core/fetcher/core.type'
import type { InferFetchUnit } from '../core/fetcher/unit'
import { label } from './utils/test.label'

describe(label.unit('router compose'), () => {
    const usersStructure = {
        users: {
            GET: f.builder(),
            $id: {
                GET: f.builder().def_json(),
            },
        },
    }
    const billingStructure = {
        billing: {
            invoices: {
                POST: f.builder().def_json(),
            },
        },
    }

    it(
        label.case(
            'should MERGE disjoint structures with later-wins Object.assign semantics'
        ),
        () => {
            const composed = f.compose(
                'https://compose-api.com',
                usersStructure,
                billingStructure
            )

            expect(composed.users.GET.$store.url).toBe(
                'https://compose-api.com/users'
            )
            expect(composed.users.$id.GET.$store.url).toBe(
                'https://compose-api.com/users/$id'
            )
            expect(composed.billing.invoices.POST.$store.url).toBe(
                'https://compose-api.com/billing/invoices'
            )

            // semantic lock: identical result to the documented expansion
            const equivalent = f.router(
                'https://compose-api.com',
                Object.assign({}, usersStructure, billingStructure)
            )
            expect(composed.users.GET.$store).toStrictEqual(
                equivalent.users.GET.$store
            )
            expect(composed.billing.invoices.POST.$store).toStrictEqual(
                equivalent.billing.invoices.POST.$store
            )
        }
    )

    it(
        label.case(
            'should OVERRIDE earlier top-level keys with later structures'
        ),
        () => {
            const base = {
                users: {
                    GET: f.builder(),
                },
                keep: {
                    GET: f.builder(),
                },
            }
            const override = {
                users: {
                    POST: f.builder().def_json(),
                },
            }

            const composed = f.compose(
                { baseUrl: 'https://override-api.com' },
                base,
                override
            )

            // shallow replacement, not deep merge
            expect(
                (composed.users as Record<string, unknown>).GET
            ).toBeUndefined()
            expect(composed.users.POST.$store.url).toBe(
                'https://override-api.com/users'
            )
            expect(composed.users.POST.$store.method).toBe('POST')
            // untouched keys survive
            expect(composed.keep.GET.$store.url).toBe(
                'https://override-api.com/keep'
            )
        }
    )

    it(
        label.case(
            'should INFER composed urls & path params at the type level'
        ),
        () => {
            const composed = f.compose(
                'https://types-api.com',
                usersStructure,
                billingStructure
            )

            expect(composed.users.GET.$store.url).toBe(
                'https://types-api.com/users'
            )

            expectType<
                TypeEqual<
                    InferFetchUnit<
                        (typeof composed)['users']['$id']['GET']
                    >['url'],
                    `https://types-api.com/users/${string}`
                >
            >(true)
            expectType<
                TypeEqual<
                    InferFetchUnit<
                        (typeof composed)['users']['$id']['GET']
                    >['pathParams'],
                    { id: Param }
                >
            >(true)
            expectType<
                TypeEqual<
                    InferFetchUnit<
                        (typeof composed)['billing']['invoices']['POST']
                    >['url'],
                    'https://types-api.com/billing/invoices'
                >
            >(true)
            expectType<
                TypeEqual<
                    keyof InferFetchUnit<(typeof composed)['users']['GET']>,
                    'method' | 'url' | 'mode'
                >
            >(true)

            // config overload keeps baseUrl typing
            const viaConfig = f.compose(
                { baseUrl: 'https://cfg-compose-api.com/' },
                billingStructure
            )
            expectType<
                TypeEqual<
                    InferFetchUnit<
                        (typeof viaConfig)['billing']['invoices']['POST']
                    >['url'],
                    'https://cfg-compose-api.com/billing/invoices'
                >
            >(true)
        }
    )

    it(
        label.case(
            'should APPLY common configuration (middleware/credentials) to every composed unit'
        ),
        async () => {
            const middleware = f.middleware()
            middleware.use(async (req, next) => {
                req.headers.set('X-Compose-Middleware', 'true')
                return next(req)
            })

            const api = f.compose(
                {
                    baseUrl: 'https://common-compose.com',
                    credentials: 'include',
                    cache: 'no-store',
                    middleware: [middleware],
                },
                usersStructure,
                billingStructure
            )

            const capturedRequests: Request[] = []
            const mockFetch = vi
                .spyOn(global, 'fetch')
                .mockImplementation(async (req) => {
                    capturedRequests.push(req as Request)
                    return new Response('{}', { status: 200 })
                })

            await api.users.GET.query()
            await api.billing.invoices.POST.query()
            mockFetch.mockRestore()

            expect(capturedRequests).toHaveLength(2)
            for (const request of capturedRequests) {
                expect(request.headers.get('X-Compose-Middleware')).toBe('true')
                expect(request.credentials).toBe('include')
                expect(request.cache).toBe('no-store')
            }
        }
    )

    it(label.case('should HANDLE empty structures edge'), () => {
        const emptyFromBaseUrl = f.compose('https://empty-api.com/')
        expect(emptyFromBaseUrl).toStrictEqual({})

        const emptyFromConfig = f.compose({ baseUrl: 'https://empty-api.com/' })
        expect(emptyFromConfig).toStrictEqual({})
    })

    it(
        label.case('should ACCEPT a single structure (identity composition)'),
        () => {
            const single = f.compose('https://single-api.com/', usersStructure)
            expect(single.users.$id.GET.$store.url).toBe(
                'https://single-api.com/users/$id'
            )
        }
    )
})
