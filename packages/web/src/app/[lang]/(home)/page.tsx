import { Banner } from '@/components/banner'
import { CONFIG } from '@/constant/config'
import {
    BodyValidationDemo,
    bodyValidationCode,
    ErrorHandlingDemo,
    errorHandlingCode,
    FeatureCard,
    FetchBuilderDemo,
    fetchBuilderCode,
    MiddlewareDemo,
    middlewareCode,
    ResponseInferenceDemo,
    RouterDemo,
    responseInferenceCode,
    routerCode,
} from './components'

export default function HomePage() {
    return (
        <main className="flex size-full flex-col gap-y-12 overflow-x-hidden px-4 py-12">
            <Banner
                noAnimation={false}
                title="Fetch."
                description="Type-Safe, Fluent HTTP Client."
                subDescription="Build requests with confidence. Infer types automatically. Zero runtime surprises."
                linkDescription="→ Get started"
                linkUrl={`/${CONFIG.majorLang}/docs`}
            />

            <div className="mt-16 grid size-full grid-cols-1 gap-6 lg:grid-cols-2">
                <FeatureCard
                    title="Fluent Builder Pattern"
                    description="Construct immutable requests with a chainable API. TypeScript infers required parameters like dynamic paths automatically."
                    link={`/${CONFIG.majorLang}/docs/fetch/core-api/builder`}
                    code={fetchBuilderCode}
                >
                    <FetchBuilderDemo />
                </FeatureCard>

                <FeatureCard
                    title="Structured Router"
                    description="Organize your API into a type-safe, tree-like structure. Enjoy autocomplete for every endpoint and dynamic path parameter."
                    link={`/${CONFIG.majorLang}/docs/fetch/core-api/router`}
                    code={routerCode}
                >
                    <RouterDemo />
                </FeatureCard>

                <FeatureCard
                    title="Input Validation"
                    description="Enforce request body structures at compile time. The query method becomes type-safe based on your schema definition."
                    link={`/${CONFIG.majorLang}/docs/fetch/core-api/builder#data-validation--transformation`}
                    code={bodyValidationCode}
                >
                    <BodyValidationDemo />
                </FeatureCard>

                <FeatureCard
                    title="Response Inference"
                    description="Automatically infer the return type of your request. Validate the server response at runtime and get typed data back."
                    link={`/${CONFIG.majorLang}/docs/fetch/core-api/builder#data-validation--transformation`}
                    code={responseInferenceCode}
                >
                    <ResponseInferenceDemo />
                </FeatureCard>

                <FeatureCard
                    title="Middleware Pipeline"
                    description="Intercept requests and responses with a reusable middleware stack. Add authentication, logging, or error handling globally."
                    link={`/${CONFIG.majorLang}/docs/fetch/core-api/middleware`}
                    code={middlewareCode}
                >
                    <MiddlewareDemo />
                </FeatureCard>

                <FeatureCard
                    title="Lifecycle Hooks"
                    description="Handle errors and lifecycle events gracefully. Isolate error logic from business logic using dedicated handlers."
                    link={`/${CONFIG.majorLang}/docs/fetch/core-api/error-handling`}
                    code={errorHandlingCode}
                >
                    <ErrorHandlingDemo />
                </FeatureCard>
            </div>
        </main>
    )
}
