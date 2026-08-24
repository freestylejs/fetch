import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
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

const corpusFiles = ['api.ts', 'models.ts', 'auth.ts']

export function prepareCorpus() {
    if (!existsSync(sourceDir)) {
        throw new Error(`Corpus source not found: ${sourceDir}`)
    }
    rmSync(targetDir, { recursive: true, force: true })
    mkdirSync(targetDir, { recursive: true })
    for (const file of corpusFiles) {
        cpSync(path.join(sourceDir, file), path.join(targetDir, file))
    }
    return targetDir
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    prepareCorpus()
}
