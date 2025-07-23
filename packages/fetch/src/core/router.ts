import { FetchUnit, FetchUnitShape, InferFetchUnit } from './fetcher'
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
        if (!subPath) return baseUrl
        return baseUrl ? `${baseUrl}/${subPath}` : subPath
    }
    private static isRecord(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null
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
                const newBuilder = value
                    .def_url(Router.getUrlPath(baseUrl))
                    .def_method(key)

                // 2. Set common config
                if (commonConfig.cache) {
                    newBuilder.def_default_cache(commonConfig.cache)
                }
                if (commonConfig.credentials) {
                    newBuilder.def_default_credentials(commonConfig.credentials)
                }
                if (commonConfig.integrity) {
                    newBuilder.def_default_integrity(commonConfig.integrity)
                }
                if (commonConfig.keepalive) {
                    newBuilder.def_default_keepalive(commonConfig.keepalive)
                }
                if (commonConfig.mode) {
                    newBuilder.def_default_mode(commonConfig.mode)
                }
                if (commonConfig.priority) {
                    newBuilder.def_default_priority(commonConfig.priority)
                }
                if (commonConfig.redirect) {
                    newBuilder.def_default_redirect(commonConfig.redirect)
                }
                if (commonConfig.referrer) {
                    newBuilder.def_default_referrer(commonConfig.referrer)
                }
                if (commonConfig.referrerPolicy) {
                    newBuilder.def_default_referrer_policy(
                        commonConfig.referrerPolicy
                    )
                }
                if (commonConfig.window) {
                    newBuilder.def_default_window(commonConfig.window)
                }

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

export function router<
    const RouterBaseUrl extends string,
    const RouterBuilderStructure extends BuilderStructure,
>(
    baseUrl: RouterBaseUrl,
    router: RouterBuilderStructure
): BuildRouterUrlFromStructure<RouterBuilderStructure, RouterBaseUrl>
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

export type IsDynamicPath<Path extends string> = Path extends `$${string}`
    ? true
    : false
export type GetDynamicPath<Path extends string> =
    Path extends `$${infer DynamicPath}` ? DynamicPath : never

type BuildRouterUrlFromStructure<
    RouterBuilderStructure,
    BaseUrl extends string = '',
    PathParamsList extends ReadonlyArray<string> = [],
> = RouterBuilderStructure extends BuilderStructure
    ? {
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
                        PathParamsList[number] extends []
                            ? unknown
                            : {
                                  [CollectedPathParamsList in PathParamsList[number]]: Param
                              },
                        SearchParams,
                        Body,
                        Response,
                        IsJsonMode,
                        BaseUrl
                    >
                  : never
              : Key extends string
                ? IsDynamicPath<Key> extends true
                    ? BuildRouterUrlFromStructure<
                          RouterBuilderStructure[Key],
                          `${BaseUrl}/${string}`,
                          readonly [...PathParamsList, GetDynamicPath<Key>]
                      >
                    : BuildRouterUrlFromStructure<
                          RouterBuilderStructure[Key],
                          `${BaseUrl}/${Key}`,
                          PathParamsList
                      >
                : never
      }
    : never

export type GetRouterConfig<RouterStructure extends UnitStructure> = {
    [Key in keyof RouterStructure]: Key extends FetchMethod
        ? RouterStructure[Key] extends FetchUnitShape
            ? InferFetchUnit<RouterStructure[Key]>
            : never
        : RouterStructure[Key] extends UnitStructure
          ? GetRouterConfig<RouterStructure[Key]>
          : never
}
