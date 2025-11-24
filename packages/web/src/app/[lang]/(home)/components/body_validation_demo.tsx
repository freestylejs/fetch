/** biome-ignore-all lint/style/useConsistentCurlyBraces: <component> */

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export const BodyValidationDemo = () => {
    const [name, setName] = useState('Alice')
    const [age, setAge] = useState('30')
    const [status, setStatus] = useState<
        'idle' | 'checking' | 'valid' | 'invalid'
    >('idle')

    const isValidName = name.length > 0
    const isValidAge = !isNaN(Number(age)) && age.length > 0

    const checkType = () => {
        setStatus('checking')
        setTimeout(() => {
            if (isValidName && isValidAge) {
                setStatus('valid')
                setTimeout(() => setStatus('idle'), 2000)
            } else {
                setStatus('invalid')
                setTimeout(() => setStatus('idle'), 2000)
            }
        }, 600)
    }

    return (
        <div className="grid size-full select-none grid-cols-1 gap-6 p-6 md:grid-cols-2">
            {/* Left: Input Form */}
            <div className="flex flex-col items-center justify-center gap-6">
                <div
                    className={cn(
                        'relative flex w-full max-w-[280px] flex-col gap-4 rounded-xl border p-5 shadow-sm transition-all duration-300',
                        status === 'invalid'
                            ? 'border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-900/20'
                            : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                    )}
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="font-bold text-[10px] text-zinc-400 uppercase">
                                body.name
                            </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={cn(
                                    'rounded-md border px-2 py-1 text-sm outline-none transition-colors',
                                    status === 'invalid' && !isValidName
                                        ? 'border-red-400 bg-red-100/50'
                                        : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black/20'
                                )}
                                placeholder="Enter string..."
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold text-[10px] text-zinc-400 uppercase">
                                body.age
                            </label>
                            <input
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className={cn(
                                    'rounded-md border px-2 py-1 text-sm outline-none transition-colors',
                                    status === 'invalid' && !isValidAge
                                        ? 'border-red-400 bg-red-100/50'
                                        : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black/20'
                                )}
                                placeholder="Enter number..."
                            />
                        </div>
                    </div>

                    <button
                        onClick={checkType}
                        disabled={status === 'checking'}
                        className={cn(
                            'mt-1 flex items-center justify-center rounded-lg py-2 font-bold text-sm transition-all duration-300',
                            status === 'valid'
                                ? 'bg-emerald-500 text-white'
                                : status === 'invalid'
                                  ? 'bg-red-500 text-white'
                                  : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900'
                        )}
                    >
                        {status === 'checking'
                            ? 'Validating...'
                            : status === 'valid'
                              ? 'Valid Payload'
                              : status === 'invalid'
                                ? 'Invalid Payload'
                                : 'Send Request'}
                    </button>
                </div>
            </div>

            {/* Right: Code Sync Visual */}
            <div className="custom-scrollbar flex flex-col justify-center gap-1 overflow-auto rounded-xl border border-zinc-200 bg-zinc-900 p-4 font-mono text-xs text-zinc-400 shadow-inner dark:border-zinc-800">
                <div>
                    <span className="text-purple-400">const</span> createUser =
                    f.builder()
                </div>

                {/* Validator Def */}
                <div className="pl-4">
                    .def_body(
                    {/* FIX: Escaped open curly brace */}
                    <div className="pl-4 text-zinc-300">t.object({'{'}</div>
                    <div
                        className={cn(
                            'pl-8 transition-all duration-300',
                            status === 'checking' ||
                                status === 'valid' ||
                                (status === 'invalid' && !isValidName)
                                ? 'origin-left scale-105 font-bold text-blue-300'
                                : 'text-zinc-500'
                        )}
                    >
                        name: <span className="text-blue-400">t.string</span>,
                    </div>
                    <div
                        className={cn(
                            'pl-8 transition-all duration-300',
                            status === 'checking' ||
                                status === 'valid' ||
                                (status === 'invalid' && !isValidAge)
                                ? 'origin-left scale-105 font-bold text-blue-300'
                                : 'text-zinc-500'
                        )}
                    >
                        age: <span className="text-blue-400">t.number</span>
                    </div>
                    <div className="pl-4 text-zinc-300">
                        {'}'}).<span className="text-yellow-400">parse</span>
                    </div>
                    )
                </div>
                <div className="pl-4">.build()</div>

                <br />

                {/* Runtime Check */}
                <div
                    className={cn(
                        'transition-opacity duration-300',
                        status !== 'idle' ? 'opacity-100' : 'opacity-40'
                    )}
                >
                    <div className="text-zinc-500">// Runtime Execution</div>
                    <div>
                        <span className="text-purple-400">await</span>{' '}
                        {/* FIX: Escaped open curly brace */}
                        createUser.query({'{'}
                    </div>
                    {/* FIX: Escaped open curly brace */}
                    <div className="pl-4">body: {'{'}</div>
                    <div
                        className={cn(
                            'pl-8 transition-colors duration-300',
                            status === 'invalid' && !isValidName
                                ? 'text-red-400'
                                : status === 'valid'
                                  ? 'text-emerald-400'
                                  : 'text-zinc-300'
                        )}
                    >
                        name: "{name}",
                    </div>
                    <div
                        className={cn(
                            'pl-8 transition-colors duration-300',
                            status === 'invalid' && !isValidAge
                                ? 'text-red-400'
                                : status === 'valid'
                                  ? 'text-emerald-400'
                                  : 'text-zinc-300'
                        )}
                    >
                        age: {age || 'undefined'}
                    </div>
                    <div className="pl-4">{'}'}</div>
                    <div>{'}'})</div>
                </div>
            </div>
        </div>
    )
}

export const bodyValidationCode = `
const createUser = f.builder()
    .def_body(
        // Pass the .parse function directly
        t.object({
            name: t.string,
            age: t.number
        }).parse
    )
    .build()

// TypeScript & Runtime validation active!
await createUser.query({
    body: {
        name: 'Alice',
        age: 30
    }
})
`
