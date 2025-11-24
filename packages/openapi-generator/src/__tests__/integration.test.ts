import { existsSync, readdirSync, readFileSync, statSync } from 'fs-extra'
import { join, resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { parseOpenApiSpec, parsePaths } from '../path_parser'
import { generateRouter } from '../router_generator'
import { SchemaGenerator } from '../schema_generator'

describe('Generator', () => {
    const mocksDir = resolve(__dirname, '__mocks__')
    const genDir = join(mocksDir, '.gen')
    const openapiDir = join(mocksDir, 'openapi')

    const testCases = readdirSync(genDir).filter((file) => {
        return statSync(join(genDir, file)).isDirectory()
    })

    testCases.forEach((caseName) => {
        const specFileName = `${caseName}.json`
        const specPath = join(openapiDir, specFileName)

        if (!existsSync(specPath)) {
            console.warn(
                `Skipping test case ${caseName}: Spec file ${specFileName} not found.`
            )
            return
        }

        describe(caseName, () => {
            it('should generate the same models as the snapshot', async () => {
                const spec = await parseOpenApiSpec(specPath)
                const modelGenerator = new SchemaGenerator(spec)

                const generatedModels = modelGenerator.generateModels()

                const snapshot = readFileSync(
                    join(genDir, caseName, 'models.ts'),
                    'utf-8'
                )
                expect(generatedModels).toEqual(snapshot)
            })

            it('should generate the same api as the snapshot', async () => {
                const spec = await parseOpenApiSpec(specPath)
                const parsedPaths = parsePaths(spec)
                const generatedRouter = generateRouter(parsedPaths, spec)

                const snapshot = readFileSync(
                    join(genDir, caseName, 'api.ts'),
                    'utf-8'
                )
                expect(generatedRouter).toEqual(snapshot)
            })
        })
    })
})
