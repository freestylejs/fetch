import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { expectType, type TypeEqual } from 'ts-expect'
import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
    vi,
} from 'vitest'
import { z } from 'zod'
import * as freestyleFetch from '..'
import { f } from '..'
import { FetchPathParamsError, FetchResponseError } from '../core/error'
import type {
    FetchOption,
    FetchQueryOptions,
    FetchUnitOption,
} from '../core/fetcher/core.type'
import { FetchUnit, type InferFetchUnit } from '../core/fetcher/unit'
import type { OmitNever } from '../utils/types'
import { label } from './utils/test.label'

const BASE_URL = 'https://unit-api/v2' as const
const apiServer = setupServer(
    ...[
        http.post(`${BASE_URL}/books/images`, async ({ request }) => {
            const bodyBlob = await request.blob()
            const formData = new FormData()
            formData.append('file', bodyBlob)
            formData.append('name', 'Book')

            return HttpResponse.formData(formData)
        }),

        http.post(`${BASE_URL}/books`, async ({ request }) => {
            const body = await request.json()
            return HttpResponse.json({
                data: body,
                status: 'success',
            })
        }),

        http.get(`${BASE_URL}/books`, () => {
            return HttpResponse.json('Not Found', {
                status: 404,
            })
        }),

        http.post(`${BASE_URL}/echo-content-type`, async ({ request }) => {
            return HttpResponse.json({
                contentType: request.headers.get('content-type'),
            })
        }),

        http.get(`${BASE_URL}/books/:id`, ({ params, request }) => {
            const id = params.id
            const searchParams = new URL(request.url).searchParams
            const name = searchParams.get('name')
            const price = searchParams.get('price')
            return HttpResponse.json({
                data: {
                    name,
                    price,
                    id: id,
                },
                status: 'success',
            })
        }),

        http.get('https://unknown.com/', async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(HttpResponse.json({}))
                }, 15)
            })
        }),
    ]
)

beforeAll(() => apiServer.listen({ onUnhandledRequest: 'error' }))
afterAll(() => apiServer.close())
afterEach(() => apiServer.resetHandlers())

