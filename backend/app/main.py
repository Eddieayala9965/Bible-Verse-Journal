from fastapi import FastAPI
from .routes import journal, user
from .db import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(journal.router)
app.include_router(user.router)

