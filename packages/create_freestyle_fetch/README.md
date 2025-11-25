# Create Freestyle Fetch

A CLI tool to generate type-safe API clients from OpenAPI specifications for `@freestylejs/fetch`.

## Installation

```bash
npm install -g create-freestyle-fetch
```

## Usage

```bash
create-freestyle-fetch generate -i ./openapi.json -o ./src/api
```

## Generated Client Usage

The generator creates a type-safe API client. You can initialize it with optional configuration, including authentication.

```typescript
import { createClient } from './src/api';

const client = createClient({
    baseUrl: 'https://api.example.com', // Optional, defaults to server URL in spec
    auth: {
        // Type-safe auth config based on security schemes in your spec
        bearerAuth: {
            token: 'my-token' // or async () => 'my-token'
        },
        apiKey: {
            value: 'my-api-key'
        }
    }
});

// Use the client
const response = await client.users.get({ search: { page: 1 } });
```

## Common Errors

### `✗ Error parsing OpenAPI specification`
Ensure your input file exists and is valid JSON or YAML. The error message will point to the specific line number for YAML files.

### `✗ Invalid Schema`
This usually means a schema in your OpenAPI spec is missing a `type` or using an unsupported feature. Check the "Suggestion" field in the error output for how to fix it.

### `✗ Invalid Operation`
Occurs when an API path or method is malformed. A common cause is missing schemas for query parameters.

## Documentation

For full documentation, visit [freestyle.fetch](https://freestyle-fetch/en/docs/create-freestyle-fetch).
