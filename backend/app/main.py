from fastapi import FastAPI
from app.routes import interview

app = FastAPI(
    title="AI Interview Coach",
    version="1.0"
)

app.include_router(interview.router)

@app.get("/")
def home():
    return {"message": "Welcome to AI Interview Coach 🚀"}