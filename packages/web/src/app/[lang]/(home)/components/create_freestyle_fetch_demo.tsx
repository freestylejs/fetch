/** biome-ignore-all lint/style/useConsistentCurlyBraces: <component> */

'use client'

import {
    CheckCircle,
    Database,
    FileCode,
    FileJson,
    ShieldCheck,
    Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { CodeBlock } from '@/components/ui'
import { cn } from '@/lib/utils'

export const createFreestyleFetchCode = `
import { createClient } from './api'

const client = createClient({
  baseUrl: 'https://api.example.com',
  auth: { bearerAuth: { token: '...' } }
})

// Fully typed request & response
const user = await client.users.$id.get({
  params: { id: '123' }
})
`

const STEPS = [
    {
        code: `// 1. Define your OpenAPI spec
// openapi.json
{
  "openapi": "3.0.0",
  "paths": {
    "/users/{id}": {
      "get": {
        "security": [{ "bearerAuth": [] }]
      }
    }
  }
}`,
        lang: 'json',
        label: 'OpenAPI Spec',
        icon: FileJson,
        color: 'orange',
    },
    {
        code: `// 2. Generate Client
// Run the CLI command
npx create-freestyle-fetch generate \\
  --input openapi.json \\
  --output src/api

// > Generating models...
// > Generating router...
// > Done!`,
        lang: 'bash',
        label: 'Generator CLI',
        icon: Zap,
        color: 'blue',
    },
    {
        code: `// 3. Enjoy Type-Safety
import { createClient } from './api'

const client = createClient({
  baseUrl: 'https://api.example.com',
  auth: { bearerAuth: { token: '...' } }
})

// Fully typed request & response
const user = await client.users.$id.get({
  params: { id: '123' }
})`,
        lang: 'ts',
        label: 'Type-Safe Client',
        icon: FileCode,
        color: 'green',
    },
]

export function CreateFreestyleFetchDemo() {
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3)
        }, 3500)
        return () => clearInterval(interval)
    }, [])

    const progressWidth =
        activeStep === 0 ? '0%' : activeStep === 1 ? '50%' : '100%'

    return (
        <div className="flex w-full flex-col gap-10 py-4">
            {/* Visual Pipeline */}
            <div className="relative mx-auto flex w-full max-w-md items-center justify-between px-4">
                {/* Connection Line Background */}
                <div className="-translate-y-1/2 absolute top-1/2 right-4 left-4 h-0.5 bg-neutral-100 dark:bg-neutral-800" />

                {/* Connection Line Progress */}
                <div
                    className="-translate-y-1/2 absolute top-1/2 left-4 h-0.5 bg-linear-to-r from-orange-500 via-blue-500 to-green-500 transition-all duration-1000 ease-in-out"
                    style={{ width: `calc(${progressWidth} - 2rem)` }}
                />

                {/* Step 1: Spec */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div
                        className={cn(
                            'flex size-14 items-center justify-center rounded-2xl border-2 bg-white shadow-sm transition-all duration-500 dark:bg-neutral-900',
                            activeStep >= 0
                                ? 'scale-110 border-orange-500 text-orange-500 ring-4 ring-orange-500/10'
                                : 'border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-700'
                        )}
                    >
                        <FileJson className="size-6" />
                    </div>
                    <div
                        className={cn(
                            '-bottom-8 absolute whitespace-nowrap font-semibold text-xs transition-all duration-500',
                            activeStep >= 0
                                ? 'translate-y-0 text-orange-600 opacity-100'
                                : '-translate-y-2 text-neutral-400 opacity-0'
                        )}
                    >
                        OpenAPI Spec
                    </div>
                </div>

                {/* Step 2: CLI */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div
                        className={cn(
                            'flex size-14 items-center justify-center rounded-2xl border-2 bg-white shadow-sm transition-all duration-500 dark:bg-neutral-900',
                            activeStep >= 1
                                ? 'scale-110 border-blue-500 text-blue-500 ring-4 ring-blue-500/10'
                                : 'border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-700'
                        )}
                    >
                        <Zap
                            className={cn(
                                'size-6',
                                activeStep === 1 && 'fill-current'
                            )}
                        />
                    </div>
                    <div
                        className={cn(
                            '-bottom-8 absolute whitespace-nowrap font-semibold text-xs transition-all duration-500',
                            activeStep >= 1
                                ? 'translate-y-0 text-blue-600 opacity-100'
                                : '-translate-y-2 text-neutral-400 opacity-0'
                        )}
                    >
                        Generator CLI
                    </div>
                </div>

                {/* Step 3: Result */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div
                        className={cn(
                            'flex size-14 items-center justify-center rounded-2xl border-2 bg-white shadow-sm transition-all duration-500 dark:bg-neutral-900',
                            activeStep >= 2
                                ? 'scale-110 border-green-500 text-green-500 ring-4 ring-green-500/10'
                                : 'border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-700'
                        )}
                    >
                        <FileCode className="size-6" />
                    </div>
                    <div
                        className={cn(
                            '-bottom-8 absolute whitespace-nowrap font-semibold text-xs transition-all duration-500',
                            activeStep >= 2
                                ? 'translate-y-0 text-green-600 opacity-100'
                                : '-translate-y-2 text-neutral-400 opacity-0'
                        )}
                    >
                        Type-Safe Client
                    </div>
                </div>
            </div>

            {/* Embedded Code Viewer */}
            <div className="mx-auto mt-10 w-full max-w-md overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
                <div className="flex items-center gap-2 border-neutral-200 border-b bg-white/50 px-3 py-2 dark:border-neutral-800 dark:bg-white/5">
                    <div
                        className={cn(
                            'size-2 rounded-full',
                            activeStep === 0
                                ? 'bg-orange-500'
                                : activeStep === 1
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                        )}
                    />
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                        {STEPS[activeStep].label}
                    </span>
                </div>
                <div className="p-3">
                    <CodeBlock
                        code={STEPS[activeStep].code}
                        lang={STEPS[activeStep].lang}
                    ></CodeBlock>
                </div>
            </div>

            {/* Dynamic Feature Highlights */}
            <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3">
                {[
                    {
                        label: 'Type-Safe Router',
                        desc: 'Autocomplete paths',
                        icon: Database,
                        color: 'text-blue-500',
                        show: activeStep >= 2,
                    },
                    {
                        label: 'Zod Validation',
                        desc: 'Runtime safety',
                        icon: CheckCircle,
                        color: 'text-purple-500',
                        show: activeStep >= 2,
                    },
                    {
                        label: 'Auth Middleware',
                        desc: 'Secure by default',
                        icon: ShieldCheck,
                        color: 'text-orange-500',
                        show: activeStep >= 2,
                    },
                    {
                        label: 'Zero Boilerplate',
                        desc: 'Just import & use',
                        icon: Zap,
                        color: 'text-yellow-500',
                        show: activeStep >= 2,
                    },
                ].map((feature, i) => (
                    <div
                        key={feature.label}
                        className={cn(
                            'flex items-start gap-3 rounded-xl border p-3 transition-all duration-500',
                            feature.show
                                ? 'translate-y-0 border-neutral-200 bg-white opacity-100 shadow-sm dark:border-neutral-800 dark:bg-neutral-900'
                                : 'translate-y-4 border-transparent bg-transparent opacity-0'
                        )}
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <div
                            className={cn(
                                'rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800',
                                feature.color
                            )}
                        >
                            <feature.icon className="size-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-neutral-900 text-xs dark:text-neutral-100">
                                {feature.label}
                            </span>
                            <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                                {feature.desc}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
