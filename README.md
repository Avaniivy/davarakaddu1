# Devara Kaadu 🌿

A web app for documenting and monitoring India's sacred groves (*devara kaadu* means "god's forest" in Kannada). Built as a conservation tool that bridges traditional ecological knowledge with modern threat reporting.

![Sacred Grove](https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80)

## What it does

Sacred groves are small forest patches protected by local communities for centuries through religious belief. Many of them are now under threat from encroachment, illegal logging, and development. This app tries to bring some visibility to that.

- **Grove directory** — browse India's sacred groves with conservation status, location, and cultural context
- **Species tracker** — flora and fauna found in these groves, including conservation status and medicinal uses
- **Myths & Legends** — traditional beliefs and ecological facts side by side
- **Alert system** — anyone can report a threat (encroachment, fire, dumping, etc.); admins can track and update status
- **Photo uploads** — attach photo evidence when reporting alerts

## Tech stack

- **Frontend:** React 19 + Vite, TailwindCSS, shadcn/ui, TanStack Query, wouter
- **Backend:** Express 5, PostgreSQL, Drizzle ORM
- **Auth:** Session-based (express-session + bcryptjs)
- **API:** Contract-first with OpenAPI + Orval codegen
- **Storage:** GCS object storage for alert photos

## Getting started

You'll need Node.js 20+ and a PostgreSQL database.

```bash
# install dependencies
pnpm install

# set up your environment
cp .env.example .env
# fill in DATABASE_URL in .env

# push the database schema
pnpm --filter @workspace/db run push

# run the API server
pnpm --filter @workspace/api-server run dev

# run the frontend (in another terminal)
pnpm --filter @workspace/devara-kaadu run dev
```

The frontend runs on `http://localhost:5173` and the API on `http://localhost:8080`.

## Project structure

```
artifacts/
  api-server/       # Express backend
  devara-kaadu/     # React frontend
lib/
  db/               # Drizzle schema + migrations
  api-spec/         # OpenAPI spec + Orval config
  api-zod/          # Generated Zod schemas + React Query hooks
```

## Default credentials (dev only)

```
username: admin
password: grove123
```

New users can also sign up directly from the login page.

## Contributing

If you know of any sacred groves not listed here, or want to add species data — open an issue or PR. The goal is to eventually cover as many of India's ~100,000 sacred groves as possible (currently there are only a handful of sample entries).

## License

MIT
