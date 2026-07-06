import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai

env_path = Path(__file__).resolve().parents[2] / ".env"

print("ENV PATH:", env_path)
print("ENV EXISTS:", env_path.exists())

load_dotenv(env_path)

print("API KEY:", os.getenv("GEMINI_API_KEY"))

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_interview_question(role, interview_type, difficulty):
    prompt = f"""
    Generate ONE {difficulty} {interview_type} interview question
    for the role of {role}.

    Only return the question.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text