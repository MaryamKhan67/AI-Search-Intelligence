'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface QueryInputProps {
    onSearch: (query: string) => void
    isLoading: boolean
}

export default function QueryInput({ onSearch, isLoading }: QueryInputProps) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim() && !isLoading) {
            onSearch(query)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`relative w-full max-w-2xl mx-auto transition-all duration-500 animate-fade-in ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
        >
            <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl group-focus-within:bg-indigo-500/30 transition-all" />
                <div className="relative flex items-center glass px-6 py-4 focus-within:border-indigo-500/50 transition-all">
                    <MagnifyingGlassIcon className="h-6 w-6 text-indigo-400 mr-4" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., best sunscreen for oily skin..."
                        className="w-full bg-transparent border-none outline-none text-f0f0f5 placeholder-indigo-300/30 text-lg"
                    />
                    <button
                        type="submit"
                        className="ml-4 bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-xl font-medium transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50"
                        disabled={isLoading || !query.trim()}
                    >
                        {isLoading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </div>
        </form>
    )
}
