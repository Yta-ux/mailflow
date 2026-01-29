import re
from dataclasses import dataclass

import fitz
import nltk
from fastapi import UploadFile
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize


def download_nltk_resources():
    for resource in ["punkt", "punkt_tab", "stopwords"]:
        try:
            nltk.download(resource, quiet=True)
        except Exception:
            nltk.download(resource)


@dataclass
class CleanedTextResult:
    original_text: str
    cleaned_text: str
    tokens: list[str]
    token_count: int


def clean_text(text: str) -> CleanedTextResult:
    if not text or not text.strip():
        return CleanedTextResult(original_text=text, cleaned_text="", tokens=[], token_count=0)

    processed = text.lower()
    processed = re.sub(r"[^\w\s]", " ", processed)
    processed = re.sub(r"\s+", " ", processed).strip()

    try:
        tokens = word_tokenize(processed, language="portuguese")
    except LookupError:
        tokens = processed.split()

    try:
        stop_words = set(stopwords.words("portuguese"))
    except LookupError:
        stop_words = set()

    filtered_tokens = [t for t in tokens if t not in stop_words and len(t) > 1]
    cleaned_text = " ".join(filtered_tokens)

    return CleanedTextResult(
        original_text=text,
        cleaned_text=cleaned_text,
        tokens=filtered_tokens,
        token_count=len(filtered_tokens)
    )


async def extract_text_from_txt(file: UploadFile) -> str:
    content = await file.read()
    try:
        return content.decode("utf-8")
    except UnicodeDecodeError:
        return content.decode("latin-1")


async def extract_text_from_pdf(file: UploadFile) -> str:
    content = await file.read()

    try:
        pdf_document = fitz.open(stream=content, filetype="pdf")
    except Exception as e:
        raise ValueError(f"Arquivo PDF corrompido ou inválido: {str(e)}")

    text_parts = []
    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]
        text = page.get_text("text", sort=True)
        if text.strip():
            text_parts.append(text)

    pdf_document.close()

    if not text_parts:
        raise ValueError("PDF não contém texto extraível")

    return "\n".join(text_parts)


async def process_uploaded_file(file: UploadFile) -> str:
    filename = file.filename or ""
    content_type = file.content_type or ""

    is_txt = filename.lower().endswith(".txt") or content_type == "text/plain"
    is_pdf = filename.lower().endswith(".pdf") or content_type == "application/pdf"

    if is_txt:
        return await extract_text_from_txt(file)
    elif is_pdf:
        return await extract_text_from_pdf(file)
    else:
        raise ValueError(f"Formato não suportado: '{filename}'. Formatos aceitos: .txt, .pdf")
