'use client'

import { motion } from 'framer-motion'
import { Info, ShoppingCart, Landmark, Target } from 'lucide-react'

interface SearchIntentWidgetProps {
    intent: string
}

export default function SearchIntentWidget({ intent }: SearchIntentWidgetProps) {
    const normalizedIntent = intent?.toLowerCase() || 'informational'

    const intentConfigs = {
        informational: {
            title: 'Informational',
            icon: Info,
            color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
            description: 'User is researching and seeking knowledge. Focus on education.',
            dot: 'bg-blue-400'
        },
        transactional: {
            title: 'Transactional',
            icon: ShoppingCart,
            color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            description: 'User is ready to buy. Focus on pricing and conversion.',
            dot: 'bg-emerald-400'
        },
        navigational: {
            title: 'Navigational',
            icon: Landmark,
            color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
            description: 'User is looking for a specific brand or site. Focus on authority.',
            dot: 'bg-purple-400'
        }
    }

    const config = intentConfigs[normalizedIntent as keyof typeof intentConfigs] || intentConfigs.informational

    const Icon = config.icon

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`glass p-6 space-y-4 border-l-4 ${config.color.split(' ')[2]}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-widest text-xs">
                    <Target className="h-4 w-4" />
                    Search Intent
                </div>
                <div className={`h-2 w-2 rounded-full ${config.dot} animate-pulse`} />
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${config.color}`}>
                <Icon className="h-3.5 w-3.5" />
                {config.title.toUpperCase()}
            </div>

            <p className="text-xs text-indigo-200/60 leading-relaxed font-medium">
                {config.description}
            </p>

            <div className="pt-2 border-t border-white/5 mt-2">
                <p className="text-[10px] text-indigo-300/40 uppercase tracking-tighter font-bold">Strategy Advice</p>
                <p className="text-[11px] text-indigo-100/70 mt-1 font-medium italic">
                    {normalizedIntent === 'transactional'
                        ? "Leverage direct product links and limited-time offers to capture this high-intent traffic."
                        : normalizedIntent === 'navigational'
                            ? "Ensure your brand authority is clear and your top product matches the identified search."
                            : "Focus on informative content, comparisons, and listicles to build trust during research."}
                </p>
            </div>
        </motion.div>
    )
}
