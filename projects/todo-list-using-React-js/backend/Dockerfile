# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build || npx tsc
EXPOSE 8000
CMD ["node", "dist/index.js"] 