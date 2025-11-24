// biome-ignore format: manual indentation needed for code preview

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export const RouterDemo = () => {
    const [activePath, setActivePath] = useState<string[]>([])
    const [hovered, setHovered] = useState<string | null>(null)

    const isPathActive = (segment: string) => activePath.includes(segment)
    const isHovered = (segment: string) => hovered === segment

    const handleSegmentClick = (path: string[]) => {
        setActivePath(path)
    }

    // Helper to render the inner builder code
    const BuilderCode = () => (
        <span className="text-zinc-400">
            f.
            <span className="text-purple-500 dark:text-purple-400">
                builder
            </span>
            ().<span className="text-blue-500 dark:text-blue-400">build</span>()
        </span>
    )

    return (
        <div className="flex size-full flex-col items-center justify-center gap-6 p-6 select-none">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {/* Left: Router Definition (Interactive Code) */}
                <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white/50 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 h-[320px] overflow-y-auto custom-scrollbar">
                    <div className="mb-1 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                        1. Define Router
                    </div>
                    <div className="font-mono text-xs leading-relaxed cursor-default">
                        <div>
                            <span className="text-purple-600 dark:text-purple-500">
                                const
                            </span>{' '}
                            <span className="text-blue-600 dark:text-blue-400">
                                api
                            </span>{' '}
                            = <span className="text-zinc-500">f.router(</span>
                            {/* FIX: Escaped curly brace correctly */}
                            BASE, {'{'}
                        </div>

                        {/* auth */}
                        <div className="pl-4">
                            <span
                                className={cn(
                                    'cursor-pointer transition-colors duration-200',
                                    isPathActive('auth')
                                        ? 'text-zinc-900 font-bold dark:text-zinc-100'
                                        : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300',
                                    isHovered('auth') &&
                                        'underline decoration-zinc-400 underline-offset-2'
                                )}
                                onClick={() => handleSegmentClick(['auth'])}
                                onMouseEnter={() => setHovered('auth')}
                                onMouseLeave={() => setHovered(null)}
                            >
                                auth
                            </span>
                            {/* FIX: Escaped curly brace */}: {'{'}
                        </div>

                        {/* login */}
                        <div className="pl-8">
                            <span
                                className={cn(
                                    'cursor-pointer transition-colors duration-200',
                                    isPathActive('login')
                                        ? 'text-blue-600 font-bold dark:text-blue-400'
                                        : 'text-zinc-500 hover:text-blue-500/70',
                                    isHovered('login') &&
                                        'underline decoration-blue-400 underline-offset-2'
                                )}
                                onClick={() =>
                                    handleSegmentClick([
                                        'auth',
                                        'login',
                                        'POST',
                                    ])
                                }
                                onMouseEnter={() => setHovered('login')}
                                onMouseLeave={() => setHovered(null)}
                            >
                                login
                            </span>
                            {/* FIX: Escaped curly brace */}: {'{'}
                            {isPathActive('login') ? (
                                <div className="pl-4 animate-in fade-in slide-in-from-left-2 duration-200">
                                    <span className="text-emerald-600 font-bold dark:text-emerald-400">
                                        POST
                                    </span>
                                    : <BuilderCode />,
                                </div>
                            ) : (
                                <span className="text-zinc-400 px-1">...</span>
                            )}
                            {/* FIX: Escaped curly brace */}
                            {'}'}
                        </div>
                        <div className="pl-4">{'}'},</div>

                        {/* users */}
                        <div className="pl-4">
                            <span
                                className={cn(
                                    'cursor-pointer transition-colors duration-200',
                                    isPathActive('users')
                                        ? 'text-zinc-900 font-bold dark:text-zinc-100'
                                        : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300',
                                    isHovered('users') &&
                                        'underline decoration-zinc-400 underline-offset-2'
                                )}
                                onClick={() => handleSegmentClick(['users'])}
                                onMouseEnter={() => setHovered('users')}
                                onMouseLeave={() => setHovered(null)}
                            >
                                users
                            </span>
                            {/* FIX: Escaped curly brace */}: {'{'}
                        </div>

                        {/* $id */}
                        <div className="pl-8">
                            <span
                                className={cn(
                                    'cursor-pointer transition-colors duration-200',
                                    isPathActive('$id')
                                        ? 'text-amber-600 font-bold dark:text-amber-500'
                                        : 'text-zinc-500 hover:text-amber-500/70',
                                    isHovered('$id') &&
                                        'underline decoration-amber-500 underline-offset-2'
                                )}
                                onClick={() =>
                                    handleSegmentClick(['users', '$id'])
                                }
                                onMouseEnter={() => setHovered('$id')}
                                onMouseLeave={() => setHovered(null)}
                            >
                                $id
                            </span>
                            {/* FIX: Escaped curly brace */}: {'{'}
                        </div>

                        {/* $id.GET */}
                        <div className="pl-12">
                            <span
                                className={cn(
                                    'cursor-pointer transition-colors duration-200',
                                    isPathActive('GET') &&
                                        !activePath.includes('posts')
                                        ? 'text-emerald-600 font-bold dark:text-emerald-400'
                                        : 'text-zinc-500 hover:text-emerald-500/70',
                                    isHovered('GET') &&
                                        'underline decoration-emerald-400 underline-offset-2'
                                )}
                                onClick={() =>
                                    handleSegmentClick(['users', '$id', 'GET'])
                                }
                                onMouseEnter={() => setHovered('GET')}
                                onMouseLeave={() => setHovered(null)}
                            >
                                GET
                            </span>
                            : <BuilderCode />,
                        </div>

                        {/* $id.posts */}
                        <div className="pl-12">
                            <span
                                className={cn(
                                    'cursor-pointer transition-colors duration-200',
                                    isPathActive('posts')
                                        ? 'text-zinc-900 font-bold dark:text-zinc-100'
                                        : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300',
                                    isHovered('posts') &&
                                        'underline decoration-zinc-400 underline-offset-2'
                                )}
                                onClick={() =>
                                    handleSegmentClick([
                                        'users',
                                        '$id',
                                        'posts',
                                        'GET',
                                    ])
                                }
                                onMouseEnter={() => setHovered('posts')}
                                onMouseLeave={() => setHovered(null)}
                            >
                                posts
                            </span>
                            {/* FIX: Escaped curly brace */}: {'{'}
                            {isPathActive('posts') ? (
                                <div className="pl-4 animate-in fade-in slide-in-from-left-2 duration-200">
                                    <span className="text-emerald-600 font-bold dark:text-emerald-400">
                                        GET
                                    </span>
                                    : <BuilderCode />
                                </div>
                            ) : (
                                <span className="text-zinc-400 px-1">...</span>
                            )}
                            {'}'}
                        </div>

                        <div className="pl-8">{'}'}</div>
                        <div className="pl-4">{'}'}</div>
                        <div>{'}'})</div>
                    </div>
                </div>

                {/* Right: Usage Preview (Generated Code) */}
                <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-900 p-4 shadow-lg dark:border-zinc-800 h-[320px]">
                    <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                        <span>2. Type-Safe Usage</span>
                        {activePath.length > 0 && (
                            <div className="flex items-center gap-1 text-green-500 animate-in fade-in duration-300">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                Synced
                            </div>
                        )}
                    </div>
                    <div className="font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap overflow-y-auto custom-scrollbar">
                        <span className="text-purple-400">await</span>{' '}
                        <span className="text-blue-400">api</span>
                        {activePath.length === 0 && (
                            <span className="animate-pulse text-zinc-600">
                                ...
                            </span>
                        )}
                        {/* Render Active Path Segments */}
                        {activePath.map((segment, i) => {
                            const isSegmentHovered = hovered === segment
                            let colorClass = 'text-zinc-100'
                            if (segment === '$id') colorClass = 'text-amber-400'
                            else if (['GET', 'POST'].includes(segment))
                                colorClass = 'text-emerald-400'

                            return (
                                <span
                                    key={i}
                                    className={cn(
                                        'transition-all duration-200',
                                        isSegmentHovered &&
                                            'scale-110 font-bold inline-block text-white shadow-white/20 drop-shadow-md',
                                        colorClass
                                    )}
                                >
                                    .{segment}
                                </span>
                            )
                        })}
                        {/* Query Execution Block */}
                        {['GET', 'POST', 'PUT', 'DELETE'].includes(
                            activePath[activePath.length - 1]
                        ) && (
                            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                .<span className="text-yellow-400">query</span>(
                                {/* FIX: Replaced invalid nested syntax with explicit string escaping */}
                                {'{'}
                                {activePath.includes('$id') && (
                                    <div
                                        className={cn(
                                            'pl-4 transition-colors duration-200 rounded',
                                            hovered === '$id' &&
                                                'bg-amber-500/20'
                                        )}
                                    >
                                        path: {'{'}
                                        <span className="text-amber-400">
                                            id
                                        </span>
                                        :{' '}
                                        <span className="text-green-400">
                                            "123"
                                        </span>{' '}
                                        {'}'},
                                    </div>
                                )}
                                {activePath.includes('login') && (
                                    <div
                                        className={cn(
                                            'pl-4 transition-colors duration-200 rounded',
                                            hovered === 'login' &&
                                                'bg-blue-500/20'
                                        )}
                                    >
                                        body: {'{'}
                                        <span className="text-blue-400">
                                            email
                                        </span>
                                        :{' '}
                                        <span className="text-green-400">
                                            "..."
                                        </span>{' '}
                                        {'}'},
                                    </div>
                                )}
                                {'}'})
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-[10px] text-zinc-400">
                Select a route definition to generate its type-safe client usage
            </div>
        </div>
    )
}

export const routerCode = `
// 1. Define Nested Router
const api = f.router('https://api.com', {
    auth: {
        login: {
            POST: f.builder().build()
        }
    },
    users: {
        $id: {
            GET: f.builder().build(),
        },
        posts: {
            GET: f.builder().build()
        }
    }
})

// 2. Use with Autocomplete
await api.users.$id.GET.query({
    path: { id: '123' } // Typed & Required!
})
`
