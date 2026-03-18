'use client'

import { motion } from 'framer-motion'
import { Target, Users, Zap } from 'lucide-react'

interface Opportunity {
    segment: string
    opportunity_score: number
    unmet_need: string
    competitor_density: number
}

interface MarketOpportunityMapProps {
    opportunities: Opportunity[]
}

export default function MarketOpportunityMap({ opportunities }: MarketOpportunityMapProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.map((opp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-all"
                    >
                        {/* Status Badge */}
                        <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter rounded-bl-xl border-l border-b ${opp.opportunity_score > 0.7
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                            }`}>
                            {opp.opportunity_score > 0.7 ? 'High Potential' : 'Strategic Niche'}
                        </div>

                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${opp.opportunity_score > 0.7 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'
                                }`}>
                                <Target className="h-5 w-5" />
                            </div>
                            <div className="space-y-1 pr-12">
                                <h4 className="text-white font-bold text-sm tracking-tight">{opp.segment}</h4>
                                <p className="text-xs text-indigo-300/60 leading-relaxed font-medium">
                                    {opp.unmet_need}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-indigo-300/40">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        <span>Density</span>
                                    </div>
                                    <span>{(opp.competitor_density * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${opp.competitor_density * 100}%` }}
                                        className={`h-full rounded-full ${opp.competitor_density > 0.6 ? 'bg-rose-500' : 'bg-indigo-400'}`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-indigo-300/40">
                                    <div className="flex items-center gap-1">
                                        <Zap className="h-3 w-3" />
                                        <span>Opportunity</span>
                                    </div>
                                    <span>{(opp.opportunity_score * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${opp.opportunity_score * 100}%` }}
                                        className={`h-full rounded-full ${opp.opportunity_score > 0.7 ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-indigo-400'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Market Gap Radar Tip */}
            {opportunities.length > 0 && (
                <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 animate-pulse">
                        <Zap className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white uppercase tracking-widest mb-0.5">Market Radar Insight</p>
                        <p className="text-[11px] text-indigo-300/70 font-medium">
                            The identified segments show low competitor density but high interest. Consider targeting the <span className="text-emerald-400">"{opportunities.sort((a, b) => b.opportunity_score - a.opportunity_score)[0]?.segment}"</span> niche for maximum ROI.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
