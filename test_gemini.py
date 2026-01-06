import os
import google.generativeai as genai

# Load API key
API_KEY = "AIzaSyD5GrkrH6Owl9RpoV7FNolTGbzhhS-yQ2E"

try:
    genai.configure(api_key=API_KEY)
    
    # List available models
    print("📋 Available models:")
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            print(f"  ✓ {model.name}")
    
    print("\n🧪 Testing gemini-pro...")
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content("Say hello in one sentence")
    print(f"✅ Response: {response.text}")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
