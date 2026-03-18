-- SQL Schema for AISIBVS (Supabase/PostgreSQL)

-- Table to store unique search queries
CREATE TABLE IF NOT EXISTS queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_text TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table to store specific analysis results
CREATE TABLE IF NOT EXISTS results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID REFERENCES queries(id) ON DELETE CASCADE,
    brand_name TEXT NOT NULL,
    rank INT NOT NULL,
    sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    confidence FLOAT,
    top_product TEXT,
    product_url TEXT,
    analysis_raw JSONB, -- Storing the full LLM snippet for reference
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for system-generated insights/suggestions
CREATE TABLE IF NOT EXISTS insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID REFERENCES queries(id) ON DELETE CASCADE,
    insight_text TEXT NOT NULL,
    category TEXT, -- 'SEO', 'Brand Presence', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_results_query_id ON results(query_id);
CREATE INDEX IF NOT EXISTS idx_results_brand_name ON results(brand_name);
