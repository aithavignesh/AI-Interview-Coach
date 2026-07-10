from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.database import SessionLocal
from app.models.interview import Interview
from app.schemas.interview import InterviewCreate, InterviewResponse
from app.models.interview_question import InterviewQuestion
from app.schemas.interview_question import InterviewQuestionCreate
from app.utils.auth import get_current_user
router = APIRouter(prefix="/interview", tags=["Interview"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/save")
def save_interview(
    data: InterviewCreate,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    interview = Interview(
        user_id=current_user,
        role=data.role,
        interview_type=data.interview_type,
        difficulty=data.difficulty,
        average_score=data.average_score,
    )

    db.add(interview)
    db.commit()
    db.refresh(interview)

    return {
        "message": "Interview saved successfully",
        "id": interview.id,
    }


@router.get("/history")
def get_history(
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    interviews = (
        db.query(Interview)
        .filter(Interview.user_id == current_user)
        .order_by(Interview.created_at.desc())
        .all()
    )

    return interviews
    
@router.post("/question/save")
def save_question(
    data: InterviewQuestionCreate,
    db: Session = Depends(get_db)
):
    question = InterviewQuestion(
        interview_id=data.interview_id,
        question=data.question,
        answer=data.answer,
        score=data.score,
        feedback=data.feedback,
    )

    db.add(question)
    db.commit()
    db.refresh(question)

    return {
        "message": "Question saved successfully",
        "id": question.id,
    }
@router.put("/update/{interview_id}")
def update_interview(
    interview_id: int,
    average_score: float,
    db: Session = Depends(get_db),
):
    interview = (
        db.query(Interview)
        .filter(Interview.id == interview_id)
        .first()
    )

    if not interview:
        return {"message": "Interview not found"}

    interview.average_score = average_score

    db.commit()

    return {"message": "Interview updated successfully"}