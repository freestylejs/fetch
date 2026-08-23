import { Middleware } from '../../utils/middleware'
import { type Procedure, ProcedureSet } from '../../utils/procedure'
import type { ConcreteBoolean, Json } from '../../utils/types'
import {
    type FetchErrorCode,
    FetchPathParamsError,
    type FetchResponseError,
    FetchSearchParamsError,
} from '../error'
import type {
    DefaultFetchModeOptions,
    FetchMethod,
    FetchMethodString,
    FetchModeOptionsShape,
    FetchOption,
    FetchPathParamsShape,
    FetchQueryOptions,
    FetchSearchParamsShape,
    FetchUnitRequestHandler,
    Param,
} from './core.type'
import { FetchOptionStore } from './fetch.option'
import { FetchUnit } from './unit'

/**
 * Fetch builder, returns FetchUnit when `build`
 */
export class FetchBuilder<
    $Method extends FetchMethodString,
    $PathParams extends FetchPathParamsShape = unknown,
    $SearchParams extends FetchSearchParamsShape = unknown,
    $Body = unknown,
    $Response = unknown,
    $ModeOptions extends FetchModeOptionsShape = DefaultFetchModeOptions,
    const $BaseUrl extends string = '',
> {
    private _clone<
        $Method extends FetchMethodString,
        $PathParams extends FetchPathParamsShape,
        $SearchParams extends FetchSearchParamsShape,
        $Body,
        $Response,
        $ModeOptions extends FetchModeOptionsShape,
        $BaseUrl extends string,
    >(): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = new FetchBuilder<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()

        newBuilder._store = this._store.copy()
        ;(newBuilder.fetchErrorProcedure as any) =
            this.fetchErrorProcedure.copy()
        ;(newBuilder.unknownErrorProcedure as any) =
            this.unknownErrorProcedure.copy()
        ;(newBuilder.finallyProcedure as any) = this.finallyProcedure.copy()
        ;(newBuilder.middleware as any) = this.middleware.copy()

        newBuilder.bodyValidator = this.bodyValidator as any
        newBuilder.responseHandler = this.responseHandler as any
        newBuilder.requestHandler = this.requestHandler as any
        newBuilder.searchParamsValidator = this.searchParamsValidator as any

        newBuilder.isJsonMode = this.isJsonMode
        newBuilder.isSafeMode = this.isSafeMode

        return newBuilder
    }

    private _withDefaultOption(
        apply: (store: FetchOptionStore) => void
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()
        apply(newBuilder.$store)
        return newBuilder
    }

    /**
     * Build fetch unit
     * @returns Fetch Unit
     */
    public build(): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return new FetchUnit<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >(this._store.copy(), this._clone())
    }

    public static new<
        FetchMethod extends FetchMethodString = 'GET',
        FetchPathParams extends FetchPathParamsShape = unknown,
        FetchSearchParams extends FetchSearchParamsShape = unknown,
        FetchBody = unknown,
        FetchResponse = unknown,
        FetchModeOptions extends
            FetchModeOptionsShape = DefaultFetchModeOptions,
        FetchBaseUrl extends string = '',
    >(): FetchBuilder<
        FetchMethod,
        FetchPathParams,
        FetchSearchParams,
        FetchBody,
        FetchResponse,
        FetchModeOptions,
        FetchBaseUrl
    > {
        return new FetchBuilder<
            FetchMethod,
            FetchPathParams,
            FetchSearchParams,
            FetchBody,
            FetchResponse,
            FetchModeOptions,
            FetchBaseUrl
        >()
    }

    private constructor() {
        this._store = new FetchOptionStore()
    }

    private _store: FetchOptionStore
    public get $store(): FetchOptionStore {
        return this._store
    }

    public def_method<const Method extends FetchMethod>(
        method: Method
    ): FetchBuilder<
        Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()
        newBuilder._store.method = method
        return newBuilder
    }
    public def_url<const Url extends string>(
        url: Url
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        Url
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            Url
        >()
        newBuilder.$store.defaultUrl = url
        return newBuilder
    }
    public def_default_cache(
        cache: FetchOption['cache']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultCache = cache
        })
    }
    public def_default_mode(
        mode: FetchOption['mode']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultMode = mode
        })
    }
    public def_default_credentials(
        credentials: FetchOption['credentials']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultCredentials = credentials
        })
    }
    public def_default_redirect(
        redirect: FetchOption['redirect']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultRedirect = redirect
        })
    }
    public def_default_referrer(
        referrer: FetchOption['referrer']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultReferrer = referrer
        })
    }
    public def_default_referrer_policy(
        referrerPolicy: FetchOption['referrerPolicy']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultReferrerPolicy = referrerPolicy
        })
    }
    public def_default_integrity(
        integrity: FetchOption['integrity']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultIntegrity = integrity
        })
    }
    public def_default_keepalive(
        keepalive: FetchOption['keepalive']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultKeepalive = keepalive
        })
    }
    public def_default_window(
        window: FetchOption['window']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultWindow = window
        })
    }
    public def_default_priority(
        priority: FetchOption['priority']
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        return this._withDefaultOption((store) => {
            store.defaultPriority = priority
        })
    }

    public searchParamsValidator: (
        searchParams: FetchSearchParamsShape
    ) => $SearchParams = (searchParams) => searchParams as $SearchParams
    public def_searchparams<FetchSearchParamsInjection extends $SearchParams>(
        searchParamsValidator: (
            params: FetchSearchParamsShape
        ) => FetchSearchParamsInjection
    ): FetchBuilder<
        $Method,
        $PathParams,
        FetchSearchParamsInjection,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            FetchSearchParamsInjection,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()
        newBuilder.searchParamsValidator = searchParamsValidator
        return newBuilder
    }

    public readonly fetchErrorProcedure: ProcedureSet<{
        error: FetchResponseError
        status?: FetchErrorCode
    }> = new ProcedureSet()
    public def_fetch_err_handler(
        fetchErrorProcedure: Procedure<{
            error: FetchResponseError
            status?: FetchErrorCode
        }>,
        once: boolean = false
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()
        newBuilder.fetchErrorProcedure.use(fetchErrorProcedure, once)
        return newBuilder
    }

    public readonly unknownErrorProcedure: ProcedureSet<{
        error: unknown
    }> = new ProcedureSet()
    public def_unknown_err_handler(
        unknownErrorProcedure: Procedure<{
            error: unknown
        }>,
        once: boolean = false
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()
        newBuilder.unknownErrorProcedure.use(unknownErrorProcedure, once)
        return newBuilder
    }

    public readonly finallyProcedure: ProcedureSet<
        FetchQueryOptions<$PathParams, $SearchParams, $Body>
    > = new ProcedureSet()
    public def_final_handler(
        finallyHandler: Procedure<
            FetchQueryOptions<$PathParams, $SearchParams, $Body>
        >,
        once: boolean = false
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()
        newBuilder.finallyProcedure.use(finallyHandler, once)
        return newBuilder
    }

    public bodyValidator: (body: unknown) => $Body = (body) => body as $Body
    /**
     * @description Validate body data using any schema validation library
     * @param bodyValidator validate body data, return parsed body data
     * @example
     * ```ts
     * // Example using zod
     * import { z } from "zod"
     *
     * const BodyZod = z.object({ name: z.string() })
     * const fetchUnit = f.builder().def_body(BodyZod.parse) // pass "parse" function.
     */
    public def_body<FetchBodyInjection extends $Body>(
        bodyValidator: (body: unknown) => FetchBodyInjection
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        FetchBodyInjection,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            FetchBodyInjection,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()
        newBuilder.bodyValidator = bodyValidator
        return newBuilder
    }

    public responseHandler: (
        responseArgument: $ModeOptions['isJsonMode'] extends true
            ? {
                  response: Response
                  json: () => Promise<Json>
              }
            : {
                  response: Response
              }
    ) => $Response = (s) => s.response as $Response
    /**
     * @description Define response data
     * @param responseHandler validate response data, return processed response data
     */
    public def_response<const FetchResponseInjection>(
        responseHandler: (
            responseArgument: $ModeOptions['isJsonMode'] extends true
                ? {
                      response: Response
                      json: () => Promise<Json>
                  }
                : {
                      response: Response
                  }
        ) => FetchResponseInjection
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        Awaited<FetchResponseInjection>,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            Awaited<FetchResponseInjection>,
            $ModeOptions,
            $BaseUrl
        >()
        newBuilder.responseHandler = responseHandler as any
        return newBuilder
    }

    public requestHandler: FetchUnitRequestHandler<
        $PathParams,
        $SearchParams,
        $Body
    > = (s) => s.request as any
    /**
     * @description Handle request data
     * @param requestHandler handle request data, return processed request data
     */
    public def_request_handler(
        requestHandler: FetchUnitRequestHandler<
            $PathParams,
            $SearchParams,
            $Body
        >
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()
        newBuilder.requestHandler = requestHandler
        return newBuilder
    }

    public middleware: Middleware = new Middleware()
    public def_middleware(
        middlewareList: Array<Middleware>
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >()
        for (const middleware of middlewareList) {
            newBuilder.middleware.use(middleware.procedures)
        }
        return newBuilder as this
    }

    public isJsonMode: ConcreteBoolean = false
    public def_json(): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        {
            isJsonMode: true
            isSafeMode: $ModeOptions['isSafeMode']
        },
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            {
                isJsonMode: true
                isSafeMode: $ModeOptions['isSafeMode']
            },
            $BaseUrl
        >()
        newBuilder.isJsonMode = true
        return newBuilder
    }

    public isSafeMode: ConcreteBoolean = false
    public def_query_mode<const QueryMode extends 'throw' | 'not_throw'>(
        queryMode: QueryMode
    ): FetchBuilder<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        {
            isJsonMode: $ModeOptions['isJsonMode']
            isSafeMode: [QueryMode] extends ['throw']
                ? false
                : [QueryMode] extends ['not_throw']
                  ? true
                  : boolean
        },
        $BaseUrl
    > {
        const newBuilder = this._clone<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            {
                isJsonMode: $ModeOptions['isJsonMode']
                isSafeMode: [QueryMode] extends ['throw']
                    ? false
                    : [QueryMode] extends ['not_throw']
                      ? true
                      : boolean
            },
            $BaseUrl
        >()
        newBuilder.isSafeMode = queryMode === 'not_throw'
        return newBuilder
    }

    public buildPathParams(baseUrl: string, pathParams?: $PathParams): string {
        if (!baseUrl.includes('$')) return baseUrl

        try {
            const baseUrlObject: URL = new URL(baseUrl)
            const dynamicParamsProcessedPath: string = baseUrlObject.pathname
                .split('/')
                .filter(Boolean)
                .reduce<Array<string>>((paramList, params) => {
                    const isDynamicParam: boolean = params.startsWith('$')

                    if (params.includes('$') && !isDynamicParam)
                        throw new SyntaxError(
                            `Invalid path params, ${params}\nDynamic Params should be started with $, ex) $id, $name\nCheck your base url: ${baseUrl}`
                        )

                    if (isDynamicParam) {
                        const paramKey: string = params.slice(1)
                        const dynamicParam: Param | undefined = (
                            pathParams as Record<string, Param>
                        )?.[paramKey]

                        if (
                            typeof dynamicParam !== 'number' &&
                            !(
                                typeof dynamicParam === 'string' &&
                                dynamicParam.length > 0
                            )
                        )
                            throw new SyntaxError(
                                `Missing or invalid value for path param "$${paramKey}" in ${baseUrl}`
                            )

                        paramList.push(String(dynamicParam))
                        return paramList
                    }

                    paramList.push(params)
                    return paramList
                }, [])
                .join('/')

            baseUrlObject.pathname = dynamicParamsProcessedPath
            return baseUrlObject.toString()
        } catch (e) {
            throw new FetchPathParamsError(baseUrl.toString(), pathParams, e)
        }
    }

    public buildSearchParams(
        baseUrl: string,
        searchParams?: $SearchParams
    ): string {
        if (searchParams === undefined) return baseUrl

        try {
            const validatedSearchParams: Record<string, Param | Array<Param>> =
                this.searchParamsValidator(searchParams) as Record<
                    string,
                    Param | Array<Param>
                >

            const baseUrlObject: URL = new URL(baseUrl)

            Object.entries(validatedSearchParams).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => {
                        baseUrlObject.searchParams.append(key, v.toString())
                    })
                } else {
                    baseUrlObject.searchParams.append(key, value.toString())
                }
            })

            return baseUrlObject.toString()
        } catch (e) {
            throw new FetchSearchParamsError(
                baseUrl.toString(),
                searchParams,
                e
            )
        }
    }
}

/**
 * @description Fetch builder shape type
 */
export type FetchBuilderShape = FetchBuilder<
    FetchMethodString,
    any,
    any,
    any,
    any,
    FetchModeOptionsShape,
    string
>

export type DefaultFetchBuilderShape = FetchBuilder<
    string,
    unknown,
    unknown,
    unknown,
    unknown,
    {
        isJsonMode: ConcreteBoolean
        isSafeMode: ConcreteBoolean
    },
    ''
>

/**
 * Create fetch unit using builder.
 */
export const builder = FetchBuilder.new
