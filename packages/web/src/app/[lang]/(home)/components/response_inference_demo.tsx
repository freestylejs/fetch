/** biome-ignore-all lint/style/useConsistentCurlyBraces: <component> */

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export const ResponseInferenceDemo = () => {
    const [step, setStep] = useState(0)

    const next = () => {
        setStep((s) => (s + 1) % 4) // 0: Idle, 1: Network, 2: Validate, 3: Type Result
    }

    return (
        <div className="grid size-full select-none grid-cols-1 gap-6 p-6 md:grid-cols-2">
            {/* Left: Process Timeline */}
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex w-full max-w-[280px] flex-col gap-4">
                    {/* Step 1: Network */}
                    <div
                        className={cn(
                            'flex items-center justify-between rounded-lg border px-4 py-3 transition-all duration-500',
                            step === 1
                                ? 'scale-105 border-blue-500 bg-blue-50 shadow-blue-500/10 shadow-md dark:border-blue-800 dark:bg-blue-900/20'
                                : step > 1
                                  ? 'border-zinc-200 bg-zinc-50 opacity-50 dark:border-zinc-800 dark:bg-zinc-900'
                                  : 'border-transparent opacity-30'
                        )}
                    >
                        <span className="font-bold text-xs uppercase tracking-wider">
                            1. Network Response
                        </span>
                        <div className="rounded bg-white px-2 py-1 font-mono text-[10px] shadow-sm dark:bg-zinc-950">
                            {`"Hello World"`}
                        </div>
                    </div>

                    {/* Step 2: Validation */}
                    <div
                        className={cn(
                            'flex items-center justify-between rounded-lg border px-4 py-3 transition-all duration-500',
                            step === 2
                                ? 'scale-105 border-purple-500 bg-purple-50 shadow-md shadow-purple-500/10 dark:border-purple-800 dark:bg-purple-900/20'
                                : step > 2
                                  ? 'border-zinc-200 bg-zinc-50 opacity-50 dark:border-zinc-800 dark:bg-zinc-900'
                                  : 'border-transparent opacity-30'
                        )}
                    >
                        <span className="font-bold text-xs uppercase tracking-wider">
                            2. Validate Schema
                        </span>
                        <div className="font-medium text-[10px] text-purple-600 dark:text-purple-400">
                            t.string.parse()
                        </div>
                    </div>

                    {/* Step 3: Inference */}
                    <div
                        className={cn(
                            'flex items-center justify-between rounded-lg border px-4 py-3 transition-all duration-500',
                            step === 3
                                ? 'scale-105 border-emerald-500 bg-emerald-50 shadow-emerald-500/10 shadow-md dark:border-emerald-800 dark:bg-emerald-900/20'
                                : 'border-transparent opacity-30'
                        )}
                    >
                        <span className="font-bold text-xs uppercase tracking-wider">
                            3. Inferred Type
                        </span>
                        <div className="rounded bg-emerald-100 px-2 py-1 font-bold text-[10px] text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                            string
                        </div>
                    </div>
                </div>

                <button
                    onClick={next}
                    className="rounded-full bg-zinc-900 px-6 py-2 font-bold text-white text-xs transition-all hover:scale-105 hover:bg-zinc-700 active:scale-95 dark:bg-zinc-100 dark:text-black"
                >
                    {step === 0
                        ? 'Start Request'
                        : step === 3
                          ? 'Reset'
                          : 'Next Step'}
                </button>
            </div>

            {/* Right: Code Sync Visual */}
            <div className="custom-scrollbar flex flex-col justify-center gap-1 overflow-auto rounded-xl border border-zinc-200 bg-zinc-900 p-4 font-mono text-xs text-zinc-400 shadow-inner dark:border-zinc-800">
                <div>
                    <span className="text-purple-400">const</span> getText =
                    f.builder()
                </div>
                <div className="pl-4">.def_json()</div>

                {/* Definition Block */}
                <div className="pl-4">
                    .def_response(<span className="text-purple-400">async</span>{' '}
                    {/* FIX: Cleaned up syntax and escaped braces correctly */}(
                    {'{'} json {'}'}) ={'>'} {'{'}
                    <div
                        className={cn(
                            'my-1 ml-1 border-l-2 pl-3 pl-4 transition-all duration-500',
                            step === 1
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-transparent'
                        )}
                    >
                        <span className="text-zinc-500">// 1. Fetch JSON</span>
                        <br />
                        <span className="text-purple-400">const</span> raw ={' '}
                        <span className="text-blue-400">await</span> json()
                    </div>
                    <div
                        className={cn(
                            'my-1 ml-1 border-l-2 pl-3 pl-4 transition-all duration-500',
                            step === 2
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-transparent'
                        )}
                    >
                        <span className="text-zinc-500">// 2. Validate</span>
                        <br />
                        <span className="text-purple-400">return</span>{' '}
                        t.string.
                        <span className="text-yellow-400">parse</span>
                        (raw)
                    </div>
                    {'}'})
                </div>
                <div className="pl-4">.build()</div>

                <br />

                {/* Usage Block */}
                <div
                    className={cn(
                        '-ml-1 border-l-2 pl-3 transition-all duration-500',
                        step === 3
                            ? 'border-emerald-500 bg-emerald-500/10 opacity-100'
                            : 'border-transparent opacity-50'
                    )}
                >
                    <span className="text-zinc-500">
                        // 3. Result is typed!
                    </span>
                    <br />
                    <span className="text-purple-400">const</span> data ={' '}
                    <span className="text-purple-400">await</span>{' '}
                    getText.query()
                    <br />
                    <span className="text-[10px] text-zinc-500 italic">
                        ^ (const) data: string
                    </span>
                </div>
            </div>
        </div>
    )
}

export const responseInferenceCode = `
const getText = f.builder()
    .def_json()
    .def_response(async ({ json }) => {
        // 1. Get raw JSON
        const raw = await json()
        
        // 2. Parse & Validate
        return t.string.parse(raw)
    })
    .build()

// 3. Result is fully typed
const data = await getText.query()
//    ^ type: string
`
