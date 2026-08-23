import { describe, expect, it } from 'vitest'
import type { FetchHeader } from '../core/fetcher/core.type'
import { FetchOptionStore } from '../core/fetcher/fetch.option'
import { label } from './utils/test.label'

describe(label.unit('FetchOptionStore'), () => {
    it(label.case('should ISOLATE defaultHeaders on copy'), () => {
        const storeA = new FetchOptionStore()
        storeA.defaultHeaders = { Accept: 'application/json' }
        const storeB = storeA.copy()

        storeB.defaultHeaders['X-Custom'] = 'b'

        expect(storeA.defaultHeaders).toEqual({ Accept: 'application/json' })
        expect(storeB.defaultHeaders).toEqual({
            Accept: 'application/json',
            'X-Custom': 'b',
        })
    })

    it(label.case('should ISOLATE resolved headers on copy'), () => {
        const storeA = new FetchOptionStore()
        storeA.headers = { Accept: 'text/html' }
        const storeB = storeA.copy()

        ;(storeB.headers as Record<string, string>)['X-Custom'] = 'b'

        expect(storeA.headers).toEqual({ Accept: 'text/html' })
        expect(storeB.headers).toEqual({
            Accept: 'text/html',
            'X-Custom': 'b',
        })
    })

    it(label.case('should CLONE Headers-instance headers on copy [F3]'), () => {
        const storeA = new FetchOptionStore()
        const shared = new Headers({ Accept: 'text/html' })
        storeA.defaultHeaders = shared as unknown as FetchHeader
        const storeB = storeA.copy()

        expect(storeB.defaultHeaders).not.toBe(shared)
        expect(storeB.defaultHeaders).toBeInstanceOf(Headers)
        ;(storeB.defaultHeaders as Headers).set('X-Copy', 'b')

        expect(shared.get('X-Copy')).toBeNull()
        expect((storeB.defaultHeaders as Headers).get('X-Copy')).toBe('b')
        expect((storeB.defaultHeaders as Headers).get('Accept')).toBe(
            'text/html'
        )
    })

    it(label.case('should SHALLOW COPY array headers on copy [F3]'), () => {
        const storeA = new FetchOptionStore()
        storeA.defaultHeaders = [
            ['Accept', 'a'],
            ['B', 'c'],
        ] as unknown as FetchHeader
        const original = storeA.defaultHeaders as unknown as string[][]
        const storeB = storeA.copy()

        expect(storeB.defaultHeaders).not.toBe(original)
        expect(Array.isArray(storeB.defaultHeaders)).toBe(true)

        const copied = storeB.defaultHeaders as unknown as string[][]
        copied.push(['C', 'd'])
        expect(original).toHaveLength(2)
        expect(copied).toHaveLength(3)
        expect(copied[0]).toBe(original[0])
    })
})
