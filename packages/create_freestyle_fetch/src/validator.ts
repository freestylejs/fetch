import chalk from 'chalk'
import type { OpenAPIV3_1 } from 'openapi-types'

export interface ValidationWarning {
    code: string
    message: string
    path?: string
}

export class SpecValidator {
    private warnings: ValidationWarning[] = []

    constructor(private spec: OpenAPIV3_1.Document) {}

    public validate(): ValidationWarning[] {
        this.warnings = []
        this.checkOperationIds()
        this.checkUnusedSchemas()
        return this.warnings
    }

    private checkOperationIds() {
        const paths = this.spec.paths || {}
        for (const [path, pathItem] of Object.entries(paths)) {
            if (!pathItem) continue
            const methods = [
                'get',
                'put',
                'post',
                'delete',
                'options',
                'head',
                'patch',
                'trace',
            ] as const

            for (const method of methods) {
                const operation = pathItem[method] as
                    | OpenAPIV3_1.OperationObject
                    | undefined
                if (operation && !operation.operationId) {
                    this.warnings.push({
                        code: 'MISSING_OPERATION_ID',
                        message: `Missing operationId for ${method.toUpperCase()} operation. A generated ID will be used, but explicit IDs are recommended for better client method names.`,
                        path: `${method.toUpperCase()} ${path}`,
                    })
                }
            }
        }
    }

    private checkUnusedSchemas() {
        // pass for now
    }

    public formatWarnings(): string {
        if (this.warnings.length === 0) return ''

        const lines = [
            `\n${chalk.yellow('⚠')} ${chalk.bold('Validation Warnings:')}\n`,
        ]

        this.warnings.forEach((w) => {
            lines.push(`  ${chalk.yellow('•')} ${w.message}`)
            if (w.path) {
                lines.push(`    ${chalk.dim('Path:')} ${w.path}`)
            }
            lines.push('') // Add spacing
        })

        return lines.join('\n')
    }
}
