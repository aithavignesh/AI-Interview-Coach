from pydantic import BaseModel


class InterviewQuestionCreate(BaseModel):
    interview_id: int
    question: str
    answer: str
    score: float
    feedback: str