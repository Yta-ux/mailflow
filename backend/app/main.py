from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


class TextInput(BaseModel):
    text: str = Field(..., min_length=1)


class ProcessedTextResponse(BaseModel):
    original_text: str
    cleaned_text: str


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    yield


app = FastAPI(
    title="MailFlow API",
    description="API para processamento e classificação de emails",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "ok", "message": "MailFlow API v1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/process/text", response_model=ProcessedTextResponse)
async def process_text(input_data: TextInput):
    return ProcessedTextResponse(
        original_text=input_data.text,
        cleaned_text=input_data.text.lower().strip()
    )


@app.post("/process/file")
async def process_file(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode("utf-8")
    return {"filename": file.filename, "text": text[:100]}
