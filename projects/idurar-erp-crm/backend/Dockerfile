# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# Use NODE_ENV to control devDependencies installation
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm ci --only=production; \
    else npm ci; \
    fi

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change if not 5000)
EXPOSE 5000

# Default command (can be overridden in docker-compose or at runtime)
CMD ["npm", "start"]
