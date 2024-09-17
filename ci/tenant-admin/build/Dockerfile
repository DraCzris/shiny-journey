FROM node:20-alpine AS base
 
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .

# take only neccessary dependencies
RUN turbo prune tenant-admin --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=tenant-admin...
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /app/apps/tenant-admin/next.config.js .
COPY --from=installer /app/apps/tenant-admin/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/tenant-admin/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/tenant-admin/.next/static ./apps/tenant-admin/.next/static
# public folder might not exist
COPY --from=installer --chown=nextjs:nodejs /app/apps/tenant-admin/publi[c] ./apps/tenant-admin/public

# Run production build
CMD node apps/tenant-admin/server.js