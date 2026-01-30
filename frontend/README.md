<p align="center">
    <a href="#-projeto">🖥 Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-tecnologias">👨‍💻 Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-executar-o-projeto">🖇 Execução do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-licença">📃 Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-observações">📌 Observações</a>
</p>

<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; flex-wrap: wrap" align="center">
    <img width="700" style="border-radius: 5px" height="auto" alt="MailFlow Frontend Interface" src="../.github/home.png"/>
</div>

## 🖥 Projeto

O **MailFlow Frontend** é a interface de usuário do sistema. Desenvolvida para ser intuitiva e visualmente impactante, utiliza um design system moderno com feedback visual em tempo real (steppers, toasts, animações). O foco é permitir que o usuário faça o upload ou input de texto e receba a análise da IA de forma clara.

## 👨‍💻 Tecnologias

As tecnologias usadas no frontend foram:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescript.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/) (Componentes de UI)
- [Lucide React](https://lucide.dev/) (Ícones)
- [Axios](https://axios-http.com/) (Comunicação com API)

## 🖇 Executar o Projeto

Para executar o frontend, siga os passos:

1. **Entre no diretório**
   ```bash
   cd frontend
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   # ou npm install
   ```

3. **Inicie a aplicação**
   ```bash
   pnpm dev
   # ou npm run dev
   ```
   Acesse a aplicação em `http://localhost:3000`.

## 📃 Licença

Esse projeto possui licença MIT. Para mais detalhes consulte o arquivo [LICENSE](../LICENSE).

## 📌 Observações

- Certifique-se de que o backend esteja rodando na porta 8000 para que as requisições funcionem.
- O design é responsivo e suporta modo claro/escuro.
