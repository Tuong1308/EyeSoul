# Separate React SPA and NestJS API

The shop is built as a React (Vite) single-page app talking to a standalone NestJS API over HTTP, in one npm workspaces monorepo with a shared types package, rather than as a single full-stack app such as Next.js. A full-stack framework would be simpler to run and better for product-page SEO; we accept that cost because the project's goal includes learning and demonstrating backend engineering as its own layer.
