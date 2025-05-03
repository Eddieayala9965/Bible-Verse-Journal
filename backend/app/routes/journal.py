from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from .. import models
from ..schemas import JournalCreate, JournalUpdate
from ..db import get_db
from ..auth import get_current_user
from typing import Optional

router = APIRouter()

@router.post("/create_journal")
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

@router.get("/get_all_journal")
def get_all_entries(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user.id).all()

@router.get("/search_journal")
def search_entries(
    query: str = Query(None, description="Search in reference, text, translation, or notes"),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    base_query = db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user.id)
    
    if query:
        search = f"%{query}%"
        base_query = base_query.filter(
            or_(
                models.JournalEntry.reference.ilike(search),
                models.JournalEntry.text.ilike(search),
                models.JournalEntry.translation.ilike(search),
                models.JournalEntry.notes.ilike(search)
            )
        )
    
    return base_query.all()


@router.put("/journal/{entry_id}")
def update_entry(entry_id: int, updated: JournalUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    entry = db.query(models.JournalEntry).filter(
        models.JournalEntry.id == entry_id,
        models.JournalEntry.user_id == user.id
    ).first()

    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")

   
    if updated.notes is not None:
        entry.notes = updated.notes
        db.commit()
        db.refresh(entry)
        return entry
    
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