describe('FetchUnit', () => {
    it(label.case('should CREATE a new instance'), () => {
        const fetchUnit = f.builder().build()
        expect(fetchUnit).toBeInstanceOf(FetchUnit)
    })

    it(label.case('should SET fetch error procedure'), () => {
        const fetchUnit = f.builder()
        const result = fetchUnit.def_fetch_err_handler(({ error, status }) => {
            // eslint-disable-next-line no-console
            console.error(error, status)
        })

        expect(fetchUnit).not.toBe(result)
        expect(fetchUnit.fetchErrorProcedure.procedures).toHaveLength(0)
        expect(result.fetchErrorProcedure.procedures).toHaveLength(1)
    })

    it(label.case('should SET unknown error procedure'), () => {
        const fetchUnit = f.builder()
        const result = fetchUnit.def_unknown_err_handler(({ error }) => {
            // eslint-disable-next-line no-console
            console.error(error)
        })

        expect(fetchUnit).not.toBe(result)
        expect(fetchUnit.unknownErrorProcedure.procedures).toHaveLength(0)
        expect(result.unknownErrorProcedure.procedures).toHaveLength(1)
    })

    it(label.case('should SET finally procedure'), () => {
        const fetchUnit = f.builder()
        const result = fetchUnit.def_final_handler((info) => {
            // eslint-disable-next-line no-console
            console.log('FETCH_INFO', info)
        })

        expect(fetchUnit).not.toBe(result)
        expect(fetchUnit.finallyProcedure.procedures).toHaveLength(0)
        expect(result.finallyProcedure.procedures).toHaveLength(1)
    })

    it(label.case('should SET request procedure'), () => {
        const fetchUnit = f.builder()
        const result = fetchUnit.def_request_handler(({ request }) => {
            request.headers.set('Authorization', 'Bearer token')
            return request
        })

        expect(fetchUnit).not.toBe(result)
    })

    it(label.case('should SET json mode for automatic parsing'), () => {
        const fetchUnit = f.builder()
        const result = fetchUnit.def_json().build()

        type InjectedFetchUnit = FetchUnit<
            string,
            unknown,
            unknown,
            unknown,
            unknown,
            {
                isJsonMode: true
                isSafeMode: false
            },
            ''
        >
        expectType<InjectedFetchUnit>(result)
    })

    it(label.case('should SET credentials'), () => {
        const fetchUnit = f.builder()
        const credentials = 'same-origin'
        const result = fetchUnit.def_default_credentials(credentials)

        expect(fetchUnit).not.toBe(result)
        expect(result.$store.defaultCredentials).toBe(credentials)
    })

    it(label.case('should SET redirect'), () => {
        const fetchUnit = f.builder()
        const redirect = 'follow'
        const result = fetchUnit.def_default_redirect(redirect)

        expect(fetchUnit).not.toBe(result)
        expect(result.$store.defaultRedirect).toBe(redirect)
    })

    it(label.case('should SET referrer'), () => {
        const fetchUnit = f.builder()
        const referrer = 'client'
        const result = fetchUnit.def_default_referrer(referrer)

        expect(fetchUnit).not.toBe(result)
        expect(result.$store.defaultReferrer).toBe(referrer)
    })

    it(label.case('should SET referrer policy'), () => {
        const fetchUnit = f.builder()
        const referrerPolicy = 'no-referrer'
        const result = fetchUnit.def_default_referrer_policy(referrerPolicy)

        expect(fetchUnit).not.toBe(result)
        expect(result.$store.defaultReferrerPolicy).toBe(referrerPolicy)
    })

    it(label.case('should SET integrity'), () => {
        const fetchUnit = f.builder()
        const integrity = 'sha256-abcde'
        const result = fetchUnit.def_default_integrity(integrity)

        expect(fetchUnit).not.toBe(result)
        expect(result.$store.defaultIntegrity).toBe(integrity)
    })

    it(label.case('should SET keepalive'), () => {
        const fetchUnit = f.builder()
        const keepalive = true
        const result = fetchUnit.def_default_keepalive(keepalive)

        expect(fetchUnit).not.toBe(result)
        expect(result.$store.defaultKeepalive).toBe(keepalive)
    })

    it(label.case('should SET window'), () => {
        const fetchUnit = f.builder()
        const window = null
        const result = fetchUnit.def_default_window(window)

        expect(fetchUnit).not.toBe(result)
        expect(result.$store.defaultWindow).toBe(window)
    })

    it(label.case('should SET mode'), () => {
        const fetchUnit = f.builder()
        const mode = 'cors'
        const result = fetchUnit.def_default_mode(mode)

        expect(fetchUnit).not.toBe(result)
        expect(result.$store.defaultMode).toBe(mode)
    })

    it(label.case('should SET cache'), () => {
        const fetchUnit = f.builder()
        const cache = 'default'
        const result = fetchUnit.def_default_cache(cache)

        expect(fetchUnit).not.toBe(result)
        expect(result.$store.defaultCache).toBe(cache)
    })

    it(label.case('should SET safe mode'), () => {
        const fetchUnit = f.builder()
        const result = fetchUnit.def_query_mode('not_throw').build()

        type InjectedFetchUnit = FetchUnit<
            string,
            unknown,
            unknown,
            unknown,
            unknown,
            {
                isJsonMode: false
                isSafeMode: true
            },
            ''
        >
        expectType<InjectedFetchUnit>(result)
    })

    it(label.case('should DEFINE search params shape'), () => {
        const fetchUnit = f.builder()
        const SearchParams = z
            .object({
                name: z.string(),
                category: z.string(),
            })
            .transform((e) => ({
                name: e.name,
                category: e.category,
                text_length: e.name.length + e.category.length,
            }))

        const result = fetchUnit.def_searchparams(SearchParams.parse).build()

        type InjectedFetchUnit = FetchUnit<
            string,
            unknown,
            z.Infer<typeof SearchParams>,
            unknown,
            unknown,
            {
                isJsonMode: false
                isSafeMode: false
            },
            ''
        >
        expectType<InjectedFetchUnit>(result)
    })

    it(label.case('should DEFINE body shape'), () => {
        const fetchUnit = f.builder()
        const BookRequest = z.object({
            name: z.string(),
            category: z.string(),
            price: z.number(),
        })

        const result = fetchUnit.def_body(BookRequest.parse).build()

        type InjectedFetchUnit = FetchUnit<
            string,
            unknown,
            unknown,
            z.Infer<typeof BookRequest>,
            unknown,
            {
                isJsonMode: false
                isSafeMode: false
            },
            ''
        >
        expectType<InjectedFetchUnit>(result)
    })

    it(label.case('should DEFINE search params'), async () => {
        const SearchParams = z.object({
            name: z.string(),
            price: z.number(),
        })

        const BookResponse = z
            .object({
                data: z.object({
                    name: z.string(),
                    price: z.string(),
                    id: z.string(),
                }),
                status: z.literal('success'),
            })
            .transform((e) => ({
                ...e,
                data: {
                    ...e.data,
                    id: Number(e.data.id),
                    price: Number(e.data.price),
                },
            }))

        const postDynamicUnit = f
            .builder()
            .def_method('GET')
            // DYNAMIC path params: $id
            .def_url(`${BASE_URL}/books/$id`)
            .def_query_mode('throw')
            .def_default_referrer('about:client')
            .def_json()
            .def_searchparams(SearchParams.parse)
            .def_response(async ({ json }) => BookResponse.parse(await json()))
            .build()

        const searchParams = {
            name: 'Harry Potter',
            price: 10,
        }
        const searchId = 123
        const apiResponse = await postDynamicUnit.query({
            search: searchParams,

            //@ts-ignore
            path: {
                id: searchId,
            },
        })
        expect(apiResponse).toStrictEqual({
            data: {
                ...searchParams,
                id: searchId,
            },
            status: 'success',
        })
    })

    it(
        label.case('should DEFINE response shape [json mode - activated]'),
        () => {
            const fetchUnit = f.builder().def_json()

            const Product = z.object({
                name: z.string(),
                price: z.number(),
            })
            const result = fetchUnit
                .def_response(({ json }) => Product.parse(json))
                .build()

            type InjectedFetchUnit = FetchUnit<
                string,
                unknown,
                unknown,
                unknown,
                z.Infer<typeof Product>,
                {
                    isJsonMode: true
                    isSafeMode: false
                },
                ''
            >

            expectType<InjectedFetchUnit>(result)
        }
    )

    it(
        label.case('should DEFINE response shape [json mode - deactivated]'),
        async () => {
            const fetchUnit = f.builder().def_json()

            const Product = z.object({
                name: z.string(),
                price: z.number(),
            })
            const result = fetchUnit
                .def_response(async ({ json }) => {
                    // Manual parsing for json response
                    const product = Product.parse(await json())
                    return product
                })
                .build()

            type InjectedFetchUnit = FetchUnit<
                string,
                unknown,
                unknown,
                unknown,
                z.Infer<typeof Product>,
                {
                    isJsonMode: true
                    isSafeMode: false
                },
                ''
            >

            expectType<InjectedFetchUnit>(result)
        }
    )

    it(label.case('should QUERY json with [strict mode]'), async () => {
        const Body = z.object({
            name: z.string(),
            category: z.string(),
            price: z.number(),
        })
        const ApiResponse = z.object({
            data: Body,
            status: z.union([z.literal('success'), z.literal('error')]),
            message: z.string().optional(),
        })
        const postUnit = f
            .builder()
            .def_query_mode('throw')
            .def_method('POST')
            .def_default_referrer('about:client')
            .def_url(`${BASE_URL}/books`)
            .def_json()
            .def_body(Body.parse)
            .def_response(async ({ json }) => ApiResponse.parse(await json()))
            .build()

        type PostUnit = FetchUnit<
            'POST',
            unknown,
            unknown,
            z.Infer<typeof Body>,
            z.Infer<typeof ApiResponse>,
            {
                isJsonMode: true
                isSafeMode: false
            },
            'https://unit-api/v2/books'
        >
        expectType<PostUnit>(postUnit)
        expectType<
            TypeEqual<
                InferFetchUnit<typeof postUnit>,
                {
                    method: 'POST'
                    url: 'https://unit-api/v2/books'
                    body: z.Infer<typeof Body>
                    response: z.Infer<typeof ApiResponse>
                    mode: {
                        isJson: true
                        isSafeFetch: false
                    }
                }
            >
        >(true)

        const body = {
            name: 'Book',
            category: 'Fiction',
            price: 100,
        }
        const apiResponse = await postUnit.query({
            body,
        })
        expect(apiResponse).toStrictEqual({
            data: body,
            status: 'success',
        })
    })

    it(label.case('should QUERY formData with [strict mode]'), async () => {
        const BlobShape = z.custom<Blob>((e) => e instanceof Blob)

        const toJson = async (e: FormData) => {
            const title = z.string().parse(e.get('name'))
            const file = e.get('file')
            const text = await BlobShape.parse(file).text()
            return {
                name: title,
                file: text,
            }
        }

        const FormDataShape = z
            .custom<FormData>((e) => e instanceof FormData)
            .transform(toJson)

        const fetchUnit = f
            .builder()
            .def_query_mode('throw')
            .def_method('POST')
            .def_default_referrer('about:client')
            .def_url(`${BASE_URL}/books/images`)
            .def_body(BlobShape.parse)
            .def_response(async ({ response }) =>
                FormDataShape.parseAsync(await response.formData())
            )
            .build()

        const passingBodyBlob = new Blob(['Hello, World!'], {
            type: 'text/plain',
        })
        const apiResponse = await fetchUnit.query({
            body: passingBodyBlob,
        })

        const expectedFormData = new FormData()
        expectedFormData.append('name', 'Book')
        expectedFormData.append('file', passingBodyBlob)
        const res = await toJson(expectedFormData)

        expect(apiResponse).toStrictEqual(res)
    })

    it(label.case('should HANDLE fetch error & handled once'), async () => {
        let isFetchErrorHandled = false
        let errorStatusCode: number | undefined

        const fetchUnit = f
            .builder()
            .def_query_mode('throw')
            .def_method('GET')
            .def_default_referrer('about:client')
            .def_url(`${BASE_URL}/books`)
            .def_json()
            .def_fetch_err_handler(() => {
                isFetchErrorHandled = true
            }, true)
            .def_fetch_err_handler(({ status }) => {
                errorStatusCode = status
            })
            .build()

        try {
            await fetchUnit.query()
        } catch (error) {
            expect(error).toBeInstanceOf(FetchResponseError)
            if (error instanceof FetchResponseError) {
                expect(error.status).toBe(errorStatusCode)
                expect(error.statusMessage).toBe('Not Found')
            }
            expect(isFetchErrorHandled).toBe(true)
            isFetchErrorHandled = false
        }

        try {
            await fetchUnit.query()
        } catch (error) {
            expect(error).toBeInstanceOf(FetchResponseError)
            if (error instanceof FetchResponseError) {
                expect(error.status).toBe(errorStatusCode)
                expect(error.statusMessage).toBe('Not Found')
            }
            expect(isFetchErrorHandled).toBe(false)
        }
    })

    it(label.case('should HANDLE unknown error & handled once'), async () => {
        let onceHandledCount = 0
        let loggerHandledCount = 0

        const fetchUnit = f
            .builder()
            .def_query_mode('throw')
            .def_method('GET')
            .def_default_referrer('about:client')
            .def_url('https://unknown.com')
            .def_json()
            .def_response(() => {
                throw new Error('Unknown processing failure')
            })
            .def_unknown_err_handler(() => {
                // ERROR_HANDLED should be called only once
                onceHandledCount += 1
            }, true)
            .def_unknown_err_handler(() => {
                // LOGGER should be called every time
                loggerHandledCount += 1
            })
            .build()

        await expect(fetchUnit.query()).rejects.toThrowError(
            'Unknown processing failure'
        )
        expect(onceHandledCount).toBe(1)
        expect(loggerHandledCount).toBe(1)

        await expect(fetchUnit.query()).rejects.toThrowError(
            'Unknown processing failure'
        )
        // once procedure must NOT run again
        expect(onceHandledCount).toBe(1)
        expect(loggerHandledCount).toBe(2)
    })

    it(label.case('should ABORT request with timeout'), async () => {
        const fetchUnit = f.builder().def_url('https://unknown.com').build()
        await expect(fetchUnit.query({ timeout: 1 })).rejects.toThrowError(
            'The operation was aborted due to timeout'
        )
    })

    it(label.case('should ABORT request with single signal'), async () => {
        const fetchUnit = f.builder().def_url('https://unknown.com').build()
        const controller = new AbortController()
        setTimeout(() => controller.abort(), 1)
        await expect(
            fetchUnit.query({ signal: controller.signal })
        ).rejects.toThrowError('This operation was aborted')
    })

    it(label.case('should ABORT request with multiple signals'), async () => {
        const fetchUnit = f.builder().def_url('https://unknown.com').build()
        const controller1 = new AbortController()
        const controller2 = new AbortController()
        setTimeout(() => controller1.abort(), 1)
        await expect(
            fetchUnit.query({
                signal: [controller1.signal, controller2.signal],
            })
        ).rejects.toThrowError('This operation was aborted')
    })

    it(label.case('should ABORT request with timeout and signal'), async () => {
        const fetchUnit = f.builder().def_url('https://unknown.com').build()
        const controller = new AbortController()
        await expect(
            fetchUnit.query({ timeout: 1, signal: controller.signal })
        ).rejects.toThrowError('The operation was aborted due to timeout')
    })

    it(
        label.case(
            'should HANDLE path param error on invalid dynamic path param structure'
        ),
        async () => {
            const fetchUnit = f
                .builder()
                .def_method('GET')
                .def_url(`${BASE_URL}/books/_$id`)
                .build()

            await expect(
                //@ts-ignore: standalone builder has no typed path params
                fetchUnit.query({ path: { id: 'x' } })
            ).rejects.toBeInstanceOf(FetchPathParamsError)
        }
    )

    it(label.case('should KEEP numeric zero path param'), async () => {
        const fetchUnit = f
            .builder()
            .def_method('GET')
            .def_url(`${BASE_URL}/books/$id`)
            .def_json()
            .def_response(async ({ json }) => json())
            .build()

        //@ts-ignore: standalone builder has no typed path params
        const apiResponse = await fetchUnit.query({ path: { id: 0 } })

        expect(apiResponse).toStrictEqual({
            data: {
                name: null,
                price: null,
                id: '0',
            },
            status: 'success',
        })
    })

    it(
        label.case(
            'should REJECT missing path param & EXECUTE finally without query options'
        ),
        async () => {
            let finallyCalls = 0

            const fetchUnit = f
                .builder()
                .def_method('GET')
                .def_url(`${BASE_URL}/books/$id`)
                .def_final_handler(() => {
                    finallyCalls += 1
                })
                .build()

            await expect(fetchUnit.query()).rejects.toBeInstanceOf(
                FetchPathParamsError
            )
            expect(finallyCalls).toBe(1)
        }
    )

    it(
        label.case(
            'should ISOLATE once handlers between units built from the same builder'
        ),
        async () => {
            let finallyCalls = 0

            const baseBuilder = f
                .builder()
                .def_method('GET')
                .def_url(`${BASE_URL}/books`)
                .def_final_handler(() => {
                    finallyCalls += 1
                }, true)

            const unitA = baseBuilder.build()
            const unitB = baseBuilder.build()

            await expect(unitA.query()).rejects.toBeInstanceOf(
                FetchResponseError
            )
            expect(finallyCalls).toBe(1)

            await expect(unitB.query()).rejects.toBeInstanceOf(
                FetchResponseError
            )
            expect(finallyCalls).toBe(2)
        }
    )

    it(
        label.case(
            'should ROUTE createRequest stage errors through unknown error & finally procedures'
        ),
        async () => {
            let unknownHandled = false
            let finallyCalled = false
            let capturedError: unknown

            const fetchUnit = f
                .builder()
                .def_query_mode('throw')
                .def_method('POST')
                .def_url(`${BASE_URL}/books`)
                .def_body((body: unknown) => body)
                .def_unknown_err_handler(({ error }) => {
                    capturedError = error
                    unknownHandled = true
                })
                .def_final_handler(() => {
                    finallyCalled = true
                })
                .build()

            const circularBody: Record<string, unknown> = {}
            circularBody.self = circularBody

            await expect(
                //@ts-ignore: standalone builder has no typed body
                fetchUnit.query({ body: circularBody })
            ).rejects.toBeInstanceOf(SyntaxError)
            expect(unknownHandled).toBe(true)
            expect(capturedError).toBeInstanceOf(SyntaxError)
            expect(finallyCalled).toBe(true)
        }
    )

    it(label.case('should SET falsy option values via set_options'), () => {
        const fetchUnit = f.builder().def_default_keepalive(true).build()
        const updated = fetchUnit.set_options({ keepalive: false })

        expect(updated).not.toBe(fetchUnit)
        expect(updated.$store.keepalive).toBe(false)
        expect(fetchUnit.$store.keepalive).toBe(true)
    })

    it(
        label.case('should REJECT when body serialization yields undefined'),
        async () => {
            const fetchUnit = f
                .builder()
                .def_query_mode('throw')
                .def_method('POST')
                .def_url(`${BASE_URL}/books`)
                .def_body((body: unknown) => body)
                .build()

            await expect(
                //@ts-ignore: standalone builder has no typed body
                fetchUnit.query({ body: () => 'unserializable' })
            ).rejects.toBeInstanceOf(SyntaxError)
        }
    )

    it(
        label.case(
            'should SEND falsy body values (0 / empty string / false) [F1]'
        ),
        async () => {
            const fetchUnit = f
                .builder()
                .def_method('POST')
                .def_url(`${BASE_URL}/books`)
                .def_json()
                .def_response(async ({ json }) => json())
                .build()

            //@ts-ignore: standalone builder has no typed body
            await expect(fetchUnit.query({ body: 0 })).resolves.toStrictEqual({
                data: 0,
                status: 'success',
            })
            //@ts-ignore: standalone builder has no typed body
            await expect(fetchUnit.query({ body: '' })).resolves.toStrictEqual({
                data: '',
                status: 'success',
            })
            await expect(
                //@ts-ignore: standalone builder has no typed body
                fetchUnit.query({ body: false })
            ).resolves.toStrictEqual({
                data: false,
                status: 'success',
            })
        }
    )

    it(
        label.case(
            'should PASS THROUGH body & search when no validator injected (identity default) [F1]'
        ),
        async () => {
            const fetchUnit = f
                .builder()
                .def_method('GET')
                .def_url(`${BASE_URL}/books/7`)
                .def_json()
                .def_response(async ({ json }) => json())
                .build()

            await expect(
                //@ts-ignore: standalone builder has no typed search params
                fetchUnit.query({ search: { name: 'Inferred' } })
            ).resolves.toStrictEqual({
                data: {
                    name: 'Inferred',
                    price: null,
                    id: '7',
                },
                status: 'success',
            })

            const postUnit = f
                .builder()
                .def_method('POST')
                .def_url(`${BASE_URL}/books`)
                .def_json()
                .def_response(async ({ json }) => json())
                .build()

            await expect(
                //@ts-ignore: standalone builder has no typed body
                postUnit.query({ body: { injected: false } })
            ).resolves.toStrictEqual({
                data: { injected: false },
                status: 'success',
            })
        }
    )

    it(
        label.case(
            'should PRESERVE original outcome when finally procedure crashes [F2]'
        ),
        async () => {
            let routedError: unknown
            const crashingHandler = () => {
                throw new Error('finally crash')
            }

            const failUnit = f
                .builder()
                .def_query_mode('throw')
                .def_method('GET')
                .def_url(`${BASE_URL}/books`)
                .def_unknown_err_handler(({ error }) => {
                    routedError = error
                })
                .def_final_handler(crashingHandler)
                .build()

            await expect(failUnit.query()).rejects.toBeInstanceOf(
                FetchResponseError
            )
            expect(routedError).toBeInstanceOf(Error)
            expect((routedError as Error).message).toBe('finally crash')

            const okUnit = f
                .builder()
                .def_method('GET')
                .def_url(`${BASE_URL}/books/1`)
                .def_json()
                .def_response(async ({ json }) => json())
                .def_unknown_err_handler(({ error }) => {
                    routedError = error
                })
                .def_final_handler(crashingHandler)
                .build()

            await expect(okUnit.query()).resolves.toStrictEqual({
                data: { name: null, price: null, id: '1' },
                status: 'success',
            })
            expect((routedError as Error).message).toBe('finally crash')
        }
    )

    it(
        label.case(
            'should REJECT invalid fetch option values before request creation [F5]'
        ),
        async () => {
            let capturedError: unknown
            const fetchUnit = f
                .builder()
                .def_method('GET')
                .def_url(`${BASE_URL}/books/1`)
                .def_unknown_err_handler(({ error }) => {
                    capturedError = error
                })
                .build()

            const mockFetch = vi.spyOn(global, 'fetch')

            await expect(
                fetchUnit.query({
                    //@ts-ignore: intentionally invalid cache value
                    options: { cache: 'bogus' },
                })
            ).rejects.toThrowError('Invalid fetch option "cache"')

            expect(mockFetch).not.toHaveBeenCalled()
            expect(capturedError).toBeInstanceOf(Error)
            expect((capturedError as Error).message).toContain(
                'Invalid fetch option "cache"'
            )

            capturedError = undefined
            await expect(fetchUnit.query({ timeout: -1 })).rejects.toThrowError(
                'Invalid fetch option "timeout"'
            )
            expect((capturedError as Error).message).toContain(
                'Invalid fetch option "timeout"'
            )
            capturedError = undefined

            mockFetch.mockRestore()
        }
    )

    it(
        label.case(
            'should DROP undocumented option keys from queryOptions.options [F6]'
        ),
        async () => {
            let capturedRequest: Request | undefined
            const mockFetch = vi
                .spyOn(global, 'fetch')
                .mockImplementation(async (req) => {
                    capturedRequest = req as Request
                    return HttpResponse.json({ data: null })
                })

            const controller = new AbortController()
            const fetchUnit = f
                .builder()
                .def_method('GET')
                .def_url(`${BASE_URL}/books/1`)
                .build()

            const undocumentedOptions = {
                method: 'DELETE',
                headers: { 'X-Dropped': 'yes' },
                body: 'dropped',
                signal: controller.signal,
            } as unknown as Partial<FetchUnitOption>
            await fetchUnit.query({ options: undocumentedOptions })
            mockFetch.mockRestore()

            expect(capturedRequest).toBeDefined()
            expect(capturedRequest!.method).toBe('GET')
            expect(capturedRequest!.headers.get('X-Dropped')).toBeNull()
        }
    )

    it(
        label.case(
            'should SET application/json content-type on serialized bodies outside json mode [F7]'
        ),
        async () => {
            const fetchUnit = f
                .builder()
                .def_method('POST')
                .def_url(`${BASE_URL}/echo-content-type`)
                .def_response(async ({ response }) => response.json())
                .build()

            await expect(
                //@ts-ignore: standalone builder has no typed body
                fetchUnit.query({ body: { serialized: true } })
            ).resolves.toStrictEqual({
                contentType: 'application/json',
            })
        }
    )

    it(
        label.case(
            'should NOT touch content-type for passthrough FormData body [F7]'
        ),
        async () => {
            let capturedContentType: string | null = null
            const mockFetch = vi
                .spyOn(global, 'fetch')
                .mockImplementation(async (req) => {
                    capturedContentType = (req as Request).headers.get(
                        'content-type'
                    )
                    return HttpResponse.json({ data: null })
                })

            const formData = new FormData()
            formData.append('name', 'Book')

            const fetchUnit = f
                .builder()
                .def_method('POST')
                .def_url(`${BASE_URL}/echo-content-type`)
                .build()

            //@ts-ignore: standalone builder has no typed body
            //@ts-ignore: standalone builder has no typed body
            await fetchUnit.query({ body: formData })
            mockFetch.mockRestore()

            expect(capturedContentType).toMatch(/^multipart\/form-data/)
        }
    )

    it(
        label.case(
            'should THROW FetchResponseError on 3xx responses [F8 behavior lock]'
        ),
        async () => {
            const mockFetch = vi.spyOn(global, 'fetch').mockImplementation(
                async () =>
                    new Response(null, {
                        status: 302,
                        statusText: 'Found',
                        headers: { Location: 'https://unit-api/v2/next' },
                    })
            )

            const followUnit = f
                .builder()
                .def_query_mode('throw')
                .def_method('GET')
                .def_url(`${BASE_URL}/redirect`)
                .build()

            const err = await followUnit.query().catch((e) => e)
            mockFetch.mockRestore()
            expect(err).toBeInstanceOf(FetchResponseError)
            expect((err as FetchResponseError).status).toBe(302)
            expect((err as FetchResponseError).statusMessage).toBe('Found')

            const manualMock = vi.spyOn(global, 'fetch').mockImplementation(
                async () =>
                    new Response(null, {
                        status: 302,
                        statusText: 'Found',
                    })
            )
            await expect(
                followUnit.set_options({ redirect: 'manual' }).query()
            ).rejects.toBeInstanceOf(FetchResponseError)
            manualMock.mockRestore()
        }
    )

    it(
        label.case(
            'should KEEP object keys when any flows into OmitNever & LOCK widened query mode typing [F9]'
        ),
        () => {
            expectType<
                TypeEqual<
                    keyof OmitNever<{ path: any; search: any; body: any }>,
                    'path' | 'search' | 'body'
                >
            >(true)

            const pickWideMode = (): 'throw' | 'not_throw' => 'not_throw'
            const wideMode = pickWideMode()
            const wideBuilder = f
                .builder()
                .def_response(() => 42)
                .def_query_mode(wideMode)
            expect(wideBuilder.isSafeMode).toBe(true)
            const wideUnit = wideBuilder.build()
            expectType<
                TypeEqual<ReturnType<typeof wideUnit.query>, Promise<number>>
            >(true)

            const safeBuilder = f
                .builder()
                .def_response(() => 42)
                .def_query_mode('not_throw')
            expect(safeBuilder.isSafeMode).toBe(true)
            type SafeQuery = ReturnType<
                ReturnType<typeof safeBuilder.build>['query']
            >
            expectType<TypeEqual<SafeQuery, Promise<number | undefined>>>(true)

            const throwBuilder = f
                .builder()
                .def_response(() => 42)
                .def_query_mode('throw')
            expect(throwBuilder.isSafeMode).toBe(false)
            type ThrowQuery = ReturnType<
                ReturnType<typeof throwBuilder.build>['query']
            >
            expectType<TypeEqual<ThrowQuery, Promise<number>>>(true)
        }
    )

    it(
        label.case(
            'should REJECT static dollar segments & relative dollar urls without path params [S-1 intentional strictness]'
        ),
        async () => {
            const staticDollarUnit = f
                .builder()
                .def_method('GET')
                .def_url(`${BASE_URL}/books$v2`)
                .build()

            await expect(staticDollarUnit.query()).rejects.toBeInstanceOf(
                freestyleFetch.FetchPathParamsError
            )

            const relativeDollarUnit = f
                .builder()
                .def_method('GET')
                .def_url('relative/api/$id')
                .build()

            await expect(relativeDollarUnit.query()).rejects.toBeInstanceOf(
                FetchPathParamsError
            )

            expect(typeof freestyleFetch.FetchPathParamsError).toBe('function')
            expect(typeof freestyleFetch.FetchSearchParamsError).toBe(
                'function'
            )
            expect(typeof freestyleFetch.FetchResponseError).toBe('function')

            const exportedOptionTypes: [
                FetchOption['redirect'],
                FetchUnitOption['priority'],
                FetchQueryOptions<unknown, unknown, unknown>['timeout'],
            ] = ['follow', 'high', 1000]
            expect(exportedOptionTypes).toStrictEqual(['follow', 'high', 1000])
        }
    )
})
