import chalk from 'chalk'

/**
 * Base class for all generator errors
 */
export abstract class GeneratorError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }

    abstract format(): string
}

/**
 * Error for OpenAPI specification parsing failures
 */
export class SpecParsingError extends GeneratorError {
    constructor(
        message: string,
        public filePath: string,
        public line?: number,
        public column?: number,
        public suggestion?: string
    ) {
        super(message)
    }

    format(): string {
        const location = this.line
            ? `:${this.line}${this.column ? `:${this.column}` : ''}`
            : ''

        return `
${chalk.red('✗')} ${chalk.bold('Error parsing OpenAPI specification')}

  ${chalk.dim('File:')} ${this.filePath}${location}
  ${chalk.dim('Issue:')} ${this.message}
${this.suggestion ? `\n  ${chalk.yellow('💡 Suggestion:')} ${this.suggestion}` : ''}
    `.trim()
    }
}

/**
 * Error for invalid schema definitions
 */
export class SchemaValidationError extends GeneratorError {
    constructor(
        message: string,
        public schemaName: string,
        public schemaPath: string,
        public suggestion?: string
    ) {
        super(message)
    }

    format(): string {
        return `
${chalk.red('✗')} ${chalk.bold('Invalid Schema')}

  ${chalk.dim('Schema:')} ${this.schemaName} (${this.schemaPath})
  ${chalk.dim('Issue:')} ${this.message}
${this.suggestion ? `\n  ${chalk.yellow('💡 Suggestion:')} ${this.suggestion}` : ''}
    `.trim()
    }
}

/**
 * Error for file system operations
 */
export class FileSystemError extends GeneratorError {
    constructor(
        message: string,
        public operation: 'read' | 'write' | 'create' | 'delete',
        public filePath: string
    ) {
        super(message)
    }

    format(): string {
        return `
${chalk.red('✗')} ${chalk.bold(`File System Error (${this.operation})`)}

  ${chalk.dim('File:')} ${this.filePath}
  ${chalk.dim('Issue:')} ${this.message}
    `.trim()
    }
}

/**
 * Error for CLI configuration issues
 */
export class ConfigurationError extends GeneratorError {
    constructor(
        message: string,
        public option?: string,
        public providedValue?: string,
        public suggestion?: string
    ) {
        super(message)
    }

    format(): string {
        return `
${chalk.red('✗')} ${chalk.bold('Configuration Error')}

${this.option ? `  ${chalk.dim('Option:')} --${this.option}` : ''}
${this.providedValue ? `  ${chalk.dim('Provided:')} ${this.providedValue}` : ''}
  ${chalk.dim('Issue:')} ${this.message}
${this.suggestion ? `\n  ${chalk.yellow('💡 Suggestion:')} ${this.suggestion}` : ''}
    `.trim()
    }
}
/**
 * Error for invalid operation definitions
 */
export class OperationValidationError extends GeneratorError {
    constructor(
        message: string,
        public operationId: string | undefined,
        public method: string,
        public path: string,
        public suggestion?: string
    ) {
        super(message)
    }

    format(): string {
        return `
${chalk.red('✗')} ${chalk.bold('Invalid Operation')}

  ${chalk.dim('Path:')} ${this.method.toUpperCase()} ${this.path}
${this.operationId ? `  ${chalk.dim('Operation ID:')} ${this.operationId}` : ''}
  ${chalk.dim('Issue:')} ${this.message}
${this.suggestion ? `\n  ${chalk.yellow('💡 Suggestion:')} ${this.suggestion}` : ''}
    `.trim()
    }
}
