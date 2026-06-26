# ==========================================
# Stage 1: Build the application
# ==========================================
FROM oven/bun:1.3-alpine AS builder
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package.json bun.lock ./

# Install all dependencies (including devDependencies needed for build)
RUN bun install --frozen-lockfile

# Copy the rest of your application source code
COPY . .

# Build the SvelteKit application (expects @sveltejs/adapter-node)
RUN bun run build

# Prune node_modules to only include production dependencies
RUN bun install --production --frozen-lockfile


# ==========================================
# Stage 2: Run the application
# ==========================================
FROM oven/bun:1.3-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy the build output and production node_modules from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/src ./src

# Expose the port SvelteKit runs on
EXPOSE 3000

# Start the application using Bun
CMD ["bun", "build/index.js"]