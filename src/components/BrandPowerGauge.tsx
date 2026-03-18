'use client'

import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'

interface BrandPowerGaugeProps {
    brandName: string
    confidence: number
    sentiment: string
}

export default function BrandPowerGauge({ brandName, confidence, sentiment }: BrandPowerGaugeProps) {
    // Calculate a dominance score (0-100)
    // Sentiment weight: positive=1.2, neutral=1.0, negative=0.5
    const s = sentiment?.toLowerCase() || 'neutral';
    const sentimentWeight = s === 'positive' ? 1.2 : s === 'neutral' ? 1.0 : 0.5;
    const score = Math.min(100, Math.round(confidence * 100 * sentimentWeight));

    // SVG properties
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center p-6 glass rounded-2xl overflow-hidden min-w-[240px]">
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent ${score > 85 ? 'animate-pulse' : ''}`} />

            <div className="relative mb-4">
                <svg className="h-40 w-40 transform -rotate-90">
                    {/* Background Track */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-indigo-500/10"
                    />
                    {/* Animated Progress Circle */}
                    <motion.circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-3xl font-black text-indigo-100"
                    >
                        {score}
                    </motion.span>
                    <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.2em] -mt-1">
                        Power
                    </span>
                </div>
            </div>

            <div className="text-center space-y-1 relative">
                <div className="flex items-center justify-center gap-2">
                    <Crown className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-bold text-white tracking-wide uppercase">{brandName}</span>
                </div>
                <p className="text-[10px] text-indigo-300/60 font-medium italic">Market Dominance Score</p>
            </div>
        </div>
    )
}
