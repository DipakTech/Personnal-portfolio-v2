# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS build-stage
WORKDIR /app

# Install OpenSSL compatibility
RUN apk add --no-cache openssl

# Copy package.json and lock files to install dependencies
COPY package*.json ./
COPY prisma ./prisma

# Install all dependencies (including dev dependencies) for the build
RUN npm install

# Run Prisma generate with explicit schema path
RUN npx prisma generate --schema=prisma/schema.prisma

# Copy the rest of the application files
COPY . .

# Increase memory limit for Node.js during build
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine
WORKDIR /app

# Install OpenSSL compatibility
RUN apk add --no-cache openssl

# Copy package.json and lock files to install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy Prisma schema and generated client
COPY --from=build-stage /app/prisma ./prisma
COPY --from=build-stage /app/node_modules/.prisma ./node_modules/.prisma

# Copy the built app
COPY --from=build-stage /app/next.config.mjs ./
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public

# Set environment to production
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]