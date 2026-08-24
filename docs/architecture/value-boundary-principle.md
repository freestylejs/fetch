# Value Boundary Principle

> **Status**: Target-state authority (`Doc is authority`). The Split-Surface codegen
> transition (P1) is implemented and in review; consumer-facing behavior described here
> is the binding contract. Any implementation that contradicts this document must fix
> the implementation, not this document.
>
> **Supersedes**: the legacy single-file `models.ts` generation layout.

## 1. Principle Statement

1. **Validation is a runtime contract.** A validator (Zod schema, parse function) exists
   to check data at runtime. It has a value graph, costs memory, and costs type
   instantiation when the compiler can see it.
2. **Typing is a static contract.** A type describes shapes for `tsc`. It has zero
   runtime presence.
3. **`tsc` must never meet the two in the same file.** Wherever a generated file mixes a
   Zod value graph with exported type aliases, the compiler is forced to instantiate the
   entire validator graph for every consumer program, even when the consumer only needs
   types. Generated clients therefore split validation and typing into separate surfaces
   that cannot leak into each other.

Corollary: any refactor that "just wraps zod expressions in comments or helper functions"
while keeping them type-visible to consumers is invalid. The boundary must be a file
boundary.

## 2. Evidence Data

Measured with the ts-perf harness (`bench/type-perf`, Stripe corpus, `tsc --noEmit`
metrics). Instantiations = TS `Instantiations` counter.

| Variant | Intervention | Instantiations | Verdict |
| --- | --- | --- | --- |
| `vwrap` | Wrap zod expressions in comments/helpers, single file kept type-visible | 3.466M (unchanged) | **Invalid** — wrapping without surface separation has zero effect |
| `vnoanno` | Strip variance annotations from lib types | ~1.83M | Rejected — breaks cycle safety (circular schemas rupture) |
| `vdm` | Surface isolation (types demoted out of the zod file) | ~1.35M | Valid direction (−61%+) |
| `vstub` | Full stub lower-bound (hand-written declarations only) | ~0.27M | Lower bound of achievable cost |

### P1 confirmed result (Split-Surface output)

| Metric | Before (models.ts single file) | After (3-surface split) | Delta |
| --- | --- | --- | --- |
| Instantiations | 3.93M (max observed 3,985,313) | 0.29M (min observed 289,782) | **−92.6%** |
| Check/Dump-types wall clock | ~16.0s median | ~2.9–4.1s | improved |

Evidence: `.trace/baseline_summary.md` (trials 1–20 baseline vs trials 21–23
`SPLIT-SURFACE-P1`), generated 2026-08-24. Topology equality for every trial is proven
by `bench/type-perf/goldens/topology.ts` (see §4).

## 3. The Three-Surface Contract

The generator emits the client across three surfaces plus bindings (full physical layout
and import rules: [generated-client-contract.md](./generated-client-contract.md)):

| Surface | File | Contains | May import |
| --- | --- | --- | --- |
| Types (static only) | `types.ts` | Hand-derived type aliases (`<Name>Model`) | nothing |
| Schemas (runtime only) | `schemas.js` | Private Zod consts + exported `parse<Name>` functions | `zod` only |
| Schemas declaration | `schemas.d.ts` | `export declare const parse<Name>: (value: unknown) => XModel` signatures | `./types` (type-only) |
| Binding | `api.ts` | `f.router(...)` wiring via `Schemas.parse*` | `@freestylejs/fetch`, `./schemas`, `./auth` |

Inline operation validators (query objects, urlencoded bodies, inline response schemas)
must never appear as zod literals in `api.ts`; they are promoted to named parsers on the
schemas surface (`registerInlineParser`) and bound as `Schemas.<parserName>`.

### Isolation mechanism

The wall between the surfaces is **non-inclusion**, not obfuscation:

- `schemas.js` is plain JavaScript. Under the default TypeScript configuration
  (`allowJs: false`), `.js` files are not admitted into the consumer program, so the
  Zod value graph never reaches `tsc`.
- Consumers resolve `./schemas` to `schemas.d.ts`, which declares only the parse
  function signatures and imports type-only names from `types.ts`.
- Therefore a program importing the client instantiates the *type* graph exactly once,
  and the runtime performs validation exactly once — in separate files by construction.

Do not introduce `allowJs: true` requirements, do not move Zod expressions back into
`.ts` files, and do not export raw schema values from `schemas.js`.

## 4. Hard Constraint: Topology Preservation Proof

Any change to the generator or the fetch core that touches inference must prove that the
**I/O Functional Topology** of generated clients is byte-equal before and after:

- `bench/type-perf/goldens/topology.ts` locks resolved unit shapes with
  `TypeEqual` assertions over the Stripe corpus client
  (`method`, `url`, `searchParams`, `body`, `response`, `mode` fields).
- A change passes only if the golden file is unmodified and type-checks
  (`G1`: 무수정 통과). If a legitimate behavior change requires new topology, update the
  corpus/goldens in the same change set and state why in the PR description.
- Performance gates are enforced alongside (`bench/type-perf/run.mjs`): regressions in
  Instantiations/Check time beyond the allowed window block merge.

## 5. Compliance Checklist for Reviewers

- [ ] No generated `.ts` file contains a Zod expression or a `zod` import.
- [ ] `types.ts` imports nothing.
- [ ] `schemas.js` imports only `zod` (plus its private helpers); exports only
      `parse*` functions.
- [ ] `schemas.d.ts` imports only type-only names from `./types`.
- [ ] `api.ts` references validators exclusively through `Schemas.<parserName>` /
      `Schemas.parse<Name>`.
- [ ] Golden topology proof attached for inference-affecting changes.

## 6. Soundness Tightening Ledger

Topology preservation is enforced against **resolved-type identity** (golden
TypeEqual lock). Where variance annotations deliberately rejected previously
*unsound* acceptances, they are recorded here as corrections, not drifts:

| ID | Change | Old (unsound) behavior | New (sound) behavior |
| --- | --- | --- | --- |
| V1-a | `out $Method` on FetchBuilder/FetchUnit | `FetchUnit<'GET',…>` and `FetchUnit<'PUT',…>` mutually assignable — the type lied about the wire method | Rejected; a unit is only assignable where its method is accepted |
| V1-b | `in out $PathParams/$SearchParams/$Body` | `FetchBuilderShape`-style any-parameter aliases flowed into concrete units (silent key wipe risk) | Direction-checked per TS verified-variance |

Consumers relying on the old loose assignments must migrate to the concrete
unit types. Verified independently: 46/52 assignability cells byte-identical,
6 cells tightened as above (VERIFIER-TOPOLOGY, GATE-P4).
