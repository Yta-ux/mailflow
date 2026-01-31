import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.models import ProcessedTextResponse, TextInput
from app.services.ai_engine import ai_engine
from app.utils.processor import clean_text, download_nltk_resources, process_uploaded_file

load_dotenv()

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    download_nltk_resources()
    yield


app = FastAPI(
    title="Email Processing API",
    description="API para processamento e classificação de emails",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def parse_ai_error(error: RuntimeError) -> tuple[int, dict]:
    msg = str(error)
    if "RATE_LIMIT" in msg:
        return 429, {"error_code": "RATE_LIMIT", "message": "Limite de requisições excedido.", "retry_after": 60}
    elif "AUTH_ERROR" in msg:
        return 401, {"error_code": "AUTH_ERROR", "message": "Erro de autenticação com a API."}
    elif "CONNECTION_ERROR" in msg:
        return 503, {"error_code": "CONNECTION_ERROR", "message": "Falha de conexão com a API."}
    else:
        return 500, {"error_code": "AI_ERROR", "message": "Erro ao processar classificação."}


MAX_FILE_SIZE_MB = 5
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
MAX_BODY_LENGTH = 1500
MAX_FILE_EXTRACT_LENGTH = 30000


@app.get("/")
async def root() -> dict[str, str]:
    return {"status": "ok", "message": "Email Processing API v2.0.0"}


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "healthy"}


@app.post("/process/text", response_model=ProcessedTextResponse)
async def process_text(input_data: TextInput) -> ProcessedTextResponse:
    if len(input_data.text) > MAX_BODY_LENGTH:
        raise HTTPException(
            status_code=400,
            detail={"error_code": "VALIDATION_ERROR", "message": f"Texto do email excede o limite de {MAX_BODY_LENGTH} caracteres (~250 palavras)."}
        )

    nlp_result = clean_text(input_data.text)

    try:
        analysis = await ai_engine.classify_email(nlp_result.cleaned_text)
    except RuntimeError as e:
        status_code, detail = parse_ai_error(e)
        raise HTTPException(status_code=status_code, detail=detail)

    return ProcessedTextResponse(original_text=nlp_result.original_text, analysis=analysis)


@app.post("/process/file", response_model=ProcessedTextResponse)
async def process_file(file: UploadFile = File(...)) -> ProcessedTextResponse:

    file.file.seek(0, 2)
    file_size = file.file.tell()
    await file.seek(0)

    if file_size > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail={"error_code": "INVALID_FILE", "message": f"Arquivo excede o limite de {MAX_FILE_SIZE_MB}MB."}
        )

    try:
        extracted_text = await process_uploaded_file(file)
    except ValueError as e:
        raise HTTPException(status_code=400, detail={"error_code": "INVALID_FILE", "message": str(e)})


    if len(extracted_text) > MAX_FILE_EXTRACT_LENGTH:
         raise HTTPException(
            status_code=400,
            detail={"error_code": "VALIDATION_ERROR", "message": f"Conteúdo do arquivo muito extenso (> {MAX_FILE_EXTRACT_LENGTH} caracteres)."}
        )

    nlp_result = clean_text(extracted_text)

    try:
        analysis = await ai_engine.classify_email(nlp_result.cleaned_text)
    except RuntimeError as e:
        status_code, detail = parse_ai_error(e)
        raise HTTPException(status_code=status_code, detail=detail)

    return ProcessedTextResponse(original_text=nlp_result.original_text, analysis=analysis)
