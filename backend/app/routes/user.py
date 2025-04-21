from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from .. import models
from ..schemas import UserCreate, UserResponse, UserLogin
from ..db import get_db
from ..auth import hashpassword, get_current_user, verify_password, create_access_token
from datetime import timedelta
from typing import Dict
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = hashpassword(user.password)
    new_user = models.User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(
    user_credentials: UserLogin = Body(...),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter_by(email=user_credentials.email).first()
    
    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user