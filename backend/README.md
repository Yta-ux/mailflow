<p align="center">
    <a href="#-projeto">🖥 Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-tecnologias">👨‍💻 Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-executar-o-projeto">🖇 Execução do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-licença">📃 Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-observações">📌 Observações</a>
</p>

## 🖥 Projeto

O **MailFlow Backend** é a API responsável pela inteligência do sistema. Ele processa arquivos e textos recebidos, utiliza o modelo **Google Gemini 2.0 Flash Lite** para análise de conteúdo e retorna dados estruturados (JSON) para o frontend. A API é construída com **FastAPI** para alta performance e validação de dados.

## 👨‍💻 Tecnologias

As tecnologias usadas no backend foram:

- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Pydantic](https://docs.pydantic.dev/)
- [NLTK](https://www.nltk.org/) (Processamento de Linguagem Natural)
- [PyMuPDF](https://pymupdf.readthedocs.io/) (Leitura de PDF)
- [Uvicorn](https://www.uvicorn.org/)

## 🖇 Executar o Projeto

Para executar a API, siga os passos:

1. **Entre no diretório**
   ```bash
   cd backend
   ```

2. **Crie o ambiente virtual**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as Variáveis de Ambiente**
   Crie um arquivo `.env` na raiz do backend com sua chave da API:
   ```env
   GOOGLE_API_KEY=sua_chave_aqui
   ```

5. **Inicie o servidor**
   ```bash
   uvicorn app.main:app --reload
   ```
   A API estará rodando em `http://localhost:8000`.
   Acesse `http://localhost:8000/docs` para ver a documentação interativa (Swagger UI).

## 📃 Licença

Esse projeto possui licença MIT. Para mais detalhes consulte o arquivo [LICENSE](../LICENSE).

## 📌 Observações

- A verificação de arquivos `.env` é crítica para o funcionamento da IA.
- O endpoint `/process/file` aceita arquivos PDF e TXT.
- ⚠️ **Aviso de Infraestrutura:** A API está hospedada no serviço **Render (Free Tier)**. Por isso, a primeira requisição pode levar até **50 segundos** (Cold Start) para acordar o servidor. As requisições subsequentes são rápidas.
