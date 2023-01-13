# 1. Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ./
RUN apk add --no-cache git openssh
RUN yarn --frozen-lockfile


# 2. Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Copy environment variables from production env file
ARG BUILD_ENV
COPY config/.env.${BUILD_ENV} ./.env
ARG COMMUNITY_API_KEY_ARG
RUN echo $COMMUNITY_API_KEY_ARG
# ENV COMMUNITY_API_KEY=${COMMUNITY_API_KEY_ARG}
RUN echo COMMUNITY_API_KEY=${COMMUNITY_API_KEY_ARG} >> ./.env
RUN grep COMMUNITY_API_KEY ./.env

# # This will do the trick, use the corresponding env file for each environment.
# COPY .env.production.sample .env.production
RUN yarn build

# 3. Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN grep COMMUNITY_API_KEY .env

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]