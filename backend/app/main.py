from fastapi import FastAPI

app = FastAPI(
    title="MailFlow API",
    description="API para processamento e classificação de emails",
    version="1.0.0"
)


@app.get("/")
async def root():
    return {"status": "ok", "message": "MailFlow API v1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
