# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS build-stage
WORKDIR /app

# Install OpenSSL compatibility (Important for some dependencies)
RUN apk add --no-cache openssl

# Set npm config to avoid cache issues during build
RUN npm config set cache /tmp/.npm-cache

# Copy package.json and lock files FIRST
COPY package*.json ./
COPY prisma ./prisma

# Explicitly set npm version (consistent across stages)
RUN npm install -g npm@10.8.2 # Match your host if possible

# Install dependencies (using --legacy-peer-deps if needed)
RUN npm install --verbose --legacy-peer-deps

# Run Prisma generate
RUN npx prisma generate --schema=prisma/schema.prisma

# Copy the rest of the application files AFTER dependency installation
COPY . .

# Increase memory limit (if still needed after cache fix)
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine AS production-stage
WORKDIR /app

# Install OpenSSL compatibility
RUN apk add --no-cache openssl

# Set npm config to avoid cache issues in production stage
# RUN npm config set cache /tmp/.npm-cache

# Copy package.json and lock files
COPY package*.json ./

# Install only production dependencies using ci (clean install)
RUN npm ci

# Copy Prisma artifacts
COPY --from=build-stage /app/prisma ./prisma
COPY --from=build-stage /app/node_modules/.prisma ./node_modules/.prisma

# Copy the built app
COPY --from=build-stage /app/next.config.mjs ./
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public

# Set environment to production
ENV NODE_ENV=production

# Start the app (using a process manager like tini is recommended for production)
CMD ["npm", "start"]

