# Generated Client Contract

> **Status**: Target-state authority (`Doc is authority`). The Split-Surface output
> (P1) is implemented in `packages/create_freestyle_fetch` and currently under review;
> where this document and older prose disagree, this document wins.
>
> Governing principle: [value-boundary-principle.md](./value-boundary-principle.md).

## 1. Generated Directory Layout

For every successful

```bash
create-freestyle-fetch generate -i ./openapi.json -o ./src/api
```

run, the generator writes exactly these files into the output directory:

| File | Role | Language surface |
| --- | --- | --- |
| `types.ts` | Static contract: one `<Name>Model` type alias per component schema plus promoted inline aliases | TypeScript, types only |
| `schemas.js` | Runtime contract: private Zod consts + exported `parse<Name>` / promoted parsers | Plain JavaScript |
| `schemas.d.ts` | Declaration pairing for `schemas.js`: `export declare const parse<Name>: (value: unknown) => <Name>Model` | TypeScript declarations |
| `domains/<segment>.ts` | One plain structure per top-level path segment (`export const <segment>Domain = {...}`); leaves are uncompiled `f.builder()` chains bound to `Schemas.*` | TypeScript |
| `api.ts` | `createClient` factory composing the domain structures into `f.router(...)` with schema parsers and auth middleware | TypeScript |
| `auth.ts` | `AuthConfig` interface + `createAuthMiddleware` derived from `components.securitySchemes` | TypeScript |
| `index.ts` | Barrel re-export of all surfaces | TypeScript |

Specs whose paths share a single top-level segment emit exactly one domain
module; a spec with no paths emits none and `api.ts` composes `{}`.

Note: `schemas.js` + `schemas.d.ts` are a single logical *schemas surface* shipped as a
plain-JS/declaration pair. Consumers' TS programs resolve the `.d.ts`; the `.js` body
(and its Zod graph) is excluded from type checking under default `allowJs: false`.

### Import Allow/Deny Matrix

| File | Allowed imports | Forbidden imports |
| --- | --- | --- |
| `types.ts` | — (none) | everything, including relative files and `zod` |
| `schemas.js` | `zod` (value import); module-local helpers emitted by the generator | `./types`, `./api`, `./auth`, `@freestylejs/fetch` |
| `schemas.d.ts` | `import type { ... } from './types'` only | `zod`, any value import, `./api`, `./auth` |
| `domains/<segment>.ts` | `{ f } from '@freestylejs/fetch'`; `import * as Schemas from '../schemas'` | `zod`, `../types`, `../auth`, `../api`, inline Zod literals |
| `api.ts` | `{ f } from '@freestylejs/fetch'`; `{ <segment>Domain } from './domains/<segment>'`; `{ createAuthMiddleware, AuthConfig } from './auth'` | `zod`, `./types`, `./schemas` (parsers are referenced inside domain modules), inline Zod literals |
| `auth.ts` | `{ f, type Middleware } from '@freestylejs/fetch'` | `zod`, `./schemas`, `./api`, `./types`, `./domains/*` |
| `index.ts` | re-exports of `./api`, `./types`, `./schemas`, `./auth` only | any statement that is not an `export *` |

Violations are generator bugs: fix the generator, never hand-edit generated files.

## 2. Naming Rules

All component-schema naming flows through a single collision map
(`SchemaGenerator.getCollisionMap()`):

1. Raw keys from `components.schemas` are converted to PascalCase safe identifiers:
   `user-profile` → `UserProfile`, `api_key` → `ApiKey`, `userSettings` → `UserSettings`.
   Leading `$` is preserved (`$special` → `$Special`).
2. Collisions after normalization get numeric suffixes in spec order:
   `User` + `user` → `User`, `User_1`. Every consumer of exported names **must** resolve
   through the collision map — raw key concatenation is forbidden.
3. Derived names per schema `<ExportedName>`:
   - type alias: `<ExportedName>Model` in `types.ts`
   - runtime parser: `parse<ExportedName>` in `schemas.js` / `schemas.d.ts`

Promoted inline validators (operations without `$ref` schemas) derive deterministic
names from the operation base (operationId, else `Path+Method` PascalCase):

- parser: `parse<OpBase>SearchParams` / `parse<OpBase>Body` / `parse<OpBase>Response`
- alias (only when no wrapper): `<OpBase>BodyModel`, etc.

The promoted-name namespace is seeded with all component-derived names first, then
deduplicated with `_N` suffixes, so promoted names can never shadow component exports.

## 3. Inline Zod Prohibition & Validator Promotion

`api.ts` must contain zero inline Zod expressions. For each operation input/output:

| OpenAPI source | Promotion rule | Binding in `api.ts` |
| --- | --- | --- |
| requestBody `application/json` with `$ref` | none (component parser reused) | `def_body(Schemas.parse<Name>)` |
| requestBody `application/json` inline | promoted to named body parser | `def_body(Schemas.parse<OpBase>Body)` |
| requestBody `application/x-www-form-urlencoded` | promoted with URLSearchParams wrapper | `def_body(Schemas.parse<OpBase>Body)` |
| requestBody `multipart/form-data` | promoted with FormData wrapper | `def_body(Schemas.parse<OpBase>Body)` |
| query parameters | merged into one object schema, promoted | `def_searchparams(Schemas.parse<OpBase>SearchParams)` |
| 200/201 response `application/json` with `$ref` | none (component parser reused) | `def_response(async ({ json }) => Schemas.parse<Name>(await json()))` |
| 200/201 response inline (incl. arrays of refs) | promoted to named response parser | `def_response(async ({ json }) => Schemas.parse<OpBase>Response(await json()))` |

