from fastapi import APIRouter

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)

questions = {
    "hr": [
        "Tell me about yourself.",
        "Why should we hire you?",
        "What are your strengths?"
    ],
    "technical": [
        "Explain OOP concepts.",
        "What is a Binary Search Tree?",
        "Difference between list and tuple in Python?"
    ]
}

@router.get("/{interview_type}")
def get_questions(interview_type: str):
    if interview_type.lower() not in questions:
        return {"error": "Invalid interview type"}

    return {
        "type": interview_type,
        "questions": questions[interview_type.lower()]
    }