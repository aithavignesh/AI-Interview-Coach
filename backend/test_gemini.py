import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
key = os.getenv("GEMINI_API_KEY")
print("Loaded key prefix:", key[:10] if key else "No key")
response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents="Say hello"
)

print(response.text)