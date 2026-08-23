import { describe, expect, it, vi } from 'vitest'
import { f } from '..'
import { label } from './utils/test.label'

describe(label.unit('router common configuration'), () => {
    it(
        label.case(
            'should APPLY common credentials/cache/middleware to built units'
        ),
        async () => {
            const middleware = f.middleware()
            middleware.use(async (req, next) => {
                req.headers.set('X-Common-Middleware', 'true')
                return next(req)
            })

            const api = f.router(
                {
                    baseUrl: 'https://common-api.com',
                    credentials: 'include',
                    cache: 'no-store',
                    middleware: [middleware],
                },
                {
                    books: {
                        GET: f.builder(),
                    },
                }
            )

            let capturedRequest: Request | undefined
            const mockFetch = vi
                .spyOn(global, 'fetch')
                .mockImplementation(async (req) => {
                    capturedRequest = req as Request
                    return new Response('OK', { status: 200 })
                })

            await api.books.GET.query()
            mockFetch.mockRestore()

            expect(capturedRequest).toBeDefined()
            expect(capturedRequest!.method).toBe('GET')
            expect(capturedRequest!.url).toBe('https://common-api.com/books')
            expect(capturedRequest!.credentials).toBe('include')
            expect(capturedRequest!.cache).toBe('no-store')
            expect(capturedRequest!.headers.get('X-Common-Middleware')).toBe(
                'true'
            )
        }
    )

    it(
        label.case(
            'should NOT produce double slashes with trailing slash baseUrl'
        ),
        async () => {
            const api = f.router('https://trailing-api.com/', {
                books: {
                    $id: {
                        GET: f.builder(),
                    },
                },
            })

            let capturedRequest: Request | undefined
            const mockFetch = vi
                .spyOn(global, 'fetch')
                .mockImplementation(async (req) => {
                    capturedRequest = req as Request
                    return new Response('OK', { status: 200 })
                })

            await api.books.$id.GET.query({ path: { id: 42 } })
            mockFetch.mockRestore()

            expect(capturedRequest).toBeDefined()
            expect(capturedRequest!.url).toBe(
                'https://trailing-api.com/books/42'
            )
            expect(capturedRequest!.url).not.toContain('//books')
        }
    )
})
