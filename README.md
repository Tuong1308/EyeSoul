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

## API image

`apps/api/Dockerfile` builds a production image of the API. Build it from the repo root:

```sh
npm run api:build    # builds the eyesoul-api image
```

The image reads `DATABASE_URL`, `WEB_ORIGIN` and `PORT` from its environment and refuses to start if the first two are missing. It does not run migrations.

To try the image locally against the Docker Compose Postgres (after `npm run db:setup`):

```sh
npm run api:up    # builds and serves http://localhost:3000/homepage
```

If port 3000 is taken (e.g. by `dev:api`), pick another host port: `API_HOST_PORT=3001 npm run api:up` in bash, or `$env:API_HOST_PORT=3001; npm run api:up` in PowerShell.

## Production database

Production uses Supabase Postgres. Apply migrations to it from a checkout with one command, passing the connection string in the environment (it takes precedence over `apps/api/.env`):

```sh
# bash
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@<host>:5432/postgres" npm run db:deploy
```

```powershell
# PowerShell
$env:DATABASE_URL="postgresql://postgres.<project-ref>:<password>@<host>:5432/postgres"; npm run db:deploy
```

Use Supabase's direct or session-mode connection (port 5432) for migrations. Never seed production. Nothing is deployed yet; a container host only needs the image plus the three environment variables above.
