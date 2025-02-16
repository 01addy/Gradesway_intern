# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install TypeScript globally
RUN npm install -g typescript

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including TypeScript and other packages)
RUN npm install

# Copy the Prisma schema and generate the Prisma Client
COPY prisma/ ./prisma/
RUN npx prisma generate

# Copy the backend source code into the container
COPY src/ ./src/
COPY tsconfig.json ./

# Build the TypeScript code (tsc will look for tsconfig.json)
RUN tsc

# Expose the app's port (5000 is the default for Express)
EXPOSE 5000

# Run the backend app using ts-node or compiled JavaScript
CMD ["npm", "run", "dev"]