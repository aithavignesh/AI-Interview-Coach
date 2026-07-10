from fastapi import APIRouter, UploadFile, File
from PyPDF2 import PdfReader
from app.services.resume_service import analyze_resume
from app.services.resume_interview_service import generate_resume_questions
router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    # Validate PDF
    if not file.filename.endswith(".pdf"):
        return {"message": "Please upload a PDF file."}

    # Read PDF
    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"

    analysis = analyze_resume(text)

    return {
        "filename": file.filename,
        "analysis": analysis
    }
@router.post("/interview")
async def resume_interview(data: dict):

    resume_text = data.get("resume_text")
    difficulty = data.get("difficulty", "Medium")

    return generate_resume_questions(
        resume_text,
        difficulty,
    )