import type { FetchUnit, FetchUnitShape, InferFetchUnit } from './fetcher'
import {
    type DefaultFetchBuilderShape,
    FetchBuilder,
    type FetchBuilderShape,
} from './fetcher/builder'
import type { FetchMethod, Param } from './fetcher/core.type'
import type { FetchCommonConfiguration } from './fetcher/fetch.option'

type Structure<T> =
    | {
          [Key in FetchMethod]?: T
      }
    | {
          [Key in string]?: Structure<T>
      }
type BuilderStructure = Structure<FetchBuilderShape>
type UnitStructure = Structure<FetchUnitShape>

class Router<
    const RouterBuilderStructure extends BuilderStructure,
    const CommonConfig extends FetchCommonConfiguration,
> {
    public constructor(
        routerStructure: RouterBuilderStructure,
        commonConfig: CommonConfig
    ) {
        this._buildedRouterStructure = this.buildRouterStructure(
            routerStructure,
            commonConfig,
            commonConfig.baseUrl
        )
    }

    private _buildedRouterStructure: BuildRouterUrlFromStructure<
        RouterBuilderStructure,
        CommonConfig['baseUrl']
    >
    public get routerStructure(): BuildRouterUrlFromStructure<
        RouterBuilderStructure,
        CommonConfig['baseUrl']
    > {
        return this._buildedRouterStructure
    }

    private static fetchMethodSet = new Set<FetchMethod>([
        'CONNECT',
        'DELETE',
        'GET',
        'HEAD',
        'OPTIONS',
        'PATCH',
        'POST',
        'PUT',
        'TRACE',
    ])

    private static isFetchMethod(value: unknown): value is FetchMethod {
        return this.fetchMethodSet.has(value as FetchMethod)
    }

    public static isFetchBuilder(
        unit: unknown
    ): unit is DefaultFetchBuilderShape {
        return unit instanceof FetchBuilder
    }

    private static getUrlPath(baseUrl = '', subPath?: string): string {
        const normalizedBaseUrl = baseUrl.replace(/\/+$/, '')
        if (!subPath) return normalizedBaseUrl
        return normalizedBaseUrl ? `${normalizedBaseUrl}/${subPath}` : subPath
    }
    private static isRecord(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null
    }

    private static applyCommonOptions(
        builder: DefaultFetchBuilderShape,
        commonConfig: FetchCommonConfiguration
    ): DefaultFetchBuilderShape {
        const appliers: Array<
            (b: DefaultFetchBuilderShape) => DefaultFetchBuilderShape
        > = [
            (b) =>
                commonConfig.cache
                    ? b.def_default_cache(commonConfig.cache)
                    : b,
            (b) =>
                commonConfig.credentials
                    ? b.def_default_credentials(commonConfig.credentials)
                    : b,
            (b) =>
                commonConfig.integrity
                    ? b.def_default_integrity(commonConfig.integrity)
                    : b,
            (b) =>
                commonConfig.keepalive
                    ? b.def_default_keepalive(commonConfig.keepalive)
                    : b,
            (b) =>
                commonConfig.mode ? b.def_default_mode(commonConfig.mode) : b,
            (b) =>
                commonConfig.priority
                    ? b.def_default_priority(commonConfig.priority)
                    : b,
            (b) =>
                commonConfig.redirect
                    ? b.def_default_redirect(commonConfig.redirect)
                    : b,
            (b) =>
                commonConfig.referrer
                    ? b.def_default_referrer(commonConfig.referrer)
                    : b,
            (b) =>
                commonConfig.referrerPolicy
                    ? b.def_default_referrer_policy(commonConfig.referrerPolicy)
                    : b,
            (b) =>
                commonConfig.window
                    ? b.def_default_window(commonConfig.window)
                    : b,
            (b) =>
                commonConfig.middleware
                    ? b.def_middleware(commonConfig.middleware)
                    : b,
        ]
        return appliers.reduce((acc, apply) => apply(acc), builder)
    }

    private buildRouterStructure<T extends Record<string, unknown>>(
        structure: BuilderStructure,
        commonConfig: FetchCommonConfiguration,
        baseUrl: string = ''
    ): T {
        const result = {} as Record<string, unknown>

        for (const key of Object.keys(structure)) {
            const value = structure[key as keyof typeof structure]

            if (!value) {
                throw new Error(
                    `Router structure should be defined at ${String(key)}.`
                )
            }

            if (Router.isFetchMethod(key) && Router.isFetchBuilder(value)) {
                // 1. URL / Method
                // 2. Common configuration
                const newBuilder = Router.applyCommonOptions(
                    value.def_url(Router.getUrlPath(baseUrl)).def_method(key),
                    commonConfig
                )

                // 3. Build
                result[key] = newBuilder.build()
            } else if (Router.isRecord(value)) {
                result[key] = this.buildRouterStructure(
                    value,
                    commonConfig,
                    Router.getUrlPath(baseUrl, key as string)
                )
            } else {
                throw new Error(
                    `Invalid router structure at key: ${String(key)}`
                )
            }
        }

        return result as T
    }
}

