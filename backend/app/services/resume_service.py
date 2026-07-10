import json
from app.services.gemini_service import client

def analyze_resume(text):

    prompt = f"""
You are an expert technical recruiter.

Analyze the following resume.

Resume:
{text}

Return ONLY valid JSON.

{{
    "score": 85,
    "skills": ["Python","FastAPI","SQL"],
    "strengths": [
        "...",
        "..."
    ],
    "weaknesses": [
        "...",
        "..."
    ],
    "suggestions": [
        "...",
        "..."
    ]
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
        )
    except Exception as e:
        print("Gemini Error:", e)

        return {
            "error": str(e)
    }

    result = response.text.strip()

    if result.startswith("```json"):
        result = result.replace("```json", "").replace("```", "").strip()

    return json.loads(result)