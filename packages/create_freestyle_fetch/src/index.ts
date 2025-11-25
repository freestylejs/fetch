#!/usr/bin/env node

import { resolve } from 'node:path'
import chalk from 'chalk'
import { Command } from 'commander'
import { outputFileSync } from 'fs-extra'
import { AuthGenerator } from './auth_generator'
import { GeneratorError } from './errors'
import { parseOpenApiSpec, parsePaths } from './path_parser'
import { generateRouter } from './router_generator'
import { SchemaGenerator } from './schema_generator'
import { SpecValidator } from './validator'

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
        try {
            const absoluteInputPath = resolve(process.cwd(), options.input)
            const absoluteOutputPath = resolve(process.cwd(), options.output)

            console.log(chalk.blue('ℹ') + ' Parsing OpenAPI specification...')
            const spec = await parseOpenApiSpec(absoluteInputPath)

            // Validate spec and show warnings
            const validator = new SpecValidator(spec)
            validator.validate()
            const warnings = validator.formatWarnings()
            if (warnings) {
                console.log(warnings)
            }

            console.log(chalk.blue('ℹ') + ' Generating models...')
            const schemaGenerator = new SchemaGenerator(spec)

            // Generate and write models
            const modelsFileContent = schemaGenerator.generateModels()

            outputFileSync(
                resolve(absoluteOutputPath, 'models.ts'),
                modelsFileContent
            )

            console.log(chalk.blue('ℹ') + ' Generating auth...')
            const authGenerator = new AuthGenerator(spec)
            const authFileContent = authGenerator.generateFileContent()

            outputFileSync(
                resolve(absoluteOutputPath, 'auth.ts'),
                authFileContent
            )

            console.log(chalk.blue('ℹ') + ' Generating router...')
            // Generate and write router
            const parsedPaths = parsePaths(spec)
            const routerFileContent = generateRouter(parsedPaths, spec)

            outputFileSync(
                resolve(absoluteOutputPath, 'api.ts'),
                routerFileContent
            )

            // Generate and write index
            outputFileSync(
                resolve(absoluteOutputPath, 'index.ts'),
                "export * from './api';\nexport * from './models';\nexport * from './auth';"
            )

            console.log(
                `\n${chalk.green('✔')} API client generated successfully at ${chalk.bold(absoluteOutputPath)}`
            )
        } catch (error) {
            if (error instanceof GeneratorError) {
                console.error(error.format())
                process.exit(1)
            } else {
                console.error(
                    `\n${chalk.red('✗')} ${chalk.bold('Unexpected Error')}\n`
                )
                if (error instanceof Error) {
                    console.error(`  ${chalk.dim('Message:')} ${error.message}`)
                    if (error.stack) {
                        console.error(`\n${chalk.dim(error.stack)}`)
                    }
                } else {
                    console.error(`  ${String(error)}`)
                }
                process.exit(1)
            }
        }
    })

program.parse(process.argv)
