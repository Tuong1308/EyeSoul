# API image. Build from the repo root so the workspace lockfile is in context
# (`npm run api:build` does this through docker-compose.yml).

# Workspace manifests only, so `npm ci` matches the lockfile. Prisma's query engine needs OpenSSL.
FROM node:22-alpine AS base
RUN apk add --no-cache openssl
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

FROM base AS build
RUN npm ci --workspace @eyesoul/api --include-workspace-root=false --ignore-scripts
COPY packages/shared packages/shared
COPY apps/api apps/api
RUN cd apps/api && npx prisma generate && npm run build

FROM base
ENV NODE_ENV=production
RUN npm ci --workspace @eyesoul/api --include-workspace-root=false --omit=dev --ignore-scripts \
  && npm cache clean --force
COPY --from=build /app/node_modules/.prisma node_modules/.prisma
COPY --from=build /app/apps/api/dist apps/api/dist
WORKDIR /app/apps/api
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
