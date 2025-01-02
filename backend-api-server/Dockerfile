# Use the official Node.js LTS (Long Term Support) image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install pm2 -g

# Copy the rest of the application code
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the necessary ports
EXPOSE 3001 3002 3003

# Define the environment variable for production
ENV NODE_ENV=production

# Start the application using PM2 and the ecosystem configuration
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
