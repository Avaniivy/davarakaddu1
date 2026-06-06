# Devara Kaadu — Sacred Grove Sentinel

A digital sanctuary documenting India's sacred groves, bridging traditional beliefs with scientific conservation.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/devara-kaadu run dev` — run the frontend (port from $PORT)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, TanStack Query, wouter routing, shadcn/ui, lucide-react, tailwindcss
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec → React Query hooks + Zod schemas)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for all endpoints)
- `lib/api-spec/orval.config.ts` — Orval codegen config
- `lib/api-zod/src/generated/` — generated Zod schemas and React Query hooks (do not edit)
- `lib/db/src/schema/` — Drizzle ORM schema (groves, species, legends, alerts)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/devara-kaadu/src/pages/` — React page components
- `artifacts/devara-kaadu/src/components/` — Shared UI components (layout, shadcn/ui)

## Architecture decisions

- Contract-first API: OpenAPI spec drives both server Zod validation and client React Query hooks via Orval codegen.
- `lib/api-zod/src/index.ts` must only export `export * from "./generated/api"` — codegen regenerates it.
- `schemas` option removed from Orval zod output to prevent naming conflicts between types and schemas.
- All pages use real API hooks from `@workspace/api-client-react` — no mock data.
- Alert status can be updated inline on the Alerts page (PATCH /api/alerts/:id).

## Product

- **Sanctuary (Home)** — hero section, live stats (total groves, active alerts, well-preserved count), featured grove cards
- **Grove Directory** — searchable/filterable grid of sacred groves with conservation status badges
- **Grove Detail** — per-grove page with tabbed view: Myths & Legends, Species, Alerts
- **Species Scanner** — searchable species list with conservation status, medicinal uses, cultural significance
- **Myths & Legends** — tabbed view of traditional beliefs and scientific facts, filterable by type
- **Conservation Alerts** — list of reported threats with inline status management (reported → investigating → resolved)
- **Report Alert** — form to submit new conservation alerts linked to a specific grove

## User preferences

- Web app (React + Vite) over mobile

## Gotchas

- Do not run `pnpm dev` or `pnpm run dev` at workspace root — use workflows or `pnpm --filter` instead.
- After adding new routes to Express, restart the `artifacts/api-server: API Server` workflow (it rebuilds with esbuild then starts).
- After schema changes: run `pnpm --filter @workspace/db run push` then restart API server.
- After OpenAPI spec changes: run codegen, then restart both workflows.
- The `groveType` and `state` Select filters on the Groves page use the string `"all"` as a sentinel — the query hook receives `undefined` when that value is set.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
