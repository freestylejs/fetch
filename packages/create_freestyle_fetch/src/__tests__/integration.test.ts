import { existsSync, readdirSync, readFileSync, statSync } from 'fs-extra'
import { join, resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { AuthGenerator } from '../auth_generator'
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
        let specPath = join(openapiDir, specFileName)

        if (!existsSync(specPath)) {
            specPath = join(openapiDir, `${caseName}.yaml`)
            if (!existsSync(specPath)) {
                return
            }
        }

        describe(caseName, () => {
            it(`should generate the same ${caseName}.models as the snapshot`, async () => {
                const spec = await parseOpenApiSpec(specPath)
                const modelGenerator = new SchemaGenerator(spec)

                const generatedModels = modelGenerator.generateModels()

                const snapshot = readFileSync(
                    join(genDir, caseName, 'models.ts'),
                    'utf-8'
                )
                expect(generatedModels).toEqual(snapshot)
            })

            it(`should generate the same ${caseName}.api as the snapshot`, async () => {
                const spec = await parseOpenApiSpec(specPath)
                const parsedPaths = parsePaths(spec)
                const generatedRouter = generateRouter(parsedPaths, spec)

                const snapshot = readFileSync(
                    join(genDir, caseName, 'api.ts'),
                    'utf-8'
                )
                expect(generatedRouter).toEqual(snapshot)
            })

            it(`should generate the same ${caseName}.auth as the snapshot`, async () => {
                const spec = await parseOpenApiSpec(specPath)
                const authGenerator = new AuthGenerator(spec)
                const generatedAuth = authGenerator.generateFileContent()

                const authPath = join(genDir, caseName, 'auth.ts')
                if (existsSync(authPath)) {
                    const snapshot = readFileSync(authPath, 'utf-8')
                    expect(generatedAuth).toEqual(snapshot)
                }
            })
        })
    })
})
