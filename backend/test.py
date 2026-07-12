from app.services.gemini_service import client

response = client.models.generate_content(
    model="gemini-3.1-flash-lite",
    contents="Say Hello"
)

print(response.text)