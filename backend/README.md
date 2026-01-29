# MailFlow Backend

API de triagem de emails com IA. Classifica emails automaticamente em produtivo/improdutivo e sugere respostas.

## Stack

- FastAPI
- Google Gemini (classificação)
- NLTK (tokenização)
- PyMuPDF (extração de PDF)

## Setup

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Copie o `.env.example` para `.env` e configure sua API key do Google.

## Rodar

```bash
uvicorn app.main:app --reload
```

Acesse `http://localhost:8000/docs` para a documentação interativa.

## Endpoints

- `POST /process/text` — recebe JSON com `{ "text": "..." }`
- `POST /process/file` — recebe upload de PDF ou TXT

A resposta inclui categoria, prioridade, resumo e sugestão de resposta.
