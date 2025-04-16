from pydantic import BaseModel

class JournalCreate(BaseModel):
    refernce: str
    text: str
    translation: str
    notes: str