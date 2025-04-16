from fastapi import FastAPI
from .routes import journal
from .db import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(journal.router)
