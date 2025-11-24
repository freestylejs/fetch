'use client'

import { Code, Eye } from 'lucide-react'
import { type ReactNode, useState } from 'react'

import { CodeBlock } from '@/components/ui'
import { Card, CardLink } from '@/components/ui/card'
import { Glow } from '@/components/ui/glow'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
    title: string
    description: string
    code: string
    link?: string
    children: ReactNode
}

export function FeatureCard({
    title,
    description,
    code,
    link,
    children,
}: FeatureCardProps) {
    const [view, setView] = useState<'preview' | 'code'>('preview')

    return (
        <Card className="gap-0 overflow-hidden border-0 bg-neutral-100/50 p-0 shadow-none backdrop-blur-sm dark:bg-neutral-900/30">
            <Glow className="opacity-50" />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-neutral-200 bg-white/50 px-6 py-5 dark:border-neutral-800 dark:bg-black/20">
                <div className="space-y-1">
                    <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {description}
                    </p>
                </div>
                {link && (
                    <CardLink
                        href={link}
                        className="relative top-0 right-0 translate-x-0"
                    />
                )}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-end border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
                <div className="flex gap-1 rounded-lg bg-neutral-200/50 p-1 dark:bg-neutral-800/50">
                    <button
                        onClick={() => setView('preview')}
                        className={cn(
                            'flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                            view === 'preview'
                                ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                                : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                        )}
                    >
                        <Eye className="size-3.5" />
                        Preview
                    </button>
                    <button
                        onClick={() => setView('code')}
                        className={cn(
                            'flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                            view === 'code'
                                ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                                : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                        )}
                    >
                        <Code className="size-3.5" />
                        Code
                    </button>
                </div>
            </div>

            {/* Content Area - Grid Stack for Auto Height */}
            <div className="grid min-h-[300px] bg-neutral-50/50 dark:bg-black/20">
                {/* Preview */}
                <div
                    className={cn(
                        'col-start-1 row-start-1 flex items-center justify-center p-6 transition-all duration-300',
                        view === 'preview'
                            ? 'opacity-100 scale-100 z-10'
                            : 'opacity-0 scale-95 pointer-events-none'
                    )}
                >
                    {children}
                </div>

                {/* Code */}
                <div
                    className={cn(
                        'col-start-1 row-start-1 overflow-auto bg-neutral-50/20 dark:bg-black/50 p-3 transition-all duration-300 no-scrollbar',
                        view === 'code'
                            ? 'opacity-100 translate-y-0 z-10'
                            : 'opacity-0 translate-y-4 pointer-events-none'
                    )}
                >
                    <CodeBlock
                        code={code.trim()}
                        lang="tsx"
                        wrapper={{ className: 'min-h-full' }}
                    />
                </div>
            </div>
        </Card>
    )
}
