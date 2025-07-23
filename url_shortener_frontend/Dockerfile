# Stage 1: Base - Install pnpm and copy project files
FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable # Enables corepack, which can manage pnpm

WORKDIR /app
COPY . /app

# Stage 2: Production Dependencies - Install only production dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Stage 3: Build - Build the Next.js application
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Stage 4: Runner - Final image for running the application
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public

ENV NODE_ENV=production
ENV BACKEND_HOST='http://172.17.0.3:3005'

EXPOSE 3000
# Run the application
CMD ["pnpm", "start"]