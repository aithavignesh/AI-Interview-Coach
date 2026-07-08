from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from datetime import datetime

from app.database.database import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    role = Column(String, nullable=False)
    interview_type = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)

    average_score = Column(Float)

    created_at = Column(DateTime, default=datetime.utcnow)