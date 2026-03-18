import os
from dotenv import load_dotenv
import google.generativeai as genai
from supabase import create_client

# Load from specific path
load_dotenv("C:/Users/marya/.gemini/antigravity/scratch/aisibvs/backend/.env")

def test_config():
    gemini_key = os.getenv("GEMINI_API_KEY")
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    print(f"Gemini Key: {gemini_key[:5]}...{gemini_key[-5:]}")
    print(f"Supabase URL: {supabase_url}")
    
    # Test Gemini
    try:
        genai.configure(api_key=gemini_key)
        model = genai.GenerativeModel('gemini-flash-latest')
        response = model.generate_content("Hello, reply with 'Gemini OK'")
        print(f"Gemini Response: {response.text.strip()}")
    except Exception as e:
        print(f"Gemini Error: {e}")
        
    # Test Supabase
    try:
        supabase = create_client(supabase_url, supabase_key)
        # Try to list data from the queries table
        data = supabase.table("queries").select("*").limit(1).execute()
        print(f"Supabase connection verified. Found {len(data.data)} queries.")
    except Exception as e:
        print(f"Supabase Error: {e}")

if __name__ == "__main__":
    test_config()
