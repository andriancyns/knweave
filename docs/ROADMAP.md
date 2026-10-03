# Knweave Roadmap

Where Knweave is going. Status: the wiki at `/app` is a **client-side prototype** (localStorage only) — everything below builds toward making it a real, self-hostable product.

Principles: light, collaborative, no bloat. Every phase must end with the app still runnable with one command.

---

## Phase 1 — Make it real · *current*

Turn the prototype into a working product with a backend.

- [ ] **Database schema** — `users`, `sections`, `pages` tables; page tree stays derived from `parentId` (see `apps/web/components/wiki/types.ts` — the model is already shaped for this)
- [ ] **API routes** — CRUD for sections and pages (`app/api/*` in Next.js App Router)
- [ ] **Auth** — email + password sessions first; OAuth (Google/GitHub) after
- [ ] **Server persistence** — replace `localStorage` (`knweave.wiki.v1`) with API calls; keep the same reducer actions in `useWikiStore.tsx`
- [ ] **Visibility enforcement** — `public` / `tim` / `privat` checked server-side, not just displayed

**Done when:** two browsers see the same wiki; data survives a cache clear.

## Phase 2 — Collaboration

- [ ] **Page history UI** — the `HistoryEntry` log already exists client-side; render it per page with restore
- [ ] **Comments** — inline comments on page sections
- [ ] **Presence** — who is viewing/editing a page right now
- [ ] **Notifications** — @mentions in pages and comments
- [ ] **Concurrent edit safety** — last-write-wins first, CRDT/OT only if users feel it

**Done when:** a 3-person team can edit the same wiki for a week without stepping on each other.

## Phase 3 — Self-hosting & ecosystem

- [ ] **Official Docker image** — one `docker compose up` for app + Postgres (the landing page already shows a `KNWEAVE_SECRET` compose example — make it true)
- [ ] **Export / import** — full wiki as Markdown + attachments in a zip
- [ ] **Full-text search** — Postgres `tsvector` behind the existing `⌘K` UI
- [ ] **Editor upgrades** — markdown toolbar, image upload, tables
- [ ] **Public page sharing** — `visibility: public` pages get a shareable link with no login

**Done when:** a non-developer can self-host Knweave in under 10 minutes.

---

## Non-goals

Things we deliberately will not build (no bloat):

- Plugin marketplace / app store
- Enterprise SSO & audit logs (until someone actually asks)
- Databases, spreadsheets, or any second product inside the wiki
- Mobile apps (the web app must be great on phones instead)

## Deferred decisions

| Question | When to decide |
|---|---|
| Postgres (self-host) vs hosted Neon | Start of Phase 1 |
| Real-time sync protocol | End of Phase 2, if presence + concurrency hurt |
| Monorepo split: wiki engine vs marketing site | If a second app appears in `apps/` |
