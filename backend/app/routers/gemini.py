from fastapi import APIRouter
from pydantic import BaseModel

from app.services.gemini_service import generate_interview_question

router = APIRouter(
    prefix="/gemini",
    tags=["Gemini AI"]
)


class InterviewRequest(BaseModel):
    role: str
    interview_type: str
    difficulty: str


@router.post("/question")
def question(data: InterviewRequest):

    question = generate_interview_question(
        data.role,
        data.interview_type,
        data.difficulty
    )

    return {
        "question": question
    }