# Codifica Jovens

Este repositório contém a versão front-end de um projeto educacional para jovens desenvolvedores. Agora também inclui um pequeno backend em Node.js que fornece dados para a aplicação.

## Estrutura

- `codifica-jovens/project` – Código front-end (Vite + TypeScript)
- `backend` – Servidor Express com algumas rotas de exemplo

## Como executar o backend

```bash
cd backend
npm install
npm start
```

O servidor iniciará na porta `3000` por padrão e disponibilizará as seguintes rotas:

- `GET /api/professors` – Lista de professores
- `GET /api/alunos` – Lista de alunos
- `GET /api/modulos` – Lista de módulos de vídeo

Estas rotas retornam dados simulados que correspondem às informações usadas no front-end.
