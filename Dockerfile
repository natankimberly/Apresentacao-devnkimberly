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
# Also install su-exec for permission handling in entrypoint
RUN npm install --omit=dev --legacy-peer-deps && apk add --no-cache su-exec

# Copy built assets from builder stage logic
COPY --from=builder /app/dist ./dist

# Copy server script and entrypoint
COPY server.js .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Create data directory (will be overridden by volume, but good practice)
RUN mkdir -p /app/data && chown -R node:node /app/data

# IMPORTANT: Start as ROOT so entrypoint.sh can fix permissions on the mounted volume
# entrypoint.sh will override permissions and then switch to USER node using su-exec
USER root

# Expose port 80
EXPOSE 80

# Entrypoint script handles permissions + starting server
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "server.js"]
