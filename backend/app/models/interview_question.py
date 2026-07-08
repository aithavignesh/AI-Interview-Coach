from sqlalchemy import Column, Integer, Text, Float, ForeignKey
from app.database.database import Base


class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    id = Column(Integer, primary_key=True, index=True)

    interview_id = Column(Integer, ForeignKey("interviews.id"))

    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)

    score = Column(Float)

    feedback = Column(Text)