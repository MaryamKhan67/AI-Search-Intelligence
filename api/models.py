from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class BrandResult(BaseModel):
    name: str
    rank: int
    sentiment: str
    confidence: float
    top_product: str
    product_url: str

class AnalysisSummary(BaseModel):
    top_brand: str
    overall_sentiment: str

class MarketOpportunity(BaseModel):
    segment: str
    opportunity_score: float
    unmet_need: str
    competitor_density: float

class VisibilityRequest(BaseModel):
    query: str

class VisibilityResponse(BaseModel):
    query: str
    search_intent: str = "Informational"
    ai_response: str
    brands: List[BrandResult]
    summary: AnalysisSummary
    suggestions: List[str]
    market_map: List[MarketOpportunity] = []

class Insight(BaseModel):
    query_id: str
    insight_text: str
    category: Optional[str] = None
