from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.sql import func
from .db import Base

class JournalEntry(Base):
    __tablename__ = "journal_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    reference = Column(String, nullable=False)
    text = Column(String, nullable=False)
    translation = Column(String, nullable=False)
    notes = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

