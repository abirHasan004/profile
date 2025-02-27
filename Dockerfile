# Use an official Node.js runtime
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy all project files
COPY . .

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "index.js"]
