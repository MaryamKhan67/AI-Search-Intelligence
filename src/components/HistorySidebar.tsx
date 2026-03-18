'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { History, Clock, ChevronRight, Trash } from 'lucide-react'

interface HistoryItem {
    id: string
    query_text: string
    created_at: string
}

interface HistorySidebarProps {
    onSelectQuery: (queryId: string) => void
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export default function HistorySidebar({ onSelectQuery, isOpen, setIsOpen }: HistorySidebarProps) {
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [loading, setLoading] = useState(false)

    const fetchHistory = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:8000/history')
            const data = await response.json()
            setHistory(data)
        } catch (err) {
            console.error('Failed to fetch history:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            fetchHistory()
        }
    }, [isOpen])

    return (
        <>
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed left-0 top-1/2 -translate-y-1/2 z-40 glass p-3 rounded-r-2xl border-l-0 text-indigo-400 hover:text-indigo-300 transition-all hover:pl-5 shadow-2xl shadow-indigo-500/20"
                >
                    <History className="h-6 w-6" />
                </button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-full w-80 z-50 glass border-r border-indigo-500/20 shadow-2xl flex flex-col pt-24"
                        >
                            <div className="px-6 flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-widest text-sm">
                                    <Clock className="h-5 w-5" />
                                    Analysis History
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-lg hover:bg-indigo-500/10 text-indigo-400 transition-colors"
                                >
                                    <ChevronRight className="h-5 w-5 rotate-180" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-3 pb-8">
                                {loading && (
                                    <div className="text-center py-8 text-indigo-300/40 animate-pulse text-sm">
                                        Loading past searches...
                                    </div>
                                )}
                                {!loading && history.length === 0 && (
                                    <div className="text-center py-8 text-indigo-300/40 italic text-sm">
                                        No recent searches found.
                                    </div>
                                )}
                                {history.map((item) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => {
                                            onSelectQuery(item.id)
                                            setIsOpen(false)
                                        }}
                                        whileHover={{ x: 4 }}
                                        className="w-full text-left p-4 rounded-xl bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 hover:border-indigo-500/30 transition-all group"
                                    >
                                        <p className="text-indigo-100/80 text-sm font-medium line-clamp-2 leading-relaxed mb-2 group-hover:text-indigo-200 transition-colors">
                                            {item.query_text}
                                        </p>
                                        <div className="flex items-center gap-2 text-[10px] text-indigo-300/40 font-bold uppercase tracking-wider">
                                            <Clock className="h-3 w-3" />
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