/**
 * Create router
 * @param baseUrl Base url.
 * @param router Router structure.
 */
export function router<
    const RouterBaseUrl extends string,
    const RouterBuilderStructure extends BuilderStructure,
>(
    baseUrl: RouterBaseUrl,
    router: RouterBuilderStructure
): BuildRouterUrlFromStructure<RouterBuilderStructure, RouterBaseUrl>
/**
 * Create router
 * @param config Common configuration.
 * @param router Router structure.
 */
export function router<
    const CommonConfig extends FetchCommonConfiguration,
    const RouterBuilderStructure extends BuilderStructure,
>(
    config: CommonConfig,
    router: RouterBuilderStructure
): BuildRouterUrlFromStructure<RouterBuilderStructure, CommonConfig['baseUrl']>
export function router<
    const ConfigOrBaseUrl extends string | FetchCommonConfiguration,
    const RouterBuilderStructure extends BuilderStructure,
>(configOrBaseUrl: ConfigOrBaseUrl, routerStructure: RouterBuilderStructure) {
    if (typeof configOrBaseUrl === 'string') {
        const baseRouter = new Router(routerStructure, {
            baseUrl: configOrBaseUrl,
        }).routerStructure
        return baseRouter
    }
    const baseRouter = new Router(routerStructure, configOrBaseUrl)
        .routerStructure
    return baseRouter
}

type ComposeStructureList = readonly BuilderStructure[]

/**
 * Static counterpart of the runtime `Object.assign({}, ...structures)` merge:
 * later structures contribute their properties on top of earlier ones.
 * Overlapping keys intersect at the type level, mirroring TypeScript's own
 * spread semantics — the documented runtime contract is that the LAST
 * structure wins outright for any top-level key it defines.
 */
type MergeComposeStructures<Structures extends ComposeStructureList> =
    Structures extends readonly [infer Head, ...infer Tail]
        ? Head &
              MergeComposeStructures<
                  Tail extends ComposeStructureList ? Tail : []
              >
        : unknown

/**
 * Compose multiple router structures into one router
 *
 * Equivalent to `f.router(baseUrl, Object.assign({}, ...structures))`.
 * Merging follows the `Object.assign` convention: shallow copy, and a
 * top-level key defined by a later structure replaces the one from an
 * earlier structure entirely (no deep merge). Prefer composing structures
 * with disjoint top-level segments so static typing (which intersects
 * overlapping keys) and runtime behavior stay aligned.
 * @param baseUrl Base url.
 * @param structures Router structures to compose. Later structures override earlier ones.
 */
export function compose<
    const RouterBaseUrl extends string,
    const Structures extends ComposeStructureList,
>(
    baseUrl: RouterBaseUrl,
    ...structures: Structures
): BuildRouterUrlFromStructure<
    MergeComposeStructures<Structures>,
    RouterBaseUrl
