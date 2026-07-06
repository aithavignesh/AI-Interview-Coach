from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import interview, auth, gemini

app = FastAPI(title="AI Interview Coach API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(interview.router)
app.include_router(auth.router)
app.include_router(gemini.router)

@app.get("/")
def home():
    return {"message": "Welcome to AI Interview Coach"}