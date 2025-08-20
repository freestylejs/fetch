# Plan for Improving OpenAPI Generator

## Goal:

To evolve the `@metal-box/openapi-generator` into a robust, production-grade tool capable of generating `metal-box/fetch` clients that fully support the OpenAPI 3.x specification, as exemplified by `e-commerse.json` and `e-commerse2.json`.

## Core Principles:

- **Robustness:** Handle malformed input gracefully, provide clear error messages.
- **Type Safety:** Maximize TypeScript type inference and correctness in generated code.
- **Extensibility:** Design components to be easily extendable for future OpenAPI features or custom requirements.
- **Maintainability:** Write clean, modular, and well-tested code.
- **Completeness:** Aim to support all relevant OpenAPI features for client generation.

## Phases of Improvement:

### Phase 1: Foundational Improvements & Robustness

1.  **Enhanced Error Handling in `parser.ts`:**
    - Wrap `readFileSync` and `JSON.parse` in `try-catch` blocks.
    - Provide specific, actionable error messages for file not found, permission issues, and invalid JSON.
    - **Example from `e-commerse.json`:** If the JSON is malformed, the current tool crashes.

2.  **OpenAPI Spec Validation:**
    - Integrate an external OpenAPI validator library (e.g., `swagger-parser` for validation and dereferencing).
    - Validate the input OpenAPI document against the official OpenAPI schema before processing.
    - **Benefit:** Prevents downstream errors from invalid or incomplete specs.

3.  **Centralized OpenAPI Dereferencing:**
    - Use a library (e.g., `swagger-parser`'s `dereference` method) to resolve all `$ref` pointers in the OpenAPI document upfront.
    - **Benefit:** Simplifies subsequent processing by working with a fully resolved document, avoiding repeated `$ref` resolution logic.
    - **Example from `e-commerse.json`:** `#/components/schemas/Product` is referenced multiple times. Dereferencing would provide the full schema directly.

4.  **Improved Type Safety for `parsePaths` Output:**
    - Replace `Record<string, any>` with a more precise recursive type definition for the `parsedPaths` object.
    - **Benefit:** Enhances maintainability and enables better type checking for the router structure.

### Phase 2: Comprehensive Schema Generation (`mapOpenApiTypeToZod`)

This phase focuses on making `mapOpenApiTypeToZod` capable of generating accurate Zod schemas for all OpenAPI schema features.

1.  **Polymorphism (`allOf`, `anyOf`, `oneOf`, `discriminator`):**
    - **`allOf`:** Map to `z.intersection()` or merge properties.
    - **`anyOf`:** Map to `z.union()` (or `z.discriminatedUnion()` if `discriminator` is present).
    - **`oneOf`:** Map to `z.union()` with additional checks for exclusivity, or `z.discriminatedUnion()`.
    - **`discriminator`:** Implement logic to generate `z.discriminatedUnion()` for polymorphic schemas.
    - **Example from `e-commerse.json`:** `Product` schema uses `discriminator` with `ElectronicsProduct` and `ClothingProduct` via `allOf`.
    - **Example from `e-commerse2.json`:** `PaymentMethod` uses `oneOf` with `discriminator`.

2.  **Enums:**
    - Detect `enum` keyword in schema properties.
    - Generate `z.enum(['value1', 'value2'])`.
    - **Example from `e-commerse.json`:** `category` parameter, `Product.productType`, `Order.status`.

3.  **Nullability:**
    - Check for `nullable: true` (OpenAPI 3.0) or `type: ['string', 'null']` (OpenAPI 3.1).
    - Generate `.nullable()` for the corresponding Zod schema.
    - **Example from `e-commerse2.json`:** `User.profile` is optional, but properties within it might be nullable.

4.  **Constraints and Validation:**
    - **Numeric:** Map `minimum`, `maximum`, `exclusiveMinimum`, `exclusiveMaximum`, `multipleOf` to `z.number().min()`, `.max()`, `.multipleOf()`.
    - **String:** Map `minLength`, `maxLength`, `pattern` to `z.string().min()`, `.max()`, `.regex()`.
    - **Array:** Map `minItems`, `maxItems`, `uniqueItems` to `z.array().min()`, `.max()`, `.unique()`.
    - **Example from `e-commerse.json`:** `price` has `minimum: 0`. `page` and `limit` parameters have `minimum`/`maximum`. `priceRange` array has `minItems`/`maxItems`.
    - **Example from `e-commerse2.json`:** `User.username` has `pattern`.

5.  **Default Values:**
    - Detect `default` keyword.
    - Generate `.default()` for the Zod schema.
    - **Example from `e-commerse.json`:** `page` and `limit` parameters have `default` values.

6.  **`readOnly` / `writeOnly`:**
    - Consider how to reflect these in generated types (e.g., separate input/output types, or Zod refinements).
    - **Example from `e-commerse2.json`:** `User.id` is `readOnly`, `User.profile.joinDate` is `readOnly`, `Product.stock` is `writeOnly`.

7.  **`additionalProperties`:**
    - Handle `additionalProperties` (boolean or schema) for object types.
    - **Example from `e-commerse.json`:** `sort` parameter has `additionalProperties`. `ElectronicsProduct.specs` has `additionalProperties`.

8.  **Recursive Schemas:**
    - Implement a strategy to handle schemas that reference themselves (e.g., a tree structure). This often involves `z.lazy()` or a two-pass approach.

9.  **Improved `$ref` Resolution for Schemas:**
    - Ensure robust handling of `$ref`s within schemas, including local and external references (if supported by the dereferencing step).

### Phase 3: Advanced Operation & Parameter Handling (`generateBuilder`)

This phase focuses on making `generateBuilder` capable of generating `metal-box/fetch` configurations for all operation-level features.

1.  **Full Content Type Support for Request Bodies:**
    - Iterate through `operation.requestBody.content` to find the most appropriate media type.
    - Map `multipart/form-data` to `FormData` and `def_body()` that accepts `FormData`.
    - Map `application/xml` or `text/plain` to appropriate `def_body()` that accepts `string` or `Blob`.
    - **Example from `e-commerse.json`:** `products` POST supports `application/json`, `application/xml`, `multipart/form-data`.
    - **Example from `e-commerse2.json`:** `products` POST uses `multipart/form-data`.

2.  **Comprehensive Parameter Handling:**
    - **Query Parameters (`in: 'query'`):**
        - Generate `def_searchparams()` with a Zod schema derived from the parameter schemas.
        - Handle `style` (e.g., `form`, `pipeDelimited`, `deepObject`) and `explode` for complex query parameters (arrays, objects).
        - **Example from `e-commerse.json`:** `category`, `priceRange`, `page`, `limit`, `sort` parameters.
        - **Example from `e-commerse2.json`:** `searchQuery`, `tags`, `page` parameters.
    - **Header Parameters (`in: 'header'`):**
        - Generate `headers` object in the `query` call or use `def_request_handler` to set headers.
        - **Example from `e-commerse.json`:** `userId` parameter.
    - **Cookie Parameters (`in: 'cookie'`):**
        - Similar to header parameters, but for cookies.
    - **Path Parameters (`in: 'path'`):**
        - Ensure `metal-box/fetch`'s dynamic path handling (`$id`) is correctly integrated with the generated `path` object in the `query` call.
        - **Example from `e-commerse.json`:** `orderId` path parameter.

3.  **Multiple Responses (Success and Error):**
    - Iterate through `operation.responses` to generate `def_response` for all successful status codes (2xx).
    - Consider generating specific error response types for non-2xx responses (e.g., `400`, `404`, `default`). This might involve a union type for the response or separate error handling.
    - **Example from `e-commerse.json`:** `products` GET has `200`, `400`, `default` responses.

4.  **Request Body `$ref` Resolution:**
    - Ensure `generateBuilder` can resolve `$ref`s pointing to `components/requestBodies` (e.g., `OrderProcessingRequest` in `e-commerse2.json`).

5.  **Conditional `def_json()`:**
    - Only add `f.builder().def_json()` if `application/json` is the primary content type for either request or response.

### Phase 4: Router & API Enhancements (`generateRouter`)

1.  **Server Variable Resolution:**
    - Implement logic to resolve server variables (e.g., `{environment}`, `{version}`).
    - Provide options for users to specify variable values (e.g., via CLI arguments or configuration).
    - Default to `default` values if available.
    - **Example from `e-commerse.json`:** `servers` array with `environment` and `version` variables.

2.  **Security Scheme Integration:**
    - Parse `components/securitySchemes` and `security` objects at global and operation levels.
    - Generate `metal-box/fetch` middleware or `def_request_handler` logic to add authentication headers (e.g., `Authorization` for API Key, Basic, Bearer, OAuth2).
    - **Example from `e-commerse.json`:** `apiKeyAuth`, `basicAuth`, `bearerAuth`, `oauth2` schemes.

3.  **Callbacks & Webhooks:**
    - **Callbacks:** Analyze `callbacks` objects within operations. Determine if client-side generation for these is feasible or necessary (often server-side). If so, generate corresponding client-side types/interfaces.
    - **Webhooks:** Analyze `webhooks` objects. Generate types for webhook payloads.
    - **Example from `e-commerse.json`:** `productCreatedNotification` callback, `orderStatusUpdate` webhook.
    - **Example from `e-commerse2.json`:** `onOrderProcessed` callback, `inventoryUpdate` webhook.

4.  **Configurability:**
    - Allow users to configure `prettier` options (e.g., read from `.prettierrc`).
    - Add CLI options for various generation behaviors (e.g., include/exclude specific features, custom base URL overrides).

### Phase 5: Testing & Documentation

1.  **Comprehensive Unit & Integration Tests:**
    - Write dedicated tests for each new feature implemented, using small, focused OpenAPI snippets.
    - Expand integration tests using `e-commerse.json` and `e-commerse2.json` to cover the newly supported features.
    - Ensure generated code passes linting and type-checking.

2.  **Detailed Documentation:**
    - Update the `README.md` with instructions on how to use the generator, supported OpenAPI features, and configuration options.
    - Provide examples of generated code for various OpenAPI constructs.

## Tools/Libraries to Consider:

- **`swagger-parser`:** For robust OpenAPI parsing, validation, and dereferencing.
- **`json-schema-to-typescript`:** As a reference or for inspiration on complex schema mapping, though direct Zod generation is preferred.
- **`openapi-sampler`:** For generating example payloads from schemas (useful for testing).

This plan outlines a significant undertaking, but following these steps will transform the current generator into a high-quality, production-ready tool.
