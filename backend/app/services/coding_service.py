import json
import time
from app.services.gemini_service import client

MODEL = "gemini-3.5-flash"


def generate_coding_question(difficulty):

    prompt = f"""
Generate one {difficulty} Python coding interview question.

Return ONLY JSON.

{{
  "title": "Question title",
  "question": "Question description",
  "sample_input": "1 2 3",
  "sample_output": "6"
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

            text = response.text.strip()

            print("\n========== GEMINI RESPONSE ==========")
            print(text)
            print("=====================================\n")

            if text.startswith("```json"):
                text = text.replace("```json", "").replace("```", "").strip()

            return json.loads(text)

        except Exception as e:
            print(f"Attempt {attempt + 1} failed:", e)

            if attempt < 2:
                time.sleep(3)
            else:
                return {
                    "title": "Error",
                    "question": str(e),
                    "sample_input": "",
                    "sample_output": ""
                }


def evaluate_code(question, code):

    prompt = f"""
You are an expert coding interviewer.

Question:
{question}

Candidate Code:
{code}

Evaluate the solution.

Return ONLY valid JSON.

{{
    "score": 9,
    "correctness": "Excellent",
    "time_complexity": "O(n)",
    "space_complexity": "O(1)",
    "feedback": "..."
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

            text = response.text.strip()

            print("\n========== GEMINI EVALUATION ==========")
            print(text)
            print("=======================================\n")

            if text.startswith("```json"):
                text = text.replace("```json", "").replace("```", "").strip()

            return json.loads(text)

        except Exception as e:
            print(f"Attempt {attempt + 1} failed:", e)

            if attempt < 2:
                time.sleep(3)
            else:
                return {
                    "score": 0,
                    "correctness": "Failed",
                    "time_complexity": "-",
                    "space_complexity": "-",
                    "feedback": str(e)
                }