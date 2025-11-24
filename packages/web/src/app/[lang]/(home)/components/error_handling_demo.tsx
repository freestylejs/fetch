// biome-ignore format: manual indentation needed for code preview

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export const ErrorHandlingDemo = () => {
    const [responseType, setResponseType] = useState<'200' | '404' | '500'>(
        '200'
    )
    const [activeBlock, setActiveBlock] = useState<
        'none' | 'request' | 'error' | 'success' | 'finally'
    >('none')
    const [log, setLog] = useState<string[]>([])

    const execute = async () => {
        setLog([])
        setActiveBlock('request')
        addLog('Sending Request...')

        await new Promise((r) => setTimeout(r, 600))

        if (responseType === '200') {
            setActiveBlock('success')
            addLog('✓ Status 200 OK')
        } else {
            setActiveBlock('error')
            addLog(`⚠ Error: ${responseType}`)
            addLog(`Handling ${responseType}...`)
        }

        await new Promise((r) => setTimeout(r, 800))

        setActiveBlock('finally')
        addLog('ℹ Finally Block Executed')

        await new Promise((r) => setTimeout(r, 800))
        setActiveBlock('none')
    }

    const addLog = (msg: string) => setLog((prev) => [...prev, msg])

    return (
        <div className="grid size-full grid-cols-1 gap-6 p-6 md:grid-cols-2 select-none">
            {/* Left: Interactive Control */}
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex flex-col gap-2 items-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Server Simulation
                    </div>
                    <div className="flex overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
                        <button
                            onClick={() => setResponseType('200')}
                            className={cn(
                                'px-4 py-1.5 text-xs font-medium transition-colors',
                                responseType === '200'
                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            )}
                        >
                            200 OK
                        </button>
                        <div className="w-px bg-zinc-200 dark:bg-zinc-700"></div>
                        <button
                            onClick={() => setResponseType('404')}
                            className={cn(
                                'px-4 py-1.5 text-xs font-medium transition-colors',
                                responseType === '404'
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            )}
                        >
                            404
                        </button>
                        <div className="w-px bg-zinc-200 dark:bg-zinc-700"></div>
                        <button
                            onClick={() => setResponseType('500')}
                            className={cn(
                                'px-4 py-1.5 text-xs font-medium transition-colors',
                                responseType === '500'
                                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            )}
                        >
                            500
                        </button>
                    </div>
                </div>

                <div className="flex h-32 w-full max-w-[280px] flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 font-mono text-[10px] dark:border-zinc-800 dark:bg-black/20">
                    <div className="text-zinc-400 uppercase tracking-wider">
                        Console Output
                    </div>
                    <div className="flex flex-col gap-1">
                        {log.map((l, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'animate-in fade-in slide-in-from-left-2',
                                    l.includes('✓')
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : l.includes('⚠')
                                          ? 'text-amber-600 dark:text-amber-400'
                                          : 'text-zinc-600 dark:text-zinc-400'
                                )}
                            >
                                {l}
                            </div>
                        ))}
                        {log.length === 0 && (
                            <div className="text-zinc-300 dark:text-zinc-700 italic">
                                Waiting for execution...
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={execute}
                    disabled={activeBlock !== 'none'}
                    className="rounded-full bg-zinc-900 px-6 py-2 text-xs font-bold text-white transition-all hover:scale-105 hover:bg-zinc-700 disabled:scale-100 disabled:opacity-50 dark:bg-zinc-100 dark:text-black"
                >
                    {activeBlock === 'none' ? 'Execute Request' : 'Running...'}
                </button>
            </div>

            {/* Right: Code Sync */}
            <div className="flex flex-col justify-center gap-1 rounded-xl border border-zinc-200 bg-zinc-900 p-4 font-mono text-xs text-zinc-400 shadow-inner dark:border-zinc-800 overflow-auto custom-scrollbar">
                <div>
                    <span className="text-purple-400">const</span> request =
                    f.builder()
                </div>
                <div className="pl-4">.def_url('/api')</div>

                {/* Request Handler */}
                <div
                    className={cn(
                        'pl-4 transition-all duration-300 rounded px-2 -mx-2',
                        activeBlock === 'request'
                            ? 'bg-blue-500/20 text-blue-200'
                            : 'opacity-50'
                    )}
                >
                    .def_request_handler(req ={'>'} req)
                </div>

                {/* Success Handler */}
                <div
                    className={cn(
                        'pl-4 transition-all duration-300 rounded px-2 -mx-2',
                        activeBlock === 'success'
                            ? 'bg-emerald-500/20 text-emerald-200'
                            : 'opacity-50'
                    )}
                >
                    .def_response(res ={'>'}{' '}
                    <span className="text-zinc-500">// 200 OK</span> {'}'})
                </div>

                {/* Error Handler */}
                <div
                    className={cn(
                        'pl-4 transition-all duration-300 rounded px-2 -mx-2',
                        activeBlock === 'error'
                            ? 'bg-amber-500/20 text-amber-200'
                            : 'opacity-50'
                    )}
                >
                    .def_fetch_err_handler(({`{`}status{`}`}) ={'>'}{' '}
                    {
                        <div className="pl-4">
                            <span className="text-purple-400">if</span> (status
                            !== 200) log('Error')
                        </div>
                    }
                </div>

                {/* Finally Handler */}
                <div
                    className={cn(
                        'pl-4 transition-all duration-300 rounded px-2 -mx-2',
                        activeBlock === 'finally'
                            ? 'bg-zinc-500/20 text-zinc-100'
                            : 'opacity-50'
                    )}
                >
                    .def_final_handler(() = {'>'}{' '}
                    {<div className="pl-4">log('Finally')</div>}
                </div>

                <div>.build()</div>
            </div>
        </div>
    )
}

export const errorHandlingCode = `
const request = f.builder()
    .def_url('/api')
    // 1. Handle HTTP Errors (4xx, 5xx)
    .def_fetch_err_handler(({ status }) => {
        console.error('HTTP Error:', status)
    })
    // 2. Cleanup
    .def_final_handler(() => {
        console.log('Always executed')
    })
    .build()
`
