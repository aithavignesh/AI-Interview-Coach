from pydantic import BaseModel


class InterviewCreate(BaseModel):
    user_id: int
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

    class Config:
        from_attributes = True