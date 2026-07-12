from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.services.pdf_service import generate_pdf

router = APIRouter(
    prefix="/report",
    tags=["Report"]
)


@router.post("/download")
def download_report(data: dict):

    path = generate_pdf(data)

    return FileResponse(
        path,
        filename="Interview_Report.pdf",
        media_type="application/pdf"
    )