from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import os
import uuid


def generate_pdf(report):

    filename = f"report_{uuid.uuid4().hex}.pdf"

    folder = "reports"

    os.makedirs(folder, exist_ok=True)

    filepath = os.path.join(folder, filename)

    styles = getSampleStyleSheet()

    pdf = SimpleDocTemplate(filepath)

    elements = []

    elements.append(Paragraph("<b>AI Interview Report</b>", styles["Title"]))

    elements.append(Paragraph(f"Score: {report['score']}/10", styles["Heading2"]))

    elements.append(Paragraph("<b>Strengths</b>", styles["Heading2"]))

    for item in report["strengths"]:
        elements.append(Paragraph(f"• {item}", styles["BodyText"]))

    elements.append(Paragraph("<b>Weaknesses</b>", styles["Heading2"]))

    for item in report["weaknesses"]:
        elements.append(Paragraph(f"• {item}", styles["BodyText"]))

    elements.append(Paragraph("<b>Feedback</b>", styles["Heading2"]))

    elements.append(Paragraph(report["feedback"], styles["BodyText"]))

    pdf.build(elements)

    return filepath