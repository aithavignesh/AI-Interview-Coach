import os
import json
from pathlib import Path

from dotenv import load_dotenv
from google import genai

load_dotenv(Path(__file__).resolve().parents[2] / ".env")

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_interview_question(role, interview_type, difficulty):
    prompt = f"""
You are an experienced interviewer.

Generate ONE {difficulty} level {interview_type} interview question
for the role of {role}.

Only return the question.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text


def evaluate_answer(question, answer):
    prompt = f"""
You are a professional technical interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Return ONLY valid JSON in the following format:

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

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    text = response.text.strip()

    # Remove markdown if Gemini wraps JSON in ```json ... ```
    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)