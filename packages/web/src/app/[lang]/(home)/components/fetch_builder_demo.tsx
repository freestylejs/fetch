/** biome-ignore-all lint/style/useConsistentCurlyBraces: <component> */

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export const FetchBuilderDemo = () => {
    const [config, setConfig] = useState<{
        method: 'GET' | 'POST'
        url: boolean
        json: boolean
        built: boolean
    }>({
        method: 'GET',
        url: false,
        json: false,
        built: false,
    })

    const [id, setId] = useState('123')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

    const handleSend = () => {
        setStatus('loading')
        setTimeout(() => setStatus('success'), 800)
        setTimeout(() => {
            setStatus('idle')
            // Reset demo after success
            setTimeout(() => {
                setConfig({
                    method: 'GET',
                    url: false,
                    json: false,
                    built: false,
                })
                setId('123')
            }, 1000)
        }, 2000)
    }

    return (
        <div className="grid size-full select-none grid-cols-1 gap-6 p-6 md:grid-cols-2">
            {/* Left: Interactive Builder Config */}
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex flex-col gap-3">
                    <div className="font-bold text-[10px] text-zinc-400 uppercase tracking-wider">
                        Configure Builder
                    </div>
                    <div className="flex w-60 flex-col gap-2">
                        {/* 1. Method */}
                        <button
                            disabled={config.built}
                            onClick={() =>
                                setConfig((p) => ({
                                    ...p,
                                    method: p.method === 'GET' ? 'POST' : 'GET',
                                }))
                            }
                            className={cn(
                                'flex items-center justify-between rounded-lg border px-3 py-2 font-medium text-xs transition-all',
                                config.built
                                    ? 'opacity-50'
                                    : 'hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                                'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                            )}
                        >
                            <span>HTTP Method</span>
                            <span className="font-mono text-blue-500">
                                {config.method}
                            </span>
                        </button>

                        {/* 2. URL */}
                        <button
                            disabled={config.built}
                            onClick={() =>
                                setConfig((p) => ({ ...p, url: !p.url }))
                            }
                            className={cn(
                                'flex items-center justify-between rounded-lg border px-3 py-2 font-medium text-xs transition-all',
                                config.url
                                    ? 'border-amber-500 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20'
                                    : config.built
                                      ? 'opacity-50'
                                      : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900'
                            )}
                        >
                            <span>Add Dynamic URL</span>
                            <span
                                className={cn(
                                    'font-mono',
                                    config.url
                                        ? 'text-amber-600'
                                        : 'text-zinc-400'
                                )}
                            >
                                {config.url ? '/users/$id' : '(none)'}
                            </span>
                        </button>

                        {/* 3. JSON */}
                        <button
                            disabled={config.built}
                            onClick={() =>
                                setConfig((p) => ({ ...p, json: !p.json }))
                            }
                            className={cn(
                                'flex items-center justify-between rounded-lg border px-3 py-2 font-medium text-xs transition-all',
                                config.json
                                    ? 'border-purple-500 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20'
                                    : config.built
                                      ? 'opacity-50'
                                      : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900'
                            )}
                        >
                            <span>Enable JSON Mode</span>
                            <span
                                className={cn(
                                    'font-mono',
                                    config.json
                                        ? 'text-purple-600'
                                        : 'text-zinc-400'
                                )}
                            >
                                {config.json ? 'true' : 'false'}
                            </span>
                        </button>

                        {/* 4. Build */}
                        <button
                            onClick={() =>
                                setConfig((p) => ({ ...p, built: !p.built }))
                            }
                            className={cn(
                                'mt-2 rounded-lg px-3 py-2 font-bold text-white text-xs transition-all',
                                config.built
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black'
                            )}
                        >
                            {config.built ? 'Reset Builder' : 'Build Unit'}
                        </button>
                    </div>
                </div>

                {/* Execution Control */}
                <div
                    className={cn(
                        'flex w-60 flex-col gap-3 transition-all duration-500',
                        config.built
                            ? 'translate-y-0 opacity-100'
                            : 'pointer-events-none translate-y-4 opacity-0'
                    )}
                >
                    <div className="font-bold text-[10px] text-zinc-400 uppercase tracking-wider">
                        Execute Request
                    </div>

                    {config.url && (
                        <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                            <span className="font-mono text-amber-500 text-xs">
                                id:
                            </span>
                            <input
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="w-full bg-transparent font-mono text-sm text-zinc-700 outline-none dark:text-zinc-200"
                                spellCheck={false}
                            />
                        </div>
                    )}

                    <button
                        onClick={handleSend}
                        disabled={status === 'loading'}
                        className={cn(
                            'flex items-center justify-center rounded-lg py-2 font-bold text-xs transition-all',
                            status === 'success'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        )}
                    >
                        {status === 'loading'
                            ? 'Sending...'
                            : status === 'success'
                              ? 'Sent!'
                              : '.query()'}
                    </button>
                </div>
            </div>

            {/* Right: Live Code Generation */}
            <div className="custom-scrollbar flex flex-col justify-center gap-1 overflow-auto rounded-xl border border-zinc-200 bg-zinc-900 p-4 font-mono text-xs text-zinc-400 shadow-inner dark:border-zinc-800">
                <div>
                    <span className="text-purple-400">const</span> getUser =
                    f.builder()
                </div>

                {/* Method */}
                <div
                    className={cn(
                        'pl-4 transition-all duration-300',
                        config.method === 'POST' ? 'text-blue-300' : ''
                    )}
                >
                    .def_method(
                    <span className="text-green-400">'{config.method}'</span>)
                </div>

                {/* URL */}
                {config.url && (
                    <div className="fade-in slide-in-from-left-2 animate-in pl-4">
                        .def_url(
                        <span className="text-green-400">
                            "https://api/users/
                            <span className="text-amber-400">$id</span>"
                        </span>
                        )
                    </div>
                )}

                {/* JSON */}
                {config.json && (
                    <div className="fade-in slide-in-from-left-2 animate-in pl-4">
                        .def_json()
                    </div>
                )}

                {/* Build */}
                {config.built && (
                    <div className="fade-in slide-in-from-left-2 animate-in pl-4 font-bold text-zinc-100">
                        .build()
                    </div>
                )}

                <br />

                {/* Usage */}
                <div
                    className={cn(
                        'transition-all duration-500',
                        config.built
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-4 opacity-0'
                    )}
                >
                    <div>
                        <span className="text-purple-400">await</span>{' '}
                        {/* Improved: Added ({ for visual accuracy when URL is active */}
                        getUser.query{config.url ? '({' : '()'}
                    </div>
                    {config.url && (
                        <>
                            <div className="pl-4">
                                {/* FIX: Escaped the opening curly brace to prevent syntax error */}
                                path: {'{'}
                                <span className="text-amber-400">id</span>:{' '}
                                <span className="text-green-400">"{id}"</span>{' '}
                                {'}'}
                            </div>
                            <div>{'}'})</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export const fetchBuilderCode = `
// 1. Interactive Construction
const getUser = f.builder()
    .def_method('GET')
    .def_url('https://api/users/$id')
    .def_json()
    .build()

// 2. Type-Safe Execution
await getUser.query({
    path: { id: '123' }
})
`
