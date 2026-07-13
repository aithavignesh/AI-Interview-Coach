from fastapi import APIRouter
from app.services.coding_service import (
    generate_coding_question,
    evaluate_code,
)

router = APIRouter(
    prefix="/coding",
    tags=["Coding"]
)


@router.post("/question")
def coding_question(data: dict):

    difficulty = data.get("difficulty", "Medium")

    return generate_coding_question(difficulty)


@router.post("/evaluate")
def coding_evaluate(data: dict):

    question = data["question"]
    code = data["code"]

    return evaluate_code(question, code)
