# Estágio de Build (para instalar dependências e construir o frontend)
FROM node:18 AS builder
WORKDIR /app

# 1. Copia e constrói o Frontend
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm ci
RUN npm run build

# 2. Copia o Backend
WORKDIR /app
COPY backend ./backend
WORKDIR /app/backend
RUN npm install --production

# Estágio de Runtime (Imagem final mais leve)
FROM node:18-slim
WORKDIR /app

# Copia o Backend (com node_modules)
COPY --from=builder /app/backend ./backend
# Copia o Frontend construído (a pasta dist)
COPY --from=builder /app/frontend/dist ./frontend/dist

WORKDIR /app/backend
EXPOSE 3000

# O comando de inicialização usa o novo script 'start' do package.json
# que aponta para src/server.js
CMD ["npm", "start"]
