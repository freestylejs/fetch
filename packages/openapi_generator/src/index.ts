#!/usr/bin/env node

import { resolve } from 'node:path'
import { Command } from 'commander'
import { outputFileSync } from 'fs-extra'
import { parseOpenApiSpec, parsePaths } from './path_parser'
import { generateRouter } from './router_generator'
import { SchemaGenerator } from './schema_generator'

const program = new Command()

program
    .command('generate')
    .description(
        'Generate a new API client from an OpenAPI specification file.'
    )
    .requiredOption('-i, --input <path>', 'Path to the OpenAPI JSON file')
    .requiredOption(
        '-o, --output <dir>',
        'Directory to output the generated client'
    )
    .action(async (options) => {
        const absoluteInputPath = resolve(process.cwd(), options.input)
        const absoluteOutputPath = resolve(process.cwd(), options.output)

        const spec = await parseOpenApiSpec(absoluteInputPath)

        const schemaGenerator = new SchemaGenerator(spec)

        // Generate and write models
        const modelsFileContent = schemaGenerator.generateModels()

        outputFileSync(
            resolve(absoluteOutputPath, 'models.ts'),
            modelsFileContent
        )

        // Generate and write router
        const parsedPaths = parsePaths(spec)
        const routerFileContent = generateRouter(parsedPaths, spec)

        outputFileSync(resolve(absoluteOutputPath, 'api.ts'), routerFileContent)

        // Generate and write index
        outputFileSync(
            resolve(absoluteOutputPath, 'index.ts'),
            "export * from './api';\nexport * from './models';"
        )

        console.log(
            `API client generated successfully at ${absoluteOutputPath}`
        )
    })

program.parse(process.argv)
