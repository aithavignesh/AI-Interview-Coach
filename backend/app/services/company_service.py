from app.services.gemini_service import ask_gemini


def generate_company_question(
    company,
    role,
    experience,
    difficulty,
):

    prompt = f"""
You are a senior interviewer at {company}.

Generate ONE interview question.

Company: {company}
Role: {role}
Experience: {experience}
Difficulty: {difficulty}

Rules:

1. Google -> DSA, Algorithms
2. Amazon -> Leadership Principles + Coding
3. Microsoft -> Problem Solving
4. Apple -> System Design
5. Oracle -> Database + Java
6. JP Morgan -> Java, OOP, Behavioral
7. Adobe -> Coding + Design
8. TCS -> Aptitude + HR
9. Infosys -> Fundamentals

Return ONLY the interview question.
"""

    return ask_gemini(prompt)


def evaluate_company_answer(
    company,
    role,
    experience,
    difficulty,
    question,
    answer,
):

    prompt = f"""
You are a senior interviewer at {company}.

Evaluate this interview answer.

Company:
{company}

Role:
{role}

Experience:
{experience}

Difficulty:
{difficulty}

Interview Question:
{question}

Candidate Answer:
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

    return ask_gemini(prompt, expect_json=True)