import type { ConcreteBoolean, Json, OmitUnknown } from '../../utils/types'
import { type FetchErrorCode, FetchResponseError } from '../error'
import type { FetchBuilder } from './builder'
import type {
    DefaultFetchModeOptions,
    FetchMethodString,
    FetchModeOptionsShape,
    FetchOption,
    FetchPathParamsShape,
    FetchQueryOptions,
    FetchQueryOptionsPartial,
    FetchSearchParamsShape,
    FetchUnitOption,
} from './core.type'
import type { FetchOptionStore } from './fetch.option'

const FETCH_OPTION_ALLOWED_VALUES = {
    cache: [
        'default',
        'force-cache',
        'no-cache',
        'no-store',
        'only-if-cached',
        'reload',
    ],
    mode: ['cors', 'navigate', 'no-cors', 'same-origin'],
    priority: ['auto', 'high', 'low'],
    redirect: ['error', 'follow', 'manual'],
} as const

/**
 * @description Fetch unit
 */
export class FetchUnit<
    $Method extends FetchMethodString,
    $PathParams extends FetchPathParamsShape = unknown,
    $SearchParams extends FetchSearchParamsShape = unknown,
    $Body = unknown,
    $Response = unknown,
    $ModeOptions extends FetchModeOptionsShape = DefaultFetchModeOptions,
    const $BaseUrl extends string = '',
> {
    public constructor(
        public readonly $store: FetchOptionStore,
        private readonly $builder: FetchBuilder<
            $Method,
            $PathParams,
            $SearchParams,
            $Body,
            $Response,
            $ModeOptions,
            $BaseUrl
        >
    ) {
        this.copy = this.copy.bind(this)

        this.set_options = this.set_options.bind(this)
        this.set_cache = this.set_cache.bind(this)
        this.set_credentials = this.set_credentials.bind(this)
        this.set_redirect = this.set_redirect.bind(this)
        this.set_referrer = this.set_referrer.bind(this)
        this.set_referrer_policy = this.set_referrer_policy.bind(this)
        this.set_integrity = this.set_integrity.bind(this)
        this.set_keepalive = this.set_keepalive.bind(this)
        this.set_window = this.set_window.bind(this)
        this.set_mode = this.set_mode.bind(this)
        this.set_priority = this.set_priority.bind(this)

        this.getRequestURI = this.getRequestURI.bind(this)
        this.createRequest = this.createRequest.bind(this)
        this.query = this.query.bind(this)
    }

    public copy(): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const newStore = this.$store.copy()
        return new FetchUnit(newStore, this.$builder)
    }

    public set_options(
        options: Partial<FetchUnitOption>
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()

        if (options.cache !== undefined) copyUnit.$store.cache = options.cache
        if (options.credentials !== undefined)
            copyUnit.$store.credentials = options.credentials
        if (options.integrity !== undefined)
            copyUnit.$store.integrity = options.integrity
        if (options.keepalive !== undefined)
            copyUnit.$store.keepalive = options.keepalive
        if (options.mode !== undefined) copyUnit.$store.mode = options.mode
        if (options.priority !== undefined)
            copyUnit.$store.priority = options.priority
        if (options.redirect !== undefined)
            copyUnit.$store.redirect = options.redirect
        if (options.referrer !== undefined)
            copyUnit.$store.referrer = options.referrer
        if (options.referrerPolicy !== undefined)
            copyUnit.$store.referrerPolicy = options.referrerPolicy
        if (options.window !== undefined)
            copyUnit.$store.window = options.window

        return copyUnit
    }

    public set_cache(
        cache: FetchOption['cache']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.cache = cache
        return copyUnit
    }
    public set_credentials(
        credentials: FetchOption['credentials']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.credentials = credentials
        return copyUnit
    }
    public set_redirect(
        redirect: FetchOption['redirect']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.redirect = redirect
        return copyUnit
    }
    public set_referrer(
        referrer: FetchOption['referrer']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.referrer = referrer
        return copyUnit
    }
    public set_referrer_policy(
        referrerPolicy: FetchOption['referrerPolicy']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.referrerPolicy = referrerPolicy
        return copyUnit
    }
    public set_integrity(
        integrity: FetchOption['integrity']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.integrity = integrity
        return copyUnit
    }
    public set_keepalive(
        keepalive: FetchOption['keepalive']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.keepalive = keepalive
        return copyUnit
    }
    public set_window(
        window: FetchOption['window']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.window = window
        return copyUnit
    }
    public set_mode(
        mode: FetchOption['mode']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.mode = mode
        return copyUnit
    }
    public set_priority(
        priority: FetchOption['priority']
    ): FetchUnit<
        $Method,
        $PathParams,
        $SearchParams,
        $Body,
        $Response,
        $ModeOptions,
        $BaseUrl
    > {
        const copyUnit = this.copy()
        copyUnit.$store.priority = priority
        return copyUnit
    }

    private getRequestURI(
        pathParams?: $PathParams,
        searchParams?: $SearchParams
    ): string {
        const baseUrl = this.$store.url
        const requestURI = this.$builder.buildSearchParams(
            this.$builder.buildPathParams(
                baseUrl instanceof Request ? baseUrl.url : baseUrl.toString(),
                pathParams
            ),
            searchParams
        )
        return requestURI
    }

    private getValidBody(targetBody: unknown): {
        body: BodyInit
        jsonSerialized: boolean
    } {
        if (
            targetBody instanceof Blob ||
            targetBody instanceof FormData ||
            targetBody instanceof ArrayBuffer ||
            targetBody instanceof ReadableStream ||
            targetBody instanceof URLSearchParams
        ) {
            return { body: targetBody, jsonSerialized: false }
        }

        try {
            const serializedJson = JSON.stringify(targetBody) as
                | string
                | undefined

            if (serializedJson === undefined)
                throw new SyntaxError(
                    `Json serialization failed. Please check your body, ${targetBody}`,
                    {
                        cause: [targetBody],
                    }
                )

            return { body: serializedJson, jsonSerialized: true }
        } catch (e) {
            if (e instanceof SyntaxError) throw e
            throw new SyntaxError(
                `Json serialization failed. Please check your body, ${targetBody}`,
                {
                    cause: [e, targetBody],
                }
            )
        }
    }

    private validateFetchOptions(options: Record<string, unknown>): void {
        for (const [key, allowedValues] of Object.entries(
            FETCH_OPTION_ALLOWED_VALUES
        )) {
            const value = options[key]
            if (value === undefined) continue
            if (
                !(allowedValues as ReadonlyArray<string>).includes(
                    value as string
                )
            )
                throw new Error(
                    `Invalid fetch option "${key}": ${JSON.stringify(value)}. Allowed: ${(allowedValues as ReadonlyArray<string>).join(', ')}`
                )
        }
    }

    private createRequest(
        queryOptions?: FetchQueryOptionsPartial<
            $PathParams,
            $SearchParams,
            $Body
        >
    ): Request {
        const optionOverrides: Partial<FetchUnitOption> = {
            ...(queryOptions?.options ?? {}),
        }
        delete (optionOverrides as Record<string, unknown>).headers
        delete (optionOverrides as Record<string, unknown>).body
        delete (optionOverrides as Record<string, unknown>).signal
        delete (optionOverrides as Record<string, unknown>).method

        this.validateFetchOptions({
            ...this.$store.options,
            ...optionOverrides,
        } as Record<string, unknown>)
        if (
            queryOptions?.timeout !== undefined &&
            !(
                typeof queryOptions.timeout === 'number' &&
                queryOptions.timeout > 0
            )
        )
            throw new Error(
                `Invalid fetch option "timeout": ${JSON.stringify(queryOptions.timeout)}. Allowed: positive number`
            )

        let body: BodyInit | null = this.$store.body
        let jsonSerialized = false
        if (queryOptions?.body !== undefined) {
            const resolvedBody = this.getValidBody(
                this.$builder.bodyValidator(queryOptions.body)
            )
            body = resolvedBody.body
            jsonSerialized = resolvedBody.jsonSerialized
        }

        // Generate headers
        const headers: Headers = new Headers(
            queryOptions?.headers
                ? {
                      ...this.$store.headers,
                      ...(queryOptions.headers as Record<string, string>),
                  }
                : this.$store.headers
        )

        // Validate headers
        if (
            (this.$builder.isJsonMode || jsonSerialized) &&
            !headers.has('Content-Type')
        ) {
            headers.set('Content-Type', 'application/json')
        }

        // Attaching signals
        const signals: AbortSignal[] = []
        if (queryOptions?.timeout) {
            signals.push(AbortSignal.timeout(queryOptions.timeout))
        }
        if (queryOptions?.signal) {
            if (Array.isArray(queryOptions.signal)) {
                signals.push(...queryOptions.signal)
            } else {
                signals.push(queryOptions.signal)
            }
        }

        // Create request
        const request: Request = new Request(
            this.getRequestURI(queryOptions?.path, queryOptions?.search),
            {
                ...this.$store.options,
                ...optionOverrides,
                headers,
                body: body,
                signal: signals.length > 0 ? AbortSignal.any(signals) : null,
            }
        )

        return this.$builder.requestHandler({
            request,
            queryOptions: queryOptions as FetchQueryOptions<
                $PathParams,
                $SearchParams,
                $Body
            >,
        })
    }

    /**
     * @description Query data
     * @param queryOptions fetch params
     */
    public async query(
        queryOptions?: FetchQueryOptions<$PathParams, $SearchParams, $Body>
    ): Promise<
        $ModeOptions['isSafeMode'] extends true
            ? $Response | undefined
            : $Response
    > {
        const fetcher = (req: Request) => fetch(req)

        let response: Response
        try {
            const request: Request = this.createRequest(queryOptions)

            response = await this.$builder.middleware.execute(request, fetcher)
            if (!response.ok) throw new FetchResponseError(response)

            const processedResponse: $Response =
                await this.$builder.responseHandler(
                    (this.$builder.isJsonMode
                        ? {
                              response,
                              json: () => response.json() as Promise<Json>,
                          }
                        : { response }) as any
                )

            return processedResponse
        } catch (error) {
            if (error instanceof FetchResponseError) {
                this.$builder.fetchErrorProcedure?.executor({
                    error,
                    status: error.response.status as FetchErrorCode,
                })
            } else {
                this.$builder.unknownErrorProcedure?.executor({ error })
            }

            if (!this.$builder.isSafeMode) throw error
        } finally {
            try {
                this.$builder.finallyProcedure.executor(
                    queryOptions as FetchQueryOptions<
                        $PathParams,
                        $SearchParams,
                        $Body
                    >
                )
            } catch (finallyError) {
                this.$builder.unknownErrorProcedure?.executor({
                    error: finallyError,
                })
            }
        }

        return undefined as $ModeOptions['isSafeMode'] extends true
            ? $Response | undefined
            : $Response
    }
}

/**
 * Fetch unit shape type
 */
export type FetchUnitShape = FetchUnit<
    FetchMethodString,
    any,
    any,
    any,
    any,
    FetchModeOptionsShape,
    string
>

export type DefaultFetchUnitShape = FetchUnit<
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
 * @description Infer fetch unit's information
 */
export type InferFetchUnit<FetchUnitTarget extends FetchUnitShape> =
    FetchUnitTarget extends FetchUnit<
        infer FetchMethod,
        infer FetchPathParams,
        infer FetchSearchParams,
        infer FetchBody,
        infer FetchResponse,
        infer FetchIsJsonMode,
        infer FetchUrl
    >
        ? OmitUnknown<{
              method: FetchMethod
              url: FetchUrl
              pathParams: FetchPathParams
              searchParams: FetchSearchParams
              body: FetchBody
              response: FetchResponse
              mode: {
                  isJson: FetchIsJsonMode['isJsonMode']
                  isSafeFetch: FetchIsJsonMode['isSafeMode']
              }
          }>
        : never
