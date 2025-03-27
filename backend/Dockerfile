# Use Node.js 18 base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY src/ ./
COPY keycloak.json /usr/src/app/keycloak.json

# Expose the port
EXPOSE 3000

# Default command to start the application
CMD ["node", "server.js"]