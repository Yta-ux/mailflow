import asyncio
import json
import os
import re

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.models import EmailAnalysis

load_dotenv()

MODEL_ID = "gemini-2.5-flash-lite"

SYSTEM_PROMPT = """Você é um assistente de triagem de emails para uma empresa financeira.

## CLASSIFICAÇÃO
- PRODUTIVO: Requer ação (solicitações, erros, suporte, docs).
- IMPRODUTIVO: Não requer ação (agradecimentos, spam, felicitações).

## PRIORIDADE
- Alta: Erros, reclamações, urgente
- Média: Solicitações normais
- Baixa: Informativos, agradecimentos

## RESPOSTA
Responda APENAS com JSON:
{
  "categoria": "Produtivo" | "Improdutivo",
  "prioridade": "Alta" | "Média" | "Baixa",
  "resumo": "Breve descrição do email",
  "justificativa": "Razão da classificação",
  "resposta_sugerida": "Resposta cordial e profissional em texto corrido, SEM quebras de linha"
}"""

MAX_RETRIES = 3
DEFAULT_WAIT = 15


class AIEngine:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY não configurada")

        self.client = genai.Client(api_key=api_key)
        self.semaphore = asyncio.Semaphore(2)

    async def classify_email(self, email_content: str) -> EmailAnalysis:
        contents = [
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=f"{SYSTEM_PROMPT}\n\nEmail: {email_content}")]
            )
        ]

        for attempt in range(MAX_RETRIES):
            async with self.semaphore:
                try:
                    response = await asyncio.to_thread(
                        self.client.models.generate_content,
                        model=MODEL_ID,
                        contents=contents,
                        config=types.GenerateContentConfig(
                            response_mime_type="application/json",
                            temperature=0.1
                        )
                    )

                    data = json.loads(response.text)
                    return EmailAnalysis(**data)

                except Exception as e:
                    error_msg = str(e)

                    if any(x in error_msg.lower() for x in ["429", "quota", "resource_exhausted"]):
                        wait_match = re.search(r"retryDelay': '(\d+)s'", error_msg)
                        wait_time = int(wait_match.group(1)) if wait_match else DEFAULT_WAIT
                        await asyncio.sleep(wait_time)
                        continue

                    break

        raise RuntimeError("AI_ERROR: Falha ao processar.")


ai_engine = AIEngine()