# ---------- Stage 1: Build Angular App ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Accept build-time environment variable, default to development
ARG APP_ENV=development
ENV APP_ENV=$APP_ENV

# Copy app source
COPY . .

# Run the appropriate npm build script dynamically
RUN npm run build:$APP_ENV

# ---------- Stage 2: Prepare static build output ----------
FROM alpine:latest AS static

WORKDIR /app

# Copy Angular dist output from builder stage
COPY --from=builder /app/dist/client /app/build

# Dummy infinite loop to keep container running (for debugging or static volume mount)
CMD ["sh", "-c", "while true; do sleep 1000; done"]
