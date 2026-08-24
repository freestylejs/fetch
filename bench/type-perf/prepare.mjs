import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const benchDir = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.resolve(benchDir, '..', '..')

const sourceDir = path.join(
    workspaceRoot,
    'packages/create_freestyle_fetch/src/__tests__/__mocks__/.gen/stripe'
)
const targetDir = path.join(benchDir, 'corpus/stripe')

const corpusFiles = [
    'api.ts',
    'types.ts',
    'schemas.js',
    'schemas.d.ts',
    'auth.ts',
    'index.ts',
]

export function prepareCorpus() {
    if (!existsSync(sourceDir)) {
        throw new Error(`Corpus source not found: ${sourceDir}`)
    }
    rmSync(targetDir, { recursive: true, force: true })
    mkdirSync(targetDir, { recursive: true })
    for (const file of corpusFiles) {
        cpSync(path.join(sourceDir, file), path.join(targetDir, file))
    }

    // Domain split emit (P3): copy the plain-structure modules too.
    const sourceDomains = path.join(sourceDir, 'domains')
    if (existsSync(sourceDomains)) {
        const targetDomains = path.join(targetDir, 'domains')
        mkdirSync(targetDomains, { recursive: true })
        for (const file of readdirSync(sourceDomains)) {
            cpSync(
                path.join(sourceDomains, file),
                path.join(targetDomains, file)
            )
        }
    }
    return targetDir
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    prepareCorpus()
}
