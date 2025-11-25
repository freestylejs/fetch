import type { OpenAPIV3_1 } from 'openapi-types'
import { describe, expect, it } from 'vitest'
import { parsePaths } from '../path_parser'
import { generateRouter } from '../router_generator'

describe('HTTP Methods Generation (Implicit)', () => {
    it('should NOT generate .def_method() but rely on router structure', () => {
        const spec: OpenAPIV3_1.Document = {
            openapi: '3.1.0',
            info: { title: 'Test API', version: '1.0.0' },
            paths: {
                '/users': {
                    get: { responses: { '200': { description: 'OK' } } },
                    post: { responses: { '201': { description: 'Created' } } },
                },
            },
        }

        const parsedPaths = parsePaths(spec)
        const code = generateRouter(parsedPaths, spec)

        // We expect the generated code to NOT explicitly define methods
        // because the runtime router handles it based on the key (GET, POST, etc.)

        expect(code).not.toContain(".def_method('GET')")
        expect(code).not.toContain(".def_method('POST')")

        // But it MUST contain the keys in the object structure
        expect(code).toContain("'GET':")
        expect(code).toContain("'POST':")
    })
})
