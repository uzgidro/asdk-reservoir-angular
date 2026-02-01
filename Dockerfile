# Stage 1: Install dependencies with Bun (fast)
FROM oven/bun:alpine AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Stage 2: Build with Node (Angular compatibility)
FROM node:22.13.1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 2: Serve with nginx-unprivileged (runs as non-root)
FROM nginxinc/nginx-unprivileged:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/srmt-front/browser /usr/share/nginx/html

EXPOSE 8080
