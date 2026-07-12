import json
import time
from app.services.gemini_service import client

MODEL = "gemini-3.5-flash"


def analyze_resume(text):

    prompt = f"""
You are an expert technical recruiter.

Analyze the following resume.

Resume:
{text}

Return ONLY valid JSON.

{{
    "score": 85,
    "skills": ["Python", "FastAPI", "SQL"],
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

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=prompt,
            )

            if not response.text:
                raise Exception("Empty response from Gemini")

            result = response.text.strip()

            print("\n========== RESUME ANALYSIS ==========")
            print(result)
            print("=====================================\n")

            if result.startswith("```json"):
                result = result.replace("```json", "").replace("```", "").strip()

            return json.loads(result)

        except Exception as e:
            print(f"Attempt {attempt + 1} failed:", e)

            if attempt < 2:
                time.sleep(3)
            else:
                return {
                    "score": 0,
                    "skills": [],
                    "strengths": [],
                    "weaknesses": [],
                    "suggestions": [],
                    "error": str(e)
                }