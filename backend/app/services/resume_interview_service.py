import json
import time
from app.services.gemini_service import client

MODEL = "gemini-3.5-flash"


def generate_resume_questions(resume_text, difficulty):

    prompt = f"""
You are an expert technical interviewer.

Based on the following resume, generate exactly 5 interview questions.

Resume:
{resume_text}

Difficulty:
{difficulty}

Return ONLY valid JSON in the following format:

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

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=prompt,
            )

            if not response.text:
                raise Exception("Empty response from Gemini")

            result = response.text.strip()

            print("\n========== RESUME QUESTIONS ==========")
            print(result)
            print("======================================\n")

            if result.startswith("```json"):
                result = result.replace("```json", "").replace("```", "").strip()

            return json.loads(result)

        except Exception as e:
            print(f"Attempt {attempt + 1} failed:", e)

            if attempt < 2:
                time.sleep(3)
            else:
                return {
                    "questions": [],
                    "error": str(e)
                }