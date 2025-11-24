import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
    entry: {
        index: 'src/index.ts',
    },
    watch: options.watch ? ['src/**/*'] : false,
    clean: false,
    dts: true,
    outDir: 'dist',
    // add swagger parser as inline deps
    external: ['@apidevtools/swagger-parser'],
    target: 'node18',
    format: ['cjs'],
    sourcemap: false,
    shims: true,
}))
