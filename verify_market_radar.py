import requests
import json

def test_market_radar():
    url = "http://localhost:8000/analyze"
    payload = {"query": "best eye cream for dark circles"}
    
    print(f"Sending request to {url}...")
    try:
        response = requests.post(url, json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("\nAnalysis Summary:")
            print(f"Top Brand: {data.get('summary', {}).get('top_brand')}")
            print(f"Search Intent: {data.get('search_intent')}")
            
            market_map = data.get('market_map', [])
            print(f"\nMarket Opportunity Map ({len(market_map)} items):")
            for i, opp in enumerate(market_map):
                print(f"{i+1}. Segment: {opp.get('segment')}")
                print(f"   Opportunity Score: {opp.get('opportunity_score')}")
                print(f"   Density: {opp.get('competitor_density')}")
                print(f"   Unmet Need: {opp.get('unmet_need')[:100]}...")
            
            if len(market_map) > 0:
                print("\n✅ SUCCESS: Market Map data received!")
            else:
                print("\n❌ FAILURE: Market Map data is empty.")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_market_radar()
