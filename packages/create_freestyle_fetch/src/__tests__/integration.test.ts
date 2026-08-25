import { existsSync, readdirSync, readFileSync, statSync } from 'fs-extra'
import { join, resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { AuthGenerator } from '../auth_generator'
import { parseOpenApiSpec, parsePaths } from '../path_parser'
import { GENERATED_FILE_HEADER } from '../utils'
import { generateRouterSurfaces } from '../router_generator'
import { SchemaGenerator } from '../schema_generator'

describe('Generator', () => {
    const mocksDir = resolve(__dirname, '__mocks__')
    const genDir = join(mocksDir, '.gen')
    const openapiDir = join(mocksDir, '.openapi')

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
            // Split-Surface contract: one shared generator produces every
            // surface; router generation runs first so inline validators are
            // promoted into named parsers before types/schemas are emitted.
            it(`should generate the same ${caseName} split-surface output as the snapshot`, async () => {
                const spec = await parseOpenApiSpec(specPath)
                const schemaGenerator = new SchemaGenerator(spec)

                const { apiFileContent, domainFiles } = generateRouterSurfaces(
                    parsePaths(spec),
                    spec,
                    schemaGenerator
                )

                const generated: Record<string, string> = {
                    'api.ts': apiFileContent,
                    'types.ts': schemaGenerator.emitTypes(),
                    'schemas.js': schemaGenerator.emitSchemasJs(),
                    'schemas.d.ts': schemaGenerator.emitSchemasDecl(),
                    'auth.ts': new AuthGenerator(spec).generateFileContent(),
                    'index.ts': `${GENERATED_FILE_HEADER}\n\nexport * from './api';\nexport * from './types';\nexport * from './schemas';\nexport * from './auth';`,
                }
                for (const domain of domainFiles) {
                    generated[domain.fileName] = domain.content
                }

                // every emitted surface must exist on disk — and vice versa
                const snapshotFiles: string[] = []
                const walk = (dir: string, prefix = '') => {
                    for (const entry of readdirSync(dir)) {
                        const full = join(dir, entry)
                        if (statSync(full).isDirectory()) {
                            walk(full, prefix ? `${prefix}/${entry}` : entry)
                        } else {
                            snapshotFiles.push(
                                prefix ? `${prefix}/${entry}` : entry
                            )
                        }
                    }
                }
                walk(join(genDir, caseName))

                expect(Object.keys(generated).sort()).toEqual(
                    snapshotFiles.sort()
                )
                for (const fileName of Object.keys(generated)) {
                    const snapshot = readFileSync(
                        join(genDir, caseName, fileName),
                        'utf-8'
                    )
                    expect(generated[fileName]).toEqual(snapshot)
                }
            })
        })
    })
})
