from typing import Literal

from pydantic import BaseModel, Field


class TextInput(BaseModel):
    text: str = Field(..., min_length=1)


class EmailAnalysis(BaseModel):
    category: Literal["Productive", "Unproductive"]
    priority: Literal["High", "Medium", "Low"]
    summary: str
    justification: str
    suggested_reply: str


class ProcessedTextResponse(BaseModel):
    original_text: str
    analysis: EmailAnalysis


class ErrorDetail(BaseModel):
    error_code: str
    message: str
    retry_after: int | None = None
