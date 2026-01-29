from typing import Literal

from pydantic import BaseModel, Field


class TextInput(BaseModel):
    text: str = Field(..., min_length=1)


class EmailAnalysis(BaseModel):
    categoria: Literal["Produtivo", "Improdutivo"]
    prioridade: Literal["Alta", "Média", "Baixa"]
    resumo: str
    justificativa: str
    resposta_sugerida: str


class ProcessedTextResponse(BaseModel):
    original_text: str
    analysis: EmailAnalysis


class ErrorDetail(BaseModel):
    error_code: str
    message: str
    retry_after: int | None = None
