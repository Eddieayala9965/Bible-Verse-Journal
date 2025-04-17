from pydantic import BaseModel

# USERS

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    username: str | None = None
    email: str | None = None
    password: str | None = None


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


