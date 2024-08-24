# Base image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Copy package.json and/or package-lock.json
COPY package*.json ./

# Install pm2
RUN npm install -g pm2

# Install dependencies
RUN npm ci

# Copy all source code
COPY . .

# Remove server directory (Laravel API)
RUN rm -rf server

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Run container as non-root user
USER node

# Start the application with PM2
CMD ["pm2-runtime", "npm", "--", "start"]