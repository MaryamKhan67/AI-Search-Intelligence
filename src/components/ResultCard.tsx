'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, CheckCircle } from 'lucide-react'

interface BrandResult {
    name: string
    rank: number
    sentiment: 'positive' | 'neutral' | 'negative'
    confidence: number
    top_product: string
    product_url: string
}

interface ResultCardProps {
    brand: BrandResult
    index: number
}

export default function ResultCard({ brand, index }: ResultCardProps) {
    const sentiment = brand.sentiment?.toLowerCase() || 'neutral'

    const sentimentColor = {
        positive: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        neutral: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        negative: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    }[sentiment] || 'text-amber-400 bg-amber-500/10 border-amber-500/20'

    const SentimentIcon = {
        positive: TrendingUp,
        neutral: Minus,
        negative: TrendingDown
    }[sentiment] || Minus

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass glass-hover p-6 flex flex-col gap-4 group"
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg border border-indigo-500/30">
                        {brand.rank}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {brand.name}
                    </h3>
                </div>
                <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 ${sentimentColor}`}>
                    <SentimentIcon className="h-3.5 w-3.5" />
                    {brand.sentiment.toUpperCase()}
                </div>
            </div>

            <div className="space-y-1">
                <div className="text-indigo-300 font-bold text-sm tracking-wide">
                    {brand.top_product}
                </div>
                <a
                    href={brand.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400/60 hover:text-indigo-300 underline flex items-center gap-1 transition-colors"
                >
                    Official Product Page
                    <CheckCircle className="h-3 w-3" />
                </a>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs text-indigo-300/60 uppercase tracking-wider font-semibold">
                    <span>AI Confidence</span>
                    <span>{(brand.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${brand.confidence * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    />
                </div>
            </div>
        </motion.div>
    )
}
