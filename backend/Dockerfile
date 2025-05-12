# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]