>
/**
 * Compose multiple router structures into one router
 *
 * Equivalent to `f.router(config, Object.assign({}, ...structures))`.
 * Merging follows the `Object.assign` convention: shallow copy, and a
 * top-level key defined by a later structure replaces the one from an
 * earlier structure entirely (no deep merge). Prefer composing structures
 * with disjoint top-level segments so static typing (which intersects
 * overlapping keys) and runtime behavior stay aligned.
 * @param config Common configuration.
 * @param structures Router structures to compose. Later structures override earlier ones.
 */
export function compose<
    const CommonConfig extends FetchCommonConfiguration,
    const Structures extends ComposeStructureList,
>(
    config: CommonConfig,
    ...structures: Structures
): BuildRouterUrlFromStructure<
    MergeComposeStructures<Structures>,
    CommonConfig['baseUrl']
>
export function compose<
    const ConfigOrBaseUrl extends string | FetchCommonConfiguration,
    const Structures extends ComposeStructureList,
>(configOrBaseUrl: ConfigOrBaseUrl, ...structures: Structures) {
    let mergedStructure: Record<string, unknown> = {}
    for (const structure of structures) {
        mergedStructure = Object.assign(mergedStructure, structure)
    }

    if (typeof configOrBaseUrl === 'string') {
        return new Router(mergedStructure as BuilderStructure, {
            baseUrl: configOrBaseUrl,
        }).routerStructure
    }
    return new Router(mergedStructure as BuilderStructure, configOrBaseUrl)
        .routerStructure
}

export type IsDynamicPath<Path extends string> = Path extends `$${string}`
    ? true
    : false
export type GetDynamicPath<Path extends string> =
    Path extends `$${infer DynamicPath}` ? DynamicPath : never

type StripTrailingSlash<S extends string> = S extends `${infer Head}/`
    ? StripTrailingSlash<Head>
    : S

type JoinRouterUrl<BaseUrl extends string, Suffix extends string> =
    StripTrailingSlash<BaseUrl> extends infer B extends string
        ? [B] extends ['']
            ? Suffix
            : `${B}/${Suffix}`
        : never

type NoAny<T> = 0 extends 1 & T ? unknown : T

type BuildRouterUrlFromStructure<
    RouterBuilderStructure,
    BaseUrl extends string = '',
    PathParamsList extends ReadonlyArray<string> = [],
    EmptyPathParams extends boolean = PathParamsList[number] extends []
        ? true
        : false,
> = {
    [Key in keyof RouterBuilderStructure]: Key extends FetchMethod
        ? RouterBuilderStructure[Key] extends FetchBuilder<
              string,
              unknown,
              infer SearchParams,
              infer Body,
              infer Response,
              infer IsJsonMode,
              string
          >
            ? FetchUnit<
                  Key,
                  EmptyPathParams extends true
                      ? unknown
                      : {
                            [CollectedPathParamsList in PathParamsList[number]]: Param
                        },
                  NoAny<SearchParams>,
                  NoAny<Body>,
                  Response,
                  IsJsonMode,
                  BaseUrl
              >
            : never
        : Key extends string
          ? IsDynamicPath<Key> extends true
              ? BuildRouterUrlFromStructure<
                    RouterBuilderStructure[Key],
                    JoinRouterUrl<BaseUrl, string>,
                    readonly [...PathParamsList, GetDynamicPath<Key>],
                    false
                >
              : BuildRouterUrlFromStructure<
                    RouterBuilderStructure[Key],
                    JoinRouterUrl<BaseUrl, Key>,
                    PathParamsList,
                    EmptyPathParams
                >
          : never
}

/**
 * Extract router config
 */
export type GetRouterConfig<RouterStructure extends UnitStructure> =
    _GetRouterConfigUnchecked<RouterStructure>

type _GetRouterConfigUnchecked<RouterStructure> = {
    [Key in keyof RouterStructure]: Key extends FetchMethod
        ? RouterStructure[Key] extends FetchUnitShape
            ? InferFetchUnit<RouterStructure[Key]>
            : never
        : RouterStructure[Key] extends UnitStructure
          ? _GetRouterConfigUnchecked<RouterStructure[Key]>
          : never
}
