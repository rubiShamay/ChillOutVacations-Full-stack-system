
# Inherit from node over linux alpine:
FROM node:18-alpine3.19

# Create app folder:
WORKDIR /app

# Copy package.json + package-lock.json:
COPY package.json* /app

# Install node_modules:
RUN npm i 

# Copy entire backend:
COPY . /app

# Execute command for the container:
ENTRYPOINT npm start