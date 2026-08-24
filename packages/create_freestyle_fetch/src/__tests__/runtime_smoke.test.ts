import { existsSync, readFileSync, rmSync } from 'node:fs'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Split-Surface runtime smoke test.
 *
 * Bundles a generated client (.gen/simple) with esbuild — pulling in
 * schemas.js, the plain-JS zod implementation surface — and executes
 * createClient() plus real parser calls against the bundle.
 */

type EsbuildModule = {
    buildSync: (options: Record<string, unknown>) => unknown
}

const loadEsbuild = (): EsbuildModule => {
    const localRequire = createRequire(import.meta.url)
    try {
        return localRequire('esbuild') as EsbuildModule
    } catch {
        // fall back to esbuild shipped inside vite's dependency graph
        const viteRequire = createRequire(localRequire.resolve('vite'))
        return viteRequire('esbuild') as EsbuildModule
    }
}

const workspaceRoot = path.resolve(__dirname, '../../../..')
const genDir = path.join(__dirname, '__mocks__/.gen')

describe('split-surface runtime smoke', () => {
    it('bundles .gen/simple with schemas.js and runs createClient + parsers', () => {
        const entry = path.join(genDir, 'simple', 'index.ts')
        expect(existsSync(entry)).toBe(true)
        expect(existsSync(path.join(genDir, 'simple', 'schemas.js'))).toBe(true)

        const outfile = path.join(os.tmpdir(), 'cfs-smoke-bundle.cjs')
        rmSync(outfile, { force: true })

        const esbuild = loadEsbuild()
        esbuild.buildSync({
            entryPoints: [entry],
            outfile,
            bundle: true,
            platform: 'node',
            format: 'cjs',
            logLevel: 'silent',
            alias: {
                '@freestylejs/fetch': path.join(
                    workspaceRoot,
                    'packages/fetch/src/index.ts'
                ),
            },
        })

        const requireBundle = createRequire(outfile)
        const bundle = requireBundle(outfile) as Record<string, unknown>

        // createClient() must run for real (router construction over the
        // generated tree, Schemas.* bindings resolved at module scope)
        const createClient = bundle.createClient as () => Record<string, any>
        const client = createClient()
        expect(client).toBeTruthy()
        expect(typeof client.books.GET.query).toBe('function')
        expect(typeof client.books.POST.query).toBe('function')

        // generated parsers execute the bundled zod implementation
        const parseBook = bundle.parseBook as (value: unknown) => unknown
        expect(
            parseBook({
                uuid: 'u1',
                name: 'Moby Dick',
                price: 100,
                category: 'fiction',
                publish_date: '1851-01-01T00:00:00Z',
            })
        ).toEqual({
            uuid: 'u1',
            name: 'Moby Dick',
            price: 100,
            category: 'fiction',
            publish_date: '1851-01-01T00:00:00Z',
        })

        // inline promoted response parser (array of refs)
        const parseBooksGetResponse = bundle.parseBooksGetResponse as (
            value: unknown
        ) => unknown[]
        expect(parseBooksGetResponse([])).toEqual([])
        expect(() => parseBooksGetResponse([{ uuid: 1 }])).toThrow()

        // inline promoted body parser rejects missing required fields
        const parseBooksPostBody = bundle.parseBooksPostBody as (
            value: unknown
        ) => unknown
        expect(() => parseBooksPostBody({})).toThrow()

        rmSync(outfile, { force: true })
    })

    it('bundles .gen/multi_domain across ./domains/* modules and runs createClient', () => {
        const entry = path.join(genDir, 'multi_domain', 'index.ts')
        const apiFile = path.join(genDir, 'multi_domain', 'api.ts')
        expect(existsSync(entry)).toBe(true)
        expect(
            existsSync(path.join(genDir, 'multi_domain', 'domains', 'users.ts'))
        ).toBe(true)
        expect(
            existsSync(
                path.join(genDir, 'multi_domain', 'domains', 'billing.ts')
            )
        ).toBe(true)

        // multi-domain contract: api.ts composes plain structures via spread
        const apiSource = readFileSync(apiFile, 'utf-8')
        expect(apiSource).toContain(
            "import { usersDomain } from './domains/users'"
        )
        expect(apiSource).toContain(
            "import { billingDomain } from './domains/billing'"
        )

        const outfile = path.join(os.tmpdir(), 'cfs-smoke-multi-bundle.cjs')
        rmSync(outfile, { force: true })

        const esbuild = loadEsbuild()
        esbuild.buildSync({
            entryPoints: [entry],
            outfile,
            bundle: true,
            platform: 'node',
            format: 'cjs',
            logLevel: 'silent',
            alias: {
                '@freestylejs/fetch': path.join(
                    workspaceRoot,
                    'packages/fetch/src/index.ts'
                ),
            },
        })

        const requireBundle = createRequire(outfile)
        const bundle = requireBundle(outfile) as Record<string, unknown>

        const createClient = bundle.createClient as () => Record<string, any>
        const client = createClient()
        expect(client).toBeTruthy()

        // every composed domain contributes live units on the built router
        expect(typeof client.users.GET.query).toBe('function')
        expect(typeof client.users.POST.query).toBe('function')
        expect(typeof client.users.$userId.GET.query).toBe('function')
        expect(typeof client.billing.invoices.GET.query).toBe('function')
        expect(typeof client.billing.invoices.$invoiceId.void.POST.query).toBe(
            'function'
        )

        expect(client.users.$userId.GET.$store.url).toBe(
            'https://api.multi-domain.test/users/$userId'
        )
        expect(client.billing.invoices.$invoiceId.void.POST.$store.url).toBe(
            'https://api.multi-domain.test/billing/invoices/$invoiceId/void'
        )

        // shared schemas surface still resolves through domain bindings
        const parseUser = bundle.parseUser as (value: unknown) => unknown
        expect(parseUser({ id: 'u1', name: 'June' })).toEqual({
            id: 'u1',
            name: 'June',
        })
        expect(() => parseUser({ id: 'u1' })).toThrow()

        rmSync(outfile, { force: true })
    })
})
