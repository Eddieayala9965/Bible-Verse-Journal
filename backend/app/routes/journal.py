from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models
from ..schemas import JournalCreate, JournalUpdate
from ..db import get_db
from ..auth import get_current_user

router = APIRouter()

@router.post("/journal")
def create_journal(entry: JournalCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    new_entry = models.JournalEntry(
        reference=entry.reference,
        text=entry.text,
        translation=entry.translation,
        notes=entry.notes,
        user_id=user.id
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

@router.get("/journal")
def get_all_entries(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user.id).all()


@router.get("/journal/{entry_id}")
def get_entry(entry_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    entry = db.query(models.JournalEntry).filter(
        models.JournalEntry.id == entry_id,
        models.JournalEntry.user_id == user.id
    ).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry

@router.put("/journal/{entry_id}")
def update_entry(entry_id: int, updated: JournalUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    entry = db.query(models.JournalEntry).filter(
        models.JournalEntry.id == entry_id,
        models.JournalEntry.user_id == user.id
    ).first()

    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")

    for field, value in updated.dict(exclude_unset=True).items():
        setattr(entry, field, value)

    db.commit()
    db.refresh(entry)
    return entry

@router.delete("/journal/{entry_id}")
def delete_entry(entry_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    entry = db.query(models.JournalEntry).filter(
        models.JournalEntry.id == entry_id,
        models.JournalEntry.user_id == user.id
    ).first()

    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")

    db.delete(entry)
    db.commit()
    return {"message": "Entry deleted"}


