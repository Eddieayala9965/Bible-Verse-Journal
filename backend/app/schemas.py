from pydantic import BaseModel

# USERS

class UserCreate(BaseModel):
    username: str | None = None
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    username: str | None = None
    email: str | None = None
    password: str | None = None

class UserResponse(BaseModel):
    id: int
    username: str | None = None
    email: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# JOURNAL ENTRIES

class JournalCreate(BaseModel):
    reference: str
    text: str
    translation: str
    notes: str

class JournalUpdate(BaseModel):
    reference: str | None = None
    text: str | None = None
    translation: str | None = None
    notes: str | None = None


