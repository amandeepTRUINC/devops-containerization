# Use official Ubuntu base
FROM ubuntu:latest

# Avoid interactive prompts during install
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js, npm, Vim, curl, git, and other helpful tools
RUN apt update && \
    apt install -y curl gnupg vim git net-tools tree && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt install -y nodejs && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /projects