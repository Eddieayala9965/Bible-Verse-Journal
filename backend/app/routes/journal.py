from fastapi import APIRouter, Depends
from sqlalchemy.orm import session
from .. import models, schemas
from ..db import get_db

router = APIRouter()

@router.post("/journal")
def save_journal(entry: schemas.JournalCreate, db: Session = Depends(get_db)):
    new_entry = models.JournalEntry(**entry.model_dump)
    db.add(new_entry)
    db.commit
    db.refresh(new_entry)
    return new_entry
