from fastapi import FastAPI
from app.routers import interview, auth

app = FastAPI(title="AI Interview Coach API")

app.include_router(interview.router)
app.include_router(auth.router)


@app.get("/")
def home():
    return {"message": "Welcome to AI Interview Coach"}