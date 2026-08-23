# API Reference

Type-safe, fluent fetch wrapper for TypeScript. It provides a builder pattern for constructing requests, a router for organizing API endpoints, and middleware support.

---

## Core Components

### `f` (Namespace)

The `f` namespace is the entry point for all operations.

| Property     | Type                | Description                                      |
| ------------ | ------------------- | ------------------------------------------------ |
| `builder`    | `() => FetchBuilder`| Creates a new `FetchBuilder` instance.           |
| `router`     | `Function`          | Creates a strongly-typed API router.             |
| `middleware` | `() => Middleware`  | Factory that creates a `Middleware` instance.    |

---

## FetchBuilder

The `FetchBuilder` class configures and creates a `FetchUnit`. It uses a fluent interface where methods return a new builder instance, ensuring immutability.

### Configuration Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `def_method` | `method: FetchMethod` | Sets the HTTP method (e.g., `'GET'`, `'POST'`). |
| `def_url` | `url: string` | Sets the default base URL. Supports dynamic params (e.g., `/books/$id`). Runtime substitution works on a standalone builder, but the typed `path` (`pathParams`) argument is generated only when the builder goes through the [`Router`](#router). |
| `def_json` | - | Enables JSON mode. Sets `Content-Type: application/json` and adds a `json()` helper to the response handler. |
| `def_query_mode` | `'throw' \| 'not_throw'` | Sets the error handling mode. `'not_throw'` returns `undefined` on error instead of throwing. |

### Input & Output Definitions

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `def_body` | `validator: (body: unknown) => T` | Defines a body validator. The builder infers the body type from the return value. |
| `def_searchparams` | `validator: (params: unknown) => T` | Defines a search parameters validator. The builder infers the search params type from the return value. |
| `def_response` | `handler: (args) => T` | Defines how to handle the response. `args` contains `response` and `json()` (if JSON mode is active). |

### Handlers & Middleware

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `def_request_handler` | `handler: (args) => Request` | Intercepts and modifies the `Request` object before sending. |
| `def_fetch_err_handler` | `handler: ({ error, status }) => void`, `once?: boolean` | Handles standard fetch errors (e.g., 4xx, 5xx responses). |
| `def_unknown_err_handler` | `handler: ({ error }) => void`, `once?: boolean` | Handles unknown errors (e.g., network failure). |
| `def_final_handler` | `handler: (options) => void`, `once?: boolean` | Executed after the request completes, regardless of success or failure. |
| `def_middleware` | `middlewareList: Array<Middleware>` | Adds middleware to the request pipeline. |

### Default Configuration

These methods set default values for standard `fetch` options.

| Method | Description |
| :--- | :--- |
| `def_default_cache` | Sets the default `cache` mode. |
| `def_default_credentials` | Sets the default `credentials` mode. |
| `def_default_redirect` | Sets the default `redirect` mode. |
| `def_default_referrer` | Sets the default `referrer`. |
| `def_default_referrer_policy` | Sets the default `referrerPolicy`. |
| `def_default_mode` | Sets the default CORS `mode`. |
| `def_default_integrity` | Sets the default resource `integrity`. |
| `def_default_keepalive` | Sets the default `keepalive` status. |
| `def_default_window` | Sets the default `window`. |
| `def_default_priority` | Sets the default `priority`. |

### Build

| Method | Returns | Description |
| :--- | :--- | :--- |
| `build()` | `FetchUnit` | Finalizes configuration and returns an executable `FetchUnit`. |

---

## FetchUnit

The `FetchUnit` represents a configured request that is ready for execution.

### Methods

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `query` | `options?: FetchQueryOptions` | `Promise<ResponseData>` | Executes the fetch request. |
| `set_options` | `options: Partial<FetchUnitOption>` | `FetchUnit` | Returns a new unit with updated standard fetch options. |
| `set_cache` | `cache: FetchOption['cache']` | `FetchUnit` | Returns a new unit with the updated cache mode. |
| `set_credentials` | `credentials: FetchOption['credentials']` | `FetchUnit` | Returns a new unit with the updated credentials mode. |
| `set_redirect` | `redirect: FetchOption['redirect']` | `FetchUnit` | Returns a new unit with the updated redirect mode. |
| `set_referrer` | `referrer: FetchOption['referrer']` | `FetchUnit` | Returns a new unit with the updated referrer. |
| `set_referrer_policy` | `referrerPolicy: FetchOption['referrerPolicy']` | `FetchUnit` | Returns a new unit with the updated referrer policy. |
| `set_integrity` | `integrity: FetchOption['integrity']` | `FetchUnit` | Returns a new unit with the updated subresource integrity. |
| `set_keepalive` | `keepalive: FetchOption['keepalive']` | `FetchUnit` | Returns a new unit with the updated keepalive flag. |
| `set_window` | `window: FetchOption['window']` | `FetchUnit` | Returns a new unit with the updated associated window. |
| `set_mode` | `mode: FetchOption['mode']` | `FetchUnit` | Returns a new unit with the updated CORS mode. |
| `set_priority` | `priority: FetchOption['priority']` | `FetchUnit` | Returns a new unit with the updated priority. |
| `copy` | - | `FetchUnit` | Creates a shallow copy of the current `FetchUnit` (the option store is copied; the underlying builder and its procedures/middleware are shared). |

### FetchQueryOptions

The `query` method accepts an options object to configure the specific request.

| Property | Type | Description |
| :--- | :--- | :--- |
| `body` | `T` | The request body, typed based on `def_body` validator. |
| `search` | `T` | Search parameters, typed based on `def_searchparams` validator. |
| `path` | `Record<string, string \| number>` | Dynamic path parameters (e.g., for `/users/$id`, pass `{ id: 123 }`). |
| `headers` | `HeadersInit` | Request headers. Merged with default headers. |
| `options` | `Partial<FetchUnitOption>` | Standard fetch option overrides for this request (e.g., `cache`). |
| `timeout` | `number` | Request timeout in milliseconds. |
| `signal` | `AbortSignal \| AbortSignal[]` | Signal(s) to abort the request. |

### Example

```ts
import { f } from '@freestylejs/fetch'
import { z } from 'zod'

const getUser = f.builder()
    .def_method('GET')
    .def_url('https://api.example.com/users/123')
    .def_json()
    .def_response(async ({ json }) => {
        const schema = z.object({ name: z.string() })
        return schema.parse(await json())
    })
    .build()

// Execute
const user = await getUser.query()
```

Dynamic paths (e.g., `/users/$id`) are supported through the [`Router`](#router), which infers the required `path` parameters for each endpoint.

---

## Router

The `router` function organizes multiple `FetchUnit` instances into a structured, type-safe client.

### Usage

```ts
import { f } from '@freestylejs/fetch'

const api = f.router('https://api.example.com', {
    users: {
        // GET /users
        GET: f.builder()
            .def_method('GET')
            .def_response(async ({ json }) => await json()),

        // POST /users
        POST: f.builder()
            .def_method('POST')
            .def_body((body) => body),

        // Dynamic path: /users/:id
        $id: {
            // GET /users/:id
            GET: f.builder()
                .def_method('GET')
        }
    }
})

// Usage
await api.users.GET.query()
await api.users.$id.GET.query({ path: { id: '123' } })
```

Router leaves must be `FetchBuilder` instances, not built units. The router injects the resolved URL and HTTP method into each builder and builds the executable `FetchUnit` internally.

### Dynamic Paths

The router supports dynamic path segments. Define keys starting with `$` (e.g., `$id`, `$name`) to create dynamic segments. The router infers these segments and requires them in the `path` option of the `query()` method.

### Type Inference

Use `GetRouterConfig` to infer the type of your router for usage in other parts of your application.

```ts
import type { GetRouterConfig } from '@freestylejs/fetch'

type MyApi = GetRouterConfig<typeof api>
```

---

## Middleware

Middleware intercepts and modifies requests and responses. You can apply it globally or per-builder.

### Usage

```ts
import { f } from '@freestylejs/fetch'

const authMiddleware = f.middleware()

authMiddleware.use(async (request, next) => {
    request.headers.set('Authorization', 'Bearer token')
    
    const response = await next(request)
    
    return response
})

const unit = f.builder()
    .def_middleware([authMiddleware])
    .build()
```