from fastapi import APIRouter
from pydantic import BaseModel
from app.services.company_service import (
    generate_company_question,
    evaluate_company_answer,
)

router = APIRouter(
    prefix="/company",
    tags=["Company Interview"]
)


class CompanyRequest(BaseModel):
    company: str
    role: str
    experience: str
    difficulty: str


class EvaluationRequest(BaseModel):
    company: str
    role: str
    experience: str
    difficulty: str
    question: str
    answer: str


@router.post("/question")
def company_question(data: CompanyRequest):

    question = generate_company_question(
        data.company,
        data.role,
        data.experience,
        data.difficulty,
    )

    return {
        "question": question
    }


@router.post("/evaluate")
def evaluate(data: EvaluationRequest):

    return evaluate_company_answer(
        data.company,
        data.role,
        data.experience,
        data.difficulty,
        data.question,
        data.answer,
    )