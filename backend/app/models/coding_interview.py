from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.database import Base


class CodingInterview(Base):

    __tablename__ = "coding_interviews"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    question = Column(String)

    difficulty = Column(String)

    code = Column(String)

    score = Column(Float)

    correctness = Column(String)

    time_complexity = Column(String)

    space_complexity = Column(String)

    feedback = Column(String)

    created_at = Column(DateTime(timezone=True), server_default=func.now())