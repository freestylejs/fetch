// biome-ignore format: manual indentation needed for code preview

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export const MiddlewareDemo = () => {
    const [stage, setStage] = useState(0)

    // 0: Idle
    // 1: Auth Request
    // 2: Log Request
    // 3: Server
    // 4: Log Response
    // 5: Auth Response
    // 6: Complete (Wait state)

    const run = () => {
        setStage(1)
        setTimeout(() => setStage(2), 800)
        setTimeout(() => setStage(3), 1600)
        setTimeout(() => setStage(4), 2400)
        setTimeout(() => setStage(5), 3200)
        setTimeout(() => setStage(6), 4000)
        setTimeout(() => setStage(0), 6000) // Reset after 2s wait
    }

    return (
        <div className="grid size-full grid-cols-1 gap-6 p-6 md:grid-cols-2 select-none">
            {/* Left: Pipeline Visual */}
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="relative flex items-center gap-4">
                    {/* Client */}
                    <div className="flex flex-col items-center gap-2">
                        <div
                            className={cn(
                                'rounded-lg border p-2 shadow-sm transition-colors duration-300',
                                stage === 0 || stage === 6
                                    ? 'border-blue-500 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                                    : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                            )}
                        >
                            <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            Client
                        </div>
                    </div>

                    {/* Pipeline */}
                    <div className="relative flex w-48 items-center justify-center gap-1 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 p-2 dark:border-zinc-800 dark:bg-zinc-900/20">
                        {/* The traveling dot */}
                        <div
                            className={cn(
                                'absolute h-2 w-2 rounded-full shadow-lg transition-all duration-700',
                                stage === 0
                                    ? 'left-2 opacity-0'
                                    : stage === 1
                                      ? 'left-[30%] bg-blue-500 shadow-blue-500/50 scale-125 opacity-100'
                                      : stage === 2
                                        ? 'left-[70%] bg-emerald-500 shadow-emerald-500/50 scale-125 opacity-100'
                                        : stage === 3
                                          ? 'left-[95%] bg-zinc-500 opacity-0'
                                          : stage === 4
                                            ? 'left-[70%] bg-emerald-500 shadow-emerald-500/50 scale-125 opacity-100'
                                            : // Returning
                                              stage === 5
                                              ? 'left-[30%] bg-blue-500 shadow-blue-500/50 scale-125 opacity-100'
                                              : stage === 6
                                                ? 'left-2 bg-zinc-500 opacity-0'
                                                : // Disappear at client
                                                  'left-2 opacity-0'
                            )}
                        />

                        <div
                            className={cn(
                                'z-10 flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-lg border bg-white shadow-sm transition-all duration-300 dark:bg-zinc-900',
                                stage === 1
                                    ? 'border-blue-500 shadow-blue-500/20 scale-110'
                                    : stage === 5
                                      ? 'border-blue-500 shadow-blue-500/20 scale-110'
                                      : 'border-zinc-200 dark:border-zinc-800'
                            )}
                        >
                            <span className="text-[8px] font-bold text-zinc-500">
                                AUTH
                            </span>
                        </div>
                        <div className="h-0.5 w-8 bg-zinc-200 dark:bg-zinc-800" />
                        <div
                            className={cn(
                                'z-10 flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-lg border bg-white shadow-sm transition-all duration-300 dark:bg-zinc-900',
                                stage === 2
                                    ? 'border-emerald-500 shadow-emerald-500/20 scale-110'
                                    : stage === 4
                                      ? 'border-emerald-500 shadow-emerald-500/20 scale-110'
                                      : 'border-zinc-200 dark:border-zinc-800'
                            )}
                        >
                            <span className="text-[8px] font-bold text-zinc-500">
                                LOG
                            </span>
                        </div>
                    </div>

                    {/* Server */}
                    <div className="flex flex-col items-center gap-2">
                        <div
                            className={cn(
                                'rounded-lg border p-2 shadow-sm transition-colors duration-300',
                                stage === 3
                                    ? 'border-amber-500 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20'
                                    : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                            )}
                        >
                            <div className="size-8 rounded bg-zinc-100 dark:bg-zinc-800" />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            Server
                        </div>
                    </div>
                </div>

                <div className="h-6">
                    <span
                        className={cn(
                            'text-xs font-medium transition-all duration-300',
                            stage === 1
                                ? 'text-blue-500 opacity-100'
                                : 'opacity-0 absolute'
                        )}
                    >
                        → Request Phase: Add Headers
                    </span>
                    <span
                        className={cn(
                            'text-xs font-medium transition-all duration-300',
                            stage === 2
                                ? 'text-emerald-500 opacity-100'
                                : 'opacity-0 absolute'
                        )}
                    >
                        → Request Phase: Log Start
                    </span>
                    <span
                        className={cn(
                            'text-xs font-medium transition-all duration-300',
                            stage === 3
                                ? 'text-amber-500 opacity-100'
                                : 'opacity-0 absolute'
                        )}
                    >
                        Processing...
                    </span>
                    <span
                        className={cn(
                            'text-xs font-medium transition-all duration-300',
                            stage === 4
                                ? 'text-emerald-500 opacity-100'
                                : 'opacity-0 absolute'
                        )}
                    >
                        ← Response Phase: Log End
                    </span>
                    <span
                        className={cn(
                            'text-xs font-medium transition-all duration-300',
                            stage === 5
                                ? 'text-blue-500 opacity-100'
                                : 'opacity-0 absolute'
                        )}
                    >
                        ← Response Phase: Verify
                    </span>
                    <span
                        className={cn(
                            'text-xs font-medium text-green-500 transition-all duration-300',
                            stage === 6 ? 'opacity-100' : 'opacity-0 absolute'
                        )}
                    >
                        ✓ Request Complete
                    </span>
                </div>

                <button
                    onClick={run}
                    disabled={stage !== 0}
                    className="rounded-full bg-zinc-900 px-6 py-2 text-xs font-bold text-white transition-all hover:scale-105 hover:bg-zinc-700 disabled:scale-100 disabled:opacity-50 dark:bg-zinc-100 dark:text-black"
                >
                    {stage === 0
                        ? 'Execute Request'
                        : stage === 6
                          ? 'Done'
                          : 'Running Pipeline...'}
                </button>
            </div>

            {/* Right: Code Sync Visual */}
            <div className="flex flex-col justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-900 p-4 font-mono text-xs text-zinc-400 shadow-inner dark:border-zinc-800 no-scrollbar overflow-auto max-h-[320px] custom-scrollbar">
                <div className="pt-10">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-400">middleware</span> ={' '}
                    <span className="text-zinc-100">new f.Middleware()</span>
                </div>
                <br />
                <div>
                    <span className="text-zinc-500">// 1. Auth Middleware</span>
                </div>
                <div
                    className={cn(
                        'transition-opacity duration-300',
                        stage === 1 || stage === 5
                            ? 'opacity-100 bg-blue-500/10 -mx-2 px-2 rounded'
                            : 'opacity-40'
                    )}
                >
                    <span className="text-blue-400">middleware</span>.
                    <span className="text-yellow-400">use</span>(
                    <span className="text-purple-400">async</span> (req, next) =
                    {'>'}
                    <div
                        className={cn(
                            'pl-4 transition-colors duration-300',
                            stage === 1 && 'text-blue-300 font-bold'
                        )}
                    >
                        req.headers.set(...){' '}
                        <span className="text-zinc-500">// → Request</span>
                    </div>
                    <div className="pl-4">
                        <span className="text-purple-400">const</span> res ={' '}
                        <span className="text-purple-400">await</span> next(req)
                    </div>
                    <div
                        className={cn(
                            'pl-4 transition-colors duration-300',
                            stage === 5 && 'text-blue-300 font-bold'
                        )}
                    >
                        <span className="text-purple-400">return</span> res{' '}
                        <span className="text-zinc-500">// ← Response</span>
                    </div>
                    {'}'}
                </div>

                <br />

                <div>
                    <span className="text-zinc-500">
                        // 2. Logging Middleware
                    </span>
                </div>
                <div
                    className={cn(
                        'transition-opacity duration-300',
                        stage === 2 || stage === 4
                            ? 'opacity-100 bg-emerald-500/10 -mx-2 px-2 rounded'
                            : 'opacity-40'
                    )}
                >
                    <span className="text-blue-400">middleware</span>.
                    <span className="text-yellow-400">use</span>(
                    <span className="text-purple-400">async</span> (req, next) =
                    {'>'}
                    <div
                        className={cn(
                            'pl-4 transition-colors duration-300',
                            stage === 2 && 'text-emerald-300 font-bold'
                        )}
                    >
                        console.log('Start'){' '}
                        <span className="text-zinc-500">// → Request</span>
                    </div>
                    <div className="pl-4">
                        <span className="text-purple-400">const</span> res ={' '}
                        <span className="text-purple-400">await</span> next(req)
                    </div>
                    <div
                        className={cn(
                            'pl-4 transition-colors duration-300',
                            stage === 4 && 'text-emerald-300 font-bold'
                        )}
                    >
                        console.log('End'){' '}
                        <span className="text-zinc-500">// ← Response</span>
                    </div>
                    <div className="pl-4">
                        <span className="text-purple-400">return</span> res
                    </div>
                    {'}'}
                </div>
            </div>
        </div>
    )
}

export const middlewareCode = `
const mw = new f.Middleware()

// 1. Auth
mw.use(async (req, next) => {
    req.headers.set('Auth', '...')
    const res = await next(req)
    // Response verification
    return res
})

// 2. Logger
mw.use(async (req, next) => {
    console.log('Req')
    const res = await next(req)
    console.log('Res')
    return res
})
`
