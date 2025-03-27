# Use Node.js 18 base image
FROM node:18

# Set working directory
WORKDIR /app
COPY . .
# Copy package files first for better caching

# Install dependencies
RUN npm install

# Copy the rest of the application

# Expose the port
EXPOSE 3000

# Default command to start the application
CMD ["node", "src/server.js"]