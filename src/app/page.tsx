'use client'

import { useState } from 'react'
import QueryInput from '@/components/QueryInput'
import ResultCard from '@/components/ResultCard'
import VisibilityChart from '@/components/VisibilityChart'
import HistorySidebar from '@/components/HistorySidebar'
import BrandPowerGauge from '@/components/BrandPowerGauge'
import MarketOpportunityMap from '@/components/MarketOpportunityMap'
import SearchIntentWidget from '@/components/SearchIntentWidget'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Lightbulb, ChartBar, List, LayoutDashboard, Target } from 'lucide-react'

interface Brand {
  name: string
  rank: number
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
  top_product: string
  product_url: string
}

interface Opportunity {
  segment: string
  opportunity_score: number
  unmet_need: string
  competitor_density: number
}

interface AnalysisData {
  query: string
  search_intent: string
  ai_response: string
  brands: Brand[]
  summary: {
    top_brand: string
    overall_sentiment: string
  }
  suggestions: string[]
  market_map: Opportunity[]
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleHistorySelect = async (queryId: string) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await fetch(`http://localhost:8000/analysis/${queryId}`)
      if (!response.ok) throw new Error('Analysis not found.')
      const result = await response.json()
      setData(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed. Please check backend connection.')
      }

      const result = await response.json()
      setData(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto space-y-12 transition-all duration-500">
      <HistorySidebar
        onSelectQuery={handleHistorySelect}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Header */}
      <header className="text-center space-y-4 pt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-indigo-400 font-semibold text-sm mb-4"
        >
          <Sparkles className="h-4 w-4" />
          Powered by Gemini AI
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          AI Search <span className="gradient-text">Intelligence</span>
        </h1>
        <p className="text-indigo-200/60 text-lg max-w-2xl mx-auto font-medium">
          Track brand visibility, ranking, and sentiment in generative search results.
        </p>
      </header>

      {/* Input Section */}
      <section>
        <QueryInput onSearch={handleSearch} isLoading={loading} />
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-400 text-center mt-4 font-medium"
          >
            {error}
          </motion.p>
        )}
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column: Brand List */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-widest text-sm">
                <List className="h-5 w-5" />
                Brand Mentions
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {data.brands.map((brand, i) => (
                  <ResultCard key={brand.name} brand={brand} index={i} />
                ))}
                {data.brands.length === 0 && (
                  <div className="glass p-12 text-center text-indigo-300/40 italic">
                    No brands detected in analysis.
                  </div>
                )}
              </div>

              {/* Search Intent Classifier Widget */}
              <div className="pt-4">
                <SearchIntentWidget intent={data.search_intent} />
              </div>
            </div>

            {/* Right Column: Analytics & Suggestions */}
            <div className="lg:col-span-2 space-y-8">
              {/* Chart & Top Brand Power */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass p-8 space-y-6 md:col-span-2">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-widest text-sm">
                    <ChartBar className="h-5 w-5" />
                    Visibility Analytics
                  </div>
                  <div className="bg-indigo-500/5 rounded-2xl p-6 border border-indigo-500/10 h-64">
                    <VisibilityChart brands={data.brands} />
                  </div>
                </div>

                <div className="md:col-span-1">
                  {data.brands.length > 0 && (
                    <BrandPowerGauge
                      brandName={data.brands[0].name}
                      confidence={data.brands[0].confidence}
                      sentiment={data.brands[0].sentiment}
                    />
                  )}
                </div>
              </div>

              {/* Insights */}
              <div className="glass p-8 space-y-6">
                <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-widest text-sm">
                  <Lightbulb className="h-5 w-5" />
                  AI Optimization Insights
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.suggestions.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-100/80 text-sm leading-relaxed"
                    >
                      {s}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Market Opportunity Map */}
              {data.market_map && data.market_map.length > 0 && (
                <div className="glass p-8 space-y-6">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-widest text-sm">
                    <Target className="h-5 w-5" />
                    Market Opportunity Radar
                  </div>
                  <MarketOpportunityMap opportunities={data.market_map} />
                </div>
              )}

              {/* Raw Response (Optional/Debug) */}
              <div className="glass p-8 space-y-4">
                <div className="text-indigo-300 font-bold uppercase tracking-widest text-sm">LLM Analysis Snippet</div>
                <div className="text-indigo-100/60 text-sm leading-relaxed max-h-32 overflow-y-auto italic">
                  "{data.ai_response}"
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State / Loading Backdrop */}
      {!data && !loading && (
        <div className="h-64 flex flex-col items-center justify-center text-indigo-300/20 animate-pulse">
          <Sparkles className="h-16 w-16 mb-4" />
          <p className="font-medium">Enter a query to generate brand intelligence</p>
        </div>
      )}
    </main>
  )
}
