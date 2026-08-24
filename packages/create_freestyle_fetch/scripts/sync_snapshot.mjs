#!/usr/bin/env node

/**
 * Script to regenerate test snapshots from OpenAPI specs.
 * Iterates through all spec files in src/__tests__/__mocks__/.openapi/
 * and generates the split-surface client (api.ts, types.ts, schemas.js,
 * schemas.d.ts, auth.ts, index.ts) into src/__tests__/__mocks__/.gen/{filename}/
 */

import { execSync } from 'child_process'
import fs from 'fs-extra'
import { dirname, join, parse, resolve } from 'path'
import { fileURLToPath } from 'url'

const { existsSync, removeSync, ensureDirSync, readdirSync } = fs

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '..')

// Define Base Directories
const OPENAPI_DIR = resolve(rootDir, 'src/__tests__/__mocks__/.openapi')
const GEN_BASE_DIR = resolve(rootDir, 'src/__tests__/__mocks__/.gen')

console.log('🔄 Scanning for OpenAPI specs...')

// 1. Ensure input directory exists
if (!existsSync(OPENAPI_DIR)) {
    console.error(`❌ OpenAPI directory not found at ${OPENAPI_DIR}`)
    process.exit(1)
}

// 2. Find all .json files
const specFiles = readdirSync(OPENAPI_DIR).filter(
    (file) => file.endsWith('.json') || file.endsWith('.yaml')
)

if (specFiles.length === 0) {
    console.log('⚠️  No JSON spec files found.')
    process.exit(0)
}

console.log(`Found ${specFiles.length} spec(s): ${specFiles.join(', ')}`)

// 3. Iterate and Generate
let hasError = false

for (const file of specFiles) {
    const fileNameNoExt = parse(file).name // e.g., 'stripe' from 'stripe.json'
    const inputPath = join(OPENAPI_DIR, file)
    const outputPath = join(GEN_BASE_DIR, fileNameNoExt)

    console.log(`\n-----------------------------------`)
    console.log(`running for: ${fileNameNoExt}`)
    console.log(`-----------------------------------`)

    // Clean specific output directory
    if (existsSync(outputPath)) {
        console.log(`🧹 Cleaning ${outputPath}`)
        removeSync(outputPath)
    }
    ensureDirSync(outputPath)

    // Generate code
    console.log(`⚙️  Generating code from ${file}...`)
    try {
        execSync(
            `node ../dist/index.js generate --input "${inputPath}" --output "${outputPath}"`,
            {
                cwd: __dirname, // Ensures relative path to ../dist/index.js works
                stdio: 'inherit',
            }
        )
        console.log(`✅ ${fileNameNoExt} regenerated successfully!`)
    } catch (error) {
        console.error(`❌ Failed to generate snapshots for ${fileNameNoExt}`)
        hasError = true
    }
}

// Final exit code
if (hasError) {
    console.error('\n❌ Finished with errors.')
    process.exit(1)
} else {
    console.log('\n✨ All snapshots regenerated successfully!')
    process.exit(0)
}
