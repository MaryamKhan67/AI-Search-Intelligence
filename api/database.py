import os
from supabase import create_client, Client
from typing import Dict, Any, List
from models import BrandResult
from dotenv import load_dotenv

# Ensure env vars are loaded even if imported separately
load_dotenv()

# Supabase Configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase: Client = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Error initializing Supabase Client: {e}")

def save_analysis(query_text: str, analysis: Dict[str, Any]):
    """
    Saves the query, brand rankings, and insights to Supabase.
    """
    if not supabase:
        return None
    
    try:
        # 1. Upsert Query with Search Intent
        query_data = supabase.table("queries").upsert(
            {
                "query_text": query_text,
                "search_intent": analysis.get("search_intent", "Informational")
            }, 
            on_conflict="query_text"
        ).execute()
        
        if not query_data.data:
            return None
            
        query_id = query_data.data[0]["id"]
        
        # 2. Save Brand Results
        results_data = []
        for brand in analysis.get("brands", []):
            results_data.append({
                "query_id": query_id,
                "brand_name": brand["name"],
                "rank": brand["rank"],
                "sentiment": brand["sentiment"],
                "confidence": brand.get("confidence", 0.0),
                "top_product": brand.get("top_product", ""),
                "product_url": brand.get("product_url", ""),
                "analysis_raw": analysis.get("ai_response", "")
            })
            
        if results_data:
            supabase.table("results").insert(results_data).execute()
            
        # 3. Save Insights/Suggestions
        insights_data = []
        for suggestion in analysis.get("suggestions", []):
            insights_data.append({
                "query_id": query_id,
                "insight_text": suggestion,
                "category": "Visibility Recommendation"
            })
            
        if insights_data:
            supabase.table("insights").insert(insights_data).execute()
            
        # 4. Save Market Opportunities
        market_data = []
        for opp in analysis.get("market_map", []):
            market_data.append({
                "query_id": query_id,
                "segment": opp["segment"],
                "opportunity_score": opp["opportunity_score"],
                "unmet_need": opp["unmet_need"],
                "competitor_density": opp["competitor_density"]
            })
            
        if market_data:
            supabase.table("market_opportunities").insert(market_data).execute()
            
        return query_id
        
    except Exception as e:
        print(f"Error saving to database: {e}")
        return None

def get_query_history(limit: int = 10):
    """
    Fetches the most recent analyzed queries.
    """
    if not supabase:
        return []
    
    try:
        data = supabase.table("queries").select("*").order("created_at", desc=True).limit(limit).execute()
        return data.data
    except Exception as e:
        print(f"Error fetching history: {e}")
        return []

def get_full_analysis(query_id: str) -> Dict[str, Any]:
    """
    Retrieves the complete analysis data for a given query ID.
    """
    if not supabase:
        return {}
    
    try:
        # 1. Fetch query text and intent
        query_data = supabase.table("queries")\
            .select("query_text, search_intent")\
            .eq("id", query_id)\
            .single()\
            .execute()
            
        if not query_data.data:
            return {}
        
        # 2. Fetch results (brands)
        results = supabase.table("results").select("*").eq("query_id", query_id).order("rank").execute()
        
        # 3. Fetch insights
        insights = supabase.table("insights").select("insight_text").eq("query_id", query_id).execute()

        # 4. Get market opportunities
        market_query = supabase.table("market_opportunities")\
            .select("*")\
            .eq("query_id", query_id)\
            .execute()
        
        brands = []
        ai_response = ""
        for r in results.data:
            brands.append({
                "name": r["brand_name"],
                "rank": r["rank"],
                "sentiment": r["sentiment"],
                "confidence": r["confidence"],
                "top_product": r.get("top_product", ""),
                "product_url": r.get("product_url", "")
            })
            ai_response = r["analysis_raw"]
            
        return {
            "query": query_data.data["query_text"],
            "search_intent": query_data.data.get("search_intent") or "Informational",
            "ai_response": ai_response,
            "brands": brands,
            "summary": {
                "top_brand": brands[0]["name"] if brands else "N/A",
                "overall_sentiment": brands[0]["sentiment"] if brands else "unknown"
            },
            "suggestions": [i["insight_text"] for i in insights.data],
            "market_map": market_query.data if market_query and market_query.data else []
        }
    except Exception as e:
        print(f"Error fetching full analysis: {e}")
        return {}
