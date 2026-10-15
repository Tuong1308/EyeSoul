# Eye Soul

Web shop for Digital Cameras, Film Cameras and Film Rolls in Vietnam. Domain terms: `GLOSSARY.md`. Decisions: `docs/adr/`.

npm workspaces monorepo:

- `apps/web`: React + Vite storefront
- `apps/api`: NestJS + Prisma API
- `packages/shared`: DTO types used by both

## Local development

Needs Node 22+ (with npm) and Docker.

```sh
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

npm run db:up    # start Postgres in Docker (also creates the eyesoul_test database)
npm run db:setup # apply migrations and seed the catalog

npm run dev:api  # http://localhost:3000
npm run dev:web  # http://localhost:5173
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
npm run typecheck
npm test
```

API tests run over HTTP against the `eyesoul_test` database in the Docker Postgres (`npm run db:up` first); they migrate it automatically. Web tests render the app with the network mocked by MSW.