Promotion failures must surface as explicit `OperationValidationError` messages with the
operation id, method, path, and a suggestion — silent drops are prohibited.

## 4. Consumer Usage

```typescript
import { createClient } from './generated'
// or equivalently: import { createClient } from './generated/api'

const client = createClient({
  baseUrl: 'https://api.example.com', // optional; defaults to servers[0].url (variables resolved)
  auth: {
    bearerAuth: { token: 'my-token' }, // or async () => token
    apiKey: { value: process.env.API_KEY },
  },
})

// Path params via $key nodes, options keys are path / search / body
const book = await client.books.$id.GET.query({
  path: { id: '123' },
})

const created = await client.books.POST.query({
  body: { name: 'Ok', price: 10, category: 'sf' },
})

const list = await client.books.GET.query({
  search: { page: 1 }, // validated by the promoted searchParams parser
})
```

Method keys are uppercase HTTP verbs (`GET`, `POST`, …) and yield `FetchUnit`s — call
`.query({...})` on them. There is no direct invocation `client.x.GET({...})` and no
`query:` option key; the search-parameter field is `search`.

Type-level access to response shapes uses the `types.ts` exports:

```typescript
import type { BookModel } from './generated/types'
```

## 5. Migration Notes (legacy 4-file layout)

Generators ≤ 1.2 emitted `models.ts` containing both exported Zod schemas and
`z.infer` type exports, imported by `api.ts` as `import * as Model from './models'`.

| Legacy | Current |
| --- | --- |
| `models.ts` (single file, zod values + inferred types) | removed; split into `types.ts` + `schemas.js` + `schemas.d.ts` |
| `export const User = z.object({...})` (consumer-visible schema) | private const + `export const parseUser = (value) => User.parse(value)` |
| `export type UserModel = z.infer<typeof User>` | hand-derived `export type UserModel = {...}` in `types.ts` |
| `Model.User.parse(await json())` inside `api.ts` | `Schemas.parseUser(await json())` |
| `import * as Model from './models'` | `import * as Schemas from './schemas'` |
| `index.ts`: `export * from './models'` | `export * from './types'` + `export * from './schemas'` |

Consumer actions when regenerating over an existing output directory:

1. Replace any `Model.<Name>.parse` calls with imports of the matching
   `parse<Name>` function from the barrel.
2. Replace `z.infer` chains against exported schemas with the `<Name>Model` types from
   `types.ts`. Raw schema values are no longer exported; if you need `safeParse`, wrap
   your own local schema or call the generated parser inside try/catch.
3. Delete stale `models.ts` files from previous runs — regeneration does not remove
   unknown files from the output directory.

## 6. Implementation Status

Split-Surface emission (this contract) is implemented on the working tree of
`packages/create_freestyle_fetch` (P1): `schema_generator.ts` emits
`emitTypes` / `emitSchemasJs` / `emitSchemasDecl`, the CLI writes the six-file layout,
and all snapshot corpora (`.gen/**`) plus the bench Stripe corpus have been regenerated.
The change is pending review gates G1–G4 (`tasks/todo.md`).

## 7. Composition

### 7.1 Generated multi-domain emit (P3)

The generator splits the router tree into **one plain-structure module per
top-level path segment** under `domains/`. Each module exports an uncompiled
object literal whose leaves are `f.builder()` chains bound to `Schemas.*`
parsers — no compilation, no type resolution beyond the builder chain itself.
`api.ts` remains the single entry point and composes them with spread:

```typescript
// api.ts (generated)
import { f } from '@freestylejs/fetch'
import { usersDomain } from './domains/users'
import { billingDomain } from './domains/billing'
import { createAuthMiddleware, AuthConfig } from './auth'

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    // ...
    return f.router({ baseUrl: config.baseUrl || 'https://api.example.com/', middleware }, {
        ...usersDomain,
        ...billingDomain,
    })
}
```

Design invariants:

1. **Byte-identical interpreted types** — spreading object literals is pure
   structural composition; `BuildRouterUrlFromStructure` resolves exactly the
   type it resolved for the P1 inline literal (locked by the bench goldens).
2. **Domain boundary = one top-level segment** — a spec whose paths share a
   single segment (`stripe` → `v1`) emits a single domain module; a spec with
   no paths emits none and composes `{}`.
3. Domain file/export names are deterministic (`<segment>.ts`,
   `<segment>Domain`, `$` prefixes stripped) with `_N` collision suffixes in
   spec order.

### 7.2 `f.compose` (library counterpart)

`f.compose(config, ...structures)` is the public API equivalent of
`f.router(config, Object.assign({}, ...structures))`. It accepts either a
base-url string or a common configuration as its first argument, mirroring
the two `f.router` overloads.

```typescript
import { f } from '@freestylejs/fetch'
import { usersDomain } from './generated/domains/users'
import { billingDomain } from './generated/domains/billing'

const client = f.compose(
    { baseUrl: 'https://api.example.com/', middleware: [myMiddleware] },
    usersDomain,
    billingDomain
)
```

Merge contract (Object.assign convention):

- Merge is a **shallow copy**: a top-level key defined by a later structure
  replaces the earlier structure's key entirely (no deep merge).
- Prefer composing structures with **disjoint top-level segments**. At runtime
  the last structure wins for overlapping keys, while static typing intersects
  them — disjoint domains keep both aligned.


## 8. Response Nullability Ledger

Named response parsers preserve OpenAPI `nullable: true` from the source spec.
The previous inline emission silently dropped nullability on some endpoints
(stripe: 15/583 `$Response` slots, e.g. `Source.owner`). Consumers comparing
against pre-split-surface output may observe `| null` appearing in those
response types — this is spec-correctness restoration, not drift.
