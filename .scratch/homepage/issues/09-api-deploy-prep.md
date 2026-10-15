# 09: API deploy preparation

Spec: `.scratch/homepage/spec.md`

**What to build:** The API can be built into a container image and pointed at Supabase Postgres purely through configuration, with written run instructions, so a later deploy to a container host needs no code changes. Nothing is actually deployed.

**Blocked by:** 01

**Status:** done

- [x] A Dockerfile builds and runs the API image
- [x] Database URL, allowed web origin and port are configured via environment variables, with an example env file that contains no real secrets
- [x] Migrations can be applied against a production database URL with one documented command
- [x] The built image starts locally against the Docker Compose Postgres and serves the homepage endpoint
- [x] The README documents local dev, testing and building the image
