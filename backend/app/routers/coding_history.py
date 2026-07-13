from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.coding_interview import CodingInterview

router = APIRouter(
    prefix="/coding-history",
    tags=["Coding History"],
)


@router.get("/")
def get_history(db: Session = Depends(get_db)):

    history = (
        db.query(CodingInterview)
        .order_by(CodingInterview.created_at.desc())
        .all()
    )

    return history