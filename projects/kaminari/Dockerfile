# ----------- Stage 1: Dependencies + Build ------------
FROM node:18-alpine AS builder

WORKDIR /app
RUN apk add --no-cache curl
# Accept build-time argument
ARG APP_ENV=production
ENV APP_ENV=$APP_ENV

# Install OS dependencies (optional: add bash, curl, etc.)
RUN apk add --no-cache libc6-compat

# Copy only the necessary files first to cache dependencies
COPY package.json package-lock.json ./

# Install deps based on APP_ENV
RUN if [ "$APP_ENV" = "development" ]; then \
      npm install; \
    else \
      npm ci; \
    fi

# Copy rest of the app
COPY . .

# Always build, regardless of environment
RUN npm run build

# ----------- Stage 2: Runtime ------------
FROM node:18-alpine AS runner

WORKDIR /app

# Accept build-time arg
ARG APP_ENV=production
ENV APP_ENV=$APP_ENV

# Install OS dependencies
RUN apk add --no-cache libc6-compat

# Copy only runtime artifacts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

# Instaling CURL for health checks or other purposes
RUN apk add --no-cache curl
# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
