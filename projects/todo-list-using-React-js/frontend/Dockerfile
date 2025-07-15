FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

ARG APP_ENV=development
COPY . .
RUN npm run build

FROM alpine:latest AS static
WORKDIR /app

COPY --from=builder /app/build /app/build

# This exposes build folder as /app/build which gets mounted to the volume
CMD ["sh", "-c", "while true; do sleep 1000; done"]
