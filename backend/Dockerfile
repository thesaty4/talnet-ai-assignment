# Use Node.js 18 base image
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to ensure dependencies are installed correctly
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY src/ ./
COPY keycloak.json /usr/src/app/keycloak.json


# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
