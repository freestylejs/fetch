import { resolve } from 'path'
import { readFileSync } from 'fs-extra'
import { format } from 'prettier'
import { describe, expect, it } from 'vitest'
import { parseOpenApiSpec, parsePaths } from '../parser'
import { generateModels, generateRouter } from '../schema-compiler'

describe('Generator', () => {
    it('should generate the same models as the snapshot', async () => {
        const spec = parseOpenApiSpec(
            resolve(__dirname, '__mocks__/openapi/simple.json')
        )
        const generatedModels = await format(generateModels(spec), {
            parser: 'typescript',
            tabWidth: 4,
            trailingComma: 'es5',
            useTabs: false,
            semi: false,
            singleQuote: true,
        })
        const snapshot = readFileSync(
            resolve(__dirname, '__mocks__/gen/simple/models.ts'),
            'utf-8'
        )
        expect(generatedModels).toEqual(snapshot)
    })

    it('should generate the same api as the snapshot', async () => {
        const spec = parseOpenApiSpec(
            resolve(__dirname, '__mocks__/openapi/simple.json')
        )
        const parsedPaths = parsePaths(spec)
        const generatedRouter = await format(
            generateRouter(parsedPaths, spec),
            {
                parser: 'typescript',
                tabWidth: 4,
                trailingComma: 'es5',
                useTabs: false,
                semi: false,
                singleQuote: true,
            }
        )
        const snapshot = readFileSync(
            resolve(__dirname, '__mocks__/gen/simple/api.ts'),
            'utf-8'
        )
        expect(generatedRouter).toEqual(snapshot)
    })
})

describe('E-commerce Generator (e-commerse.json)', () => {
    it('should generate the same models as the snapshot', async () => {
        const spec = parseOpenApiSpec(
            resolve(__dirname, '__mocks__/openapi/e-commerse.json')
        )
        const generatedModels = await format(generateModels(spec), {
            parser: 'typescript',
            tabWidth: 4,
            trailingComma: 'es5',
            useTabs: false,
            semi: false,
            singleQuote: true,
        })
        const snapshot = readFileSync(
            resolve(__dirname, '__mocks__/gen/ecommerse-1/models.ts'),
            'utf-8'
        )
        expect(generatedModels).toEqual(snapshot)
    })

    it('should generate the api correctly', async () => {
        const spec = parseOpenApiSpec(
            resolve(__dirname, '__mocks__/openapi/e-commerse.json')
        )
        const parsedPaths = parsePaths(spec)
        const generatedRouter = await format(
            generateRouter(parsedPaths, spec),
            {
                parser: 'typescript',
                tabWidth: 4,
                trailingComma: 'es5',
                useTabs: false,
                semi: false,
                singleQuote: true,
            }
        )
        // Manually generated snapshot based on current generator logic
        const snapshot = `import { f } from '@metal-box/fetch'
import { z } from 'zod'
import * as Model from './models'

export const api = f.router('https://{environment}.example.com/v{version}', {
    products: {
        GET: f
            .builder()
            .def_json()
            .def_response(async ({ json }) =>
                z.array(Model.Product).parse(await json())
            ),
        POST: f
            .builder()
            .def_json()
            .def_body(Model.Product.parse)
            .def_response(async ({ json }) =>
                Model.Product.parse(await json())
            ),
    },
    orders: {
        $orderId: {
            GET: f
                .builder()
                .def_json()
                .def_response(async ({ json }) =>
                    Model.Order.parse(await json())
                ),
        },
    },
})
`
        expect(generatedRouter).toEqual(snapshot)
    })
})

describe('E-commerce Generator (e-commerse2.json)', () => {
    it('should generate the same models as the snapshot', async () => {
        const spec = parseOpenApiSpec(
            resolve(__dirname, '__mocks__/openapi/e-commerse2.json')
        )
        const generatedModels = await format(generateModels(spec), {
            parser: 'typescript',
            tabWidth: 4,
            trailingComma: 'es5',
            useTabs: false,
            semi: false,
            singleQuote: true,
        })
        const snapshot = readFileSync(
            resolve(__dirname, '__mocks__/gen/ecommerse-2/models.ts'),
            'utf-8'
        )
        expect(generatedModels).toEqual(snapshot)
    })

    it('should generate the api correctly', async () => {
        const spec = parseOpenApiSpec(
            resolve(__dirname, '__mocks__/openapi/e-commerse2.json')
        )
        const parsedPaths = parsePaths(spec)
        const generatedRouter = await format(
            generateRouter(parsedPaths, spec),
            {
                parser: 'typescript',
                tabWidth: 4,
                trailingComma: 'es5',
                useTabs: false,
                semi: false,
                singleQuote: true,
            }
        )
        // Manually generated snapshot based on current generator logic
        const snapshot = `import { f } from '@metal-box/fetch'
import { z } from 'zod'
import * as Model from './models'

export const api = f.router(
    'https://{environment}.example-commerce.com/api/v2',
    {
        products: {
            GET: f
                .builder()
                .def_json()
                .def_response(async ({ json }) =>
                    Model.PaginatedProductResponse.parse(await json())
                ),
            POST: f
                .builder()
                .def_json()
                .def_response(async ({ json }) =>
                    Model.Product.parse(await json())
                ),
            $productId: {
                GET: f
                    .builder()
                    .def_json()
                    .def_response(async ({ json }) =>
                        Model.Product.parse(await json())
                    ),
            },
        },
        orders: { $orderId: { process: { POST: f.builder().def_json() } } },
    }
)
`
        expect(generatedRouter).toEqual(snapshot)
    })
})
