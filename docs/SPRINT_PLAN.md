# Knweave Sprint Plan

Two-week sprints. This file tracks the **current and next sprint**; completed sprints stay here as a log. Source of truth for the long arc: [ROADMAP.md](./ROADMAP.md).

Status legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Sprint 1 — Foundation · *5–16 Oct 2026* · **current**

Goal: **stop lying in the UI** — wiki edits must land on a server, not localStorage.

- [ ] Postgres schema: `users`, `sections`, `pages` (mirror `wiki/types.ts` fields 1:1)
- [ ] DB migration tooling chosen and wired (drizzle or prisma — decide day 1)
- [ ] API routes: `GET/POST /api/sections`, `GET/POST /api/pages`, `PATCH/DELETE /api/pages/[id]`
- [ ] Email + password auth, session cookie
- [ ] `useWikiStore` hydrates from API instead of `localStorage` (seed data becomes the fresh-install default)
- [ ] CI: lint + build on push (GitHub Actions)

### Out of scope (resist)
Visibility enforcement, page history UI, real-time anything.

---

## Sprint 2 — Permissions & polish · *19–30 Oct 2026*

Goal: safe for a real team — private stays private.

- [ ] Visibility enforced server-side (`public` / `tim` / `privat`)
- [ ] Section + page create/delete wired through API (currently UI-only paths)
- [ ] Page history: log writes to DB, render a per-page history drawer
- [ ] Error + loading states for every API call (no silent failures)
- [ ] First deployment (Vercel or Docker on a VPS — decide in Sprint 1 retro)

---

## Sprint 3 — Candidate work · *2–13 Nov 2026*

Pick from the top of this list in the Sprint 2 retro; don't pre-commit.

- Comments v1
- Export wiki to Markdown zip
- Full-text search (`tsvector`) behind `⌘K`
- Editor toolbar

---

## Backlog (unsorted)

- Google / GitHub OAuth
- Public share links for `visibility: public` pages
- Docker image + one-command self-host
- @mentions + notifications
- Presence indicators
- Image upload
- i18n: the UI is Indonesian-only today (`lang="id"`) — English strings when there is a second user

---

## Working agreements

- One PR per checklist item; item moves to `[x]` only when merged
- Sprint goal is a promise; individual items can slip, the goal cannot
- Mid-sprint: anything new goes to the Backlog, not into the sprint
- Retro at sprint end: update this file, plan the next sprint in the same commit
