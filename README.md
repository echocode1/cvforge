# John Shell

Reusable full-stack starter. Copy it, run the init script, build features.

**Stack:** Next.js 15 (App Router) · NestJS · MUI v6 · TanStack Query v5 · Axios · Prisma/PostgreSQL (ready, not wired) · strict TypeScript · Turborepo + pnpm

## Structure

```
apps/
  api/            NestJS REST API   -> GET /api/health, Swagger at /docs
  web/            Next.js app       -> page using the UI package + API client
packages/
  types/          Shared TS types (ApiResponse, ApiError, HealthStatus)   [compiled to dist]
  utils/          Shared helpers                                         [compiled to dist]
  ui/             MUI theme + component library                          [TS source]
  api-client/     Axios instance, services, query keys, hooks, QueryProvider [TS source]
```

`types` and `utils` are compiled because the API (CommonJS) imports them at runtime.
`ui` and `api-client` are only used by the web app, so Next.js transpiles them from source (`transpilePackages`).

## Start a new project

```bash
cp -r cvforge my-project && cd my-project
node scripts/init.mjs my-project     # renames @cvforge/* -> @my-project/*
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
pnpm install
pnpm dev                              # web :3000, api :4000
```

Open http://localhost:3000 — you should see the component-library box and "This is my service" from the API.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Run API + web (builds shared packages first) |
| `pnpm build` | Build everything |
| `pnpm lint` / `pnpm typecheck` / `pnpm test` | Quality checks (also run in CI) |
| `pnpm db:generate` / `db:migrate` / `db:studio` | Prisma, once you wire a database |

## How to add a feature (example: "cvs")

1. **Types** — add `packages/types/src/cv.ts`, export it from `index.ts`.
2. **API** — add `apps/api/src/cvs/` (module, controller, service, DTOs). Register `CvsModule` in `app.module.ts`. Return plain data; the interceptor wraps it in `{ success, data }`.
3. **API client** — add `services/cvs.service.ts`, an entry in `query-keys.ts`, and `hooks/useCvs.ts`; export from `index.ts`.
4. **UI** — add reusable components to `packages/ui/src/components`; export from `index.ts`.
5. **Web** — add a route in `apps/web/src/app/` that composes the hooks and components.

## Wiring the database (Prisma)

The schema and scripts exist but `PrismaService` is not created, so the shell runs without a database.
When a project needs one: set `DATABASE_URL`, run `pnpm db:generate && pnpm db:migrate`, then add a `PrismaService extends PrismaClient` + `PrismaModule` in `apps/api/src/prisma/` and import it where needed.
(Prisma needs to download engine binaries on first `generate`, so it needs normal internet access.)

## Conventions

- Strict TypeScript, no `any` (ESLint error).
- Conventional commits enforced by commitlint + husky; Prettier + ESLint on staged files.
- Theme tokens live in `packages/ui/src/theme/theme.ts` (light/dark via MUI CSS variables).
- Auth: `configureHttp({ getToken })` in `apps/web/src/app/providers.tsx` is where a token getter plugs in.
