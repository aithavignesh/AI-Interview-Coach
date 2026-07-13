import os
import json
import time
from pathlib import Path

from dotenv import load_dotenv
from google import genai

# Load .env
load_dotenv(Path(__file__).resolve().parents[2] / ".env")

# API Key
api_key = os.getenv("GEMINI_API_KEY")


# Gemini Client
client = genai.Client(api_key=api_key)

# Model (change only here if Google updates models)
MODELS = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-3-flash-preview",
]


def ask_gemini(prompt, expect_json=False):

    for model in MODELS:

        for attempt in range(2):

            try:
                print(f"Trying {model}")

                response = client.models.generate_content(
                    model=model,
                    contents=prompt,
                )

                text = response.text.strip()

                if text.startswith("```json"):
                    text = text.replace("```json", "").replace("```", "").strip()

                return json.loads(text) if expect_json else text

            except Exception as e:
                print(f"{model} failed:", e)

    raise Exception("All Gemini models are currently unavailable.")
def generate_interview_question(role, interview_type, difficulty):

    prompt = f"""
Generate one {difficulty} {interview_type} interview question for a {role}.

Return only the question.
"""

    try:
        return ask_gemini(prompt)

    except Exception:
        return "⚠️ Gemini AI is currently busy. Please try again later."


def evaluate_answer(question, answer):

    prompt = f"""
Evaluate the following interview answer.

Question:
{question}

Answer:
{answer}

Return ONLY valid JSON.

{{
    "score": 8.5,
    "strengths": [
        "...",
        "..."
    ],
    "weaknesses": [
        "...",
        "..."
    ],
    "feedback": "..."
}}
"""

    try:
        return ask_gemini(prompt, expect_json=True)

    except Exception:
        return {
            "score": 0,
            "strengths": [],
            "weaknesses": [],
            "feedback": "Gemini AI is temporarily unavailable. Please try again later."
        }