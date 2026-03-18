import os
import json
import google.generativeai as genai
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
API_KEY = os.environ.get("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    print("WARNING: GEMINI_API_KEY not found in environment.")

def analyze_query_visibility(query: str) -> Dict[str, Any]:
    """
    Fetches AI response for a query and extracts brand intelligence.
    """
    # Use gemini-flash-latest as it is explicitly available in your project
    model = genai.GenerativeModel('gemini-flash-latest')
    
    system_prompt = """
    You are an AI Search Intelligence Agent. 
    Analyze the following query as if you were a search engine providing a comprehensive answer.
    Your task:
    1. Identify all noteworthy brand names mentioned in the context of the query.
    2. Determine which brand is the "Top Brand" based on prominence and authority.
    3. For each brand, identify one specific "Top Product" they offer that matches the query.
    4. MUST provide a direct "Product URL" for that SPECIFIC product. 
    5. Rank brands based on their first occurrence in the text.
    6. Perform sentiment analysis for each brand based on the context of the mention.
    7. Generate 2-3 actionable suggestions for improving brand visibility for this query.
    8. **Market Opportunity Discovery**: Identify 4-5 specific market segments or consumer niches related to this query. 
       - Evaluate "Competitor Density" (0.0 to 1.0, where 1.0 means crowded).
       - Evaluate "Opportunity Score" (0.0 to 1.0, where 1.0 is a massive gap/entry point).
       - Describe the "Unmet Need" in that niche.
    9. **Search Intent Classification**: Classify the user's search intent as one of: "Informational", "Transactional", or "Navigational".

    Output MUST be strictly JSON in this format:
    {
      "ai_response": "...",
      "search_intent": "Informational",
      "brands": [
        {
          "name": "Brand A", 
          "rank": 1, 
          "sentiment": "positive", 
          "confidence": 0.9,
          "top_product": "Specific Product Name",
          "product_url": "https://..."
        },
        ...
      ],
      "summary": {
        "top_brand": "Brand A",
        "overall_sentiment": "positive"
      },
      "suggestions": ["...", "..."],
      "market_map": [
        {
          "segment": "Niche Name (e.g., Eco-friendly Gen Z)",
          "opportunity_score": 0.85,
          "unmet_need": "Detailed description of what is missing...",
          "competitor_density": 0.2
        },
        ...
      ]
    }
    """
    
    try:
        response = model.generate_content(f"{system_prompt}\n\nQuery: {query}")
        
        # Extract JSON from response (handling potential markdown formatting)
        text = response.text
        if "```json" in text:
            json_str = text.split("```json")[1].split("```")[0].strip()
        else:
            json_str = text.strip()
            
        data = json.loads(json_str)
        return data
        
    except Exception as e:
        print(f"Error in analysis: {e}")
        return {
            "error": str(e),
            "ai_response": f"Error: {str(e)}",
            "brands": [],
            "summary": {"top_brand": "N/A", "overall_sentiment": "error"},
            "suggestions": ["Please check your API quota or connection."]
        }

if __name__ == "__main__":
    # Test execution
    test_query = "best budget smartphones 2024"
    result = analyze_query_visibility(test_query)
    print(json.dumps(result, indent=2))
