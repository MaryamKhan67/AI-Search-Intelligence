import os
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from models import VisibilityRequest, VisibilityResponse
from nlp_engine import analyze_query_visibility
from database import save_analysis, get_query_history, get_full_analysis

app = FastAPI(title="AISIBVS API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/history")
async def get_history():
    """Returns the most recent search queries."""
    return get_query_history()

@app.get("/analysis/{query_id}", response_model=VisibilityResponse)
async def get_analysis(query_id: str):
    """Retrieves full analysis for a past query."""
    result = get_full_analysis(query_id)
    if not result:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return result

@app.get("/")
async def root():
    return {"message": "AISIBVS API is running"}

@app.post("/analyze", response_model=VisibilityResponse)
async def analyze_query(request: VisibilityRequest):
    """
    Analyzes a query and returns brand visibility intelligence.
    """
    if not request.query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    # Perform AI analysis
    result = analyze_query_visibility(request.query)
    
    if "error" not in result:
        # Save to Supabase in background or directly
        save_analysis(request.query, result)
    
    return {
        "query": request.query,
        "search_intent": result.get("search_intent", "Informational"),
        "ai_response": result.get("ai_response", "No response generated."),
        "brands": result.get("brands", []),
        "summary": result.get("summary", {"top_brand": "N/A", "overall_sentiment": "unknown"}),
        "suggestions": result.get("suggestions", []),
        "market_map": result.get("market_map", [])
    }

# Entry point for Vercel Serverless Functions
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
