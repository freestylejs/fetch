import { resolve } from 'path'
import { readFileSync } from 'fs-extra'
import { format } from 'prettier'
import { generateRouter } from 'src/router_generator'
import { SchemaGenerator } from 'src/schema_generator'
import { describe, expect, it } from 'vitest'
import { parseOpenApiSpec, parsePaths } from '../path_parser'

describe('Generator', () => {
    it('should generate the same models as the snapshot', async () => {
        const spec = parseOpenApiSpec(
            resolve(__dirname, '__mocks__/openapi/simple.json')
        )
        const modelGenerator = new SchemaGenerator(spec)

        const generatedModels = await format(modelGenerator.generateModels(), {
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
