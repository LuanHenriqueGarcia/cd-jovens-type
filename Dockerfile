# Build stage
FROM node:18 AS builder
WORKDIR /app

# Build frontend
COPY codifica-jovens/project ./codifica-jovens/project
RUN cd codifica-jovens/project && npm ci && npm run build

# Install backend dependencies
COPY backend ./backend
RUN cd backend && npm ci --omit=dev

# Copy built frontend into backend public folder
RUN mkdir -p backend/public && cp -r codifica-jovens/project/dist/* backend/public/

# Runtime stage
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/backend ./backend

WORKDIR /app/backend
EXPOSE 3000
CMD ["npm", "start"]
