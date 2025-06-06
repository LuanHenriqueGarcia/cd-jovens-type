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
- `GET /api/videos/:id/comments` – Comentários de um vídeo
- `POST /api/videos/:id/comments` – Adiciona um novo comentário

Estas rotas retornam dados simulados que correspondem às informações usadas no front-end.

## Docker

Um `Dockerfile` está disponível para construir e executar a aplicação completa (frontend e backend).

```bash
# Construir a imagem
docker build -t codifica-jovens .

# Executar o contêiner
docker run -p 3000:3000 codifica-jovens
```

O site ficará disponível em `http://localhost:3000`.

## Banco de dados

O arquivo `database.sql` contém um exemplo de esquema SQL com dados iniciais para professores, alunos, módulos e comentários. Ele pode ser importado em um banco de dados SQLite ou qualquer SGBD compatível.
