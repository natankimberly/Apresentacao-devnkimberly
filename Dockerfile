# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application with Node.js (Express + SQLite)
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install production dependencies (express, sqlite3, etc)
RUN npm install --omit=dev --legacy-peer-deps

# Copy built assets from builder stage logic
COPY --from=builder /app/dist ./dist

# Copy server script
COPY server.js .

# Create data directory for SQLite persistence
RUN mkdir -p /app/data && chown -R node:node /app/data

# Use non-root user (Security Best Practice)
USER node

# Expose port 80
EXPOSE 80

# Start Node Server
CMD ["node", "server.js"]
