import os
import json
from pathlib import Path

from dotenv import load_dotenv
from google import genai

load_dotenv(Path(__file__).resolve().parents[2] / ".env")
api_key = os.getenv("GEMINI_API_KEY")

print("Loaded API Key:", api_key[:10] + "..." if api_key else "No Key Found")

client = genai.Client(api_key=api_key)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


import time

def generate_interview_question(role, interview_type, difficulty):
    prompt = f"""
Generate one {difficulty} {interview_type} interview question for a {role}.
Return only the question.
"""

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-3.5-flash",
                contents=prompt,
            )

            return response.text

        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")

            if attempt < 2:
                time.sleep(2)
            else:
                return "⚠️ Gemini AI is currently busy. Please try again after a few seconds."


import json
import time

def evaluate_answer(question, answer):

    prompt = f"""
Evaluate the following interview answer.

Question:
{question}

Answer:
{answer}

Return ONLY JSON in this format:

{{
    "score": 8.5,
    "strengths": ["..."],
    "weaknesses": ["..."],
    "feedback": "..."
}}
"""

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-3.5-flash",
                contents=prompt,
            )

            text = response.text.strip()

            if text.startswith("```json"):
                text = text.replace("```json", "").replace("```", "").strip()

            return json.loads(text)

        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")

            if attempt < 2:
                time.sleep(2)
            else:
                return {
                    "score": 0,
                    "strengths": [],
                    "weaknesses": [],
                    "feedback": "Gemini AI is temporarily unavailable. Please try again later."
                }