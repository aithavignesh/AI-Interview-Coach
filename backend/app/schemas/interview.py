from pydantic import BaseModel
from datetime import datetime


class InterviewCreate(BaseModel):
    role: str
    interview_type: str
    difficulty: str
    average_score: float


class InterviewResponse(BaseModel):
    id: int
    user_id: int
    role: str
    interview_type: str
    difficulty: str
    average_score: float
    created_at: datetime

    model_config = {
        "from_attributes": True
    }