import json
from app.services.gemini_service import client


def generate_resume_questions(resume_text, difficulty):

    prompt = f"""
You are an expert technical interviewer.

Based on the following resume, generate 5 interview questions.

Resume:
{resume_text}

Difficulty:
{difficulty}

Return ONLY valid JSON.

{{
    "questions": [
        "...",
        "...",
        "...",
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