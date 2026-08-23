import { describe, expect, it } from 'vitest'
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
})
