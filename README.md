# Eye Soul

Web shop for Digital Cameras, Film Cameras and Film Rolls in Vietnam. Domain terms: `GLOSSARY.md`. Decisions: `docs/adr/`.

pnpm monorepo:

- `apps/web`: React + Vite storefront
- `apps/api`: NestJS + Prisma API
- `packages/shared`: DTO types used by both

## Local development

Needs Node 22+, pnpm 9 and Docker.

```sh
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

pnpm db:up      # start Postgres in Docker (also creates the eyesoul_test database)
pnpm db:setup   # apply migrations and seed the catalog

pnpm dev:api    # http://localhost:3000
pnpm dev:web    # http://localhost:5173
```

Configuration is environment-only:

| Variable       | App | Purpose                         |
| -------------- | --- | ------------------------------- |
| `DATABASE_URL` | api | Postgres connection string      |
| `WEB_ORIGIN`   | api | Origin allowed through CORS     |
| `PORT`         | api | HTTP port (default 3000)        |
| `VITE_API_URL` | web | Base URL of the API             |

## Tests

```sh
pnpm typecheck
pnpm test
```

API tests run over HTTP against the `eyesoul_test` database in the Docker Postgres (`pnpm db:up` first); they migrate it automatically. Web tests render the app with the network mocked by MSW.
