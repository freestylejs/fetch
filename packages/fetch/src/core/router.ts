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
        if (!subPath) return baseUrl
        return baseUrl ? `${baseUrl}/${subPath}` : subPath
    }
    private static isRecord(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null
    }

    private static readonly commonOptionTable = {
        cache: 'def_default_cache',
        credentials: 'def_default_credentials',
        integrity: 'def_default_integrity',
        keepalive: 'def_default_keepalive',
        mode: 'def_default_mode',
        priority: 'def_default_priority',
        redirect: 'def_default_redirect',
        referrer: 'def_default_referrer',
        referrerPolicy: 'def_default_referrer_policy',
        window: 'def_default_window',
    } as const satisfies Record<
        Exclude<keyof FetchCommonConfiguration, 'baseUrl' | 'middleware'>,
        string
    >

    private static applyCommonOptions(
        builder: DefaultFetchBuilderShape,
        commonConfig: FetchCommonConfiguration
    ): void {
        for (const [key, methodName] of Object.entries(
            Router.commonOptionTable
        )) {
            const value =
                commonConfig[key as keyof typeof Router.commonOptionTable]
            if (!value) continue
            ;(builder as unknown as Record<string, (v: unknown) => void>)[
                methodName
            ]!(value)
        }
        if (commonConfig.middleware) {
            builder.def_middleware(commonConfig.middleware)
        }
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

                Router.applyCommonOptions(newBuilder, commonConfig)

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

export type IsDynamicPath<Path extends string> = Path extends `$${string}`
    ? true
    : false
export type GetDynamicPath<Path extends string> =
    Path extends `$${infer DynamicPath}` ? DynamicPath : never

type BuildRouterUrlFromStructure<
    RouterBuilderStructure,
    BaseUrl extends string = '',
    PathParamsList extends ReadonlyArray<string> = [],
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

/**
 * Extract router config
 */
export type GetRouterConfig<RouterStructure extends UnitStructure> = {
    [Key in keyof RouterStructure]: Key extends FetchMethod
        ? RouterStructure[Key] extends FetchUnitShape
            ? InferFetchUnit<RouterStructure[Key]>
            : never
        : RouterStructure[Key] extends UnitStructure
          ? GetRouterConfig<RouterStructure[Key]>
          : never
}
