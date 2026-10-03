# Knweave

**Knweave** is a simple, open-source, self-hostable team wiki. Light, collaborative, no bloat — built for small teams, open-source projects, and nonprofits.

This repository contains the marketing landing page plus a working front-end prototype of the wiki app itself.

## Features

### Wiki app (`/app`)
- **Page tree** — sections contain nested pages; the tree is derived from `parentId` references, not stored
- **Markdown editing** — switch between view and edit mode per page (⌘E or `E`)
- **Search** — instant search across titles and content (⌘K)
- **Starred pages** — pin important docs to a dedicated view
- **Visibility levels** — per-page `public` / `tim` (team) / `privat`
- **Move pages** — re-parent pages between sections via modal
- **Activity history** — last 40 edits tracked per session
- **Persistence** — state is stored in `localStorage` under `knweave.wiki.v1` (no backend yet — this is a prototype)

### Landing page (`/`)
Nav, Hero, UseCases, Features, OpenSource, SelfHost, SmallTeams, Screenshots, Testimonials, FAQ, Footer — each a standalone component in `apps/web/components/sections/`, separated by a woven-thread divider.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5.5**
- **Turborepo** monorepo, workspaces: `apps/*`, `packages/*`
- **Tailwind CSS v3.4**
- Self-hosted fonts via `next/font`: Fraunces (display), Hanken Grotesk (sans), JetBrains Mono (mono)
- UI language: Indonesian (`lang="id"`)
- State: React Context + `useReducer`, hydrated from `localStorage` via `useSyncExternalStore` — zero state libraries

## Requirements

- Node.js **≥ 20.9**
- pnpm **9.7.1** (`corepack enable` picks it up from `packageManager`)

## Getting started

```bash
pnpm install
pnpm dev        # runs turbo dev → apps/web on http://localhost:3000
```

| Route | What it is |
|---|---|
| `/` | Marketing landing page |
| `/app` | Wiki app prototype (client-side, persisted to localStorage) |

To reset the wiki to its seed data: clear the `knweave.wiki.v1` key in your browser's localStorage.

## Scripts

Run from the repo root (via Turborepo) or inside `apps/web`:

```bash
pnpm dev      # dev server
pnpm build    # production build (outputs cached in .next, excluding cache)
pnpm lint     # eslint (flat config, eslint-config-next)
```

## Project structure

```
knweave/
├── apps/web/                    # the only app for now
│   ├── app/
│   │   ├── page.tsx             # landing page (/)
│   │   ├── app/page.tsx         # wiki prototype (/app)
│   │   └── layout.tsx           # fonts, metadata, root layout
│   ├── components/
│   │   ├── sections/            # landing page sections (Hero, Features, FAQ, …)
│   │   ├── wiki/                # wiki app: WikiApp, PageTree, PageEditor,
│   │   │                        #   PageView, Sidebar, TopBar, SearchResults,
│   │   │                        #   useWikiStore (state), useKeyboard, types, seedData
│   │   ├── illustrations/       # WovenHeroIllustration
│   │   ├── primitives/          # Icons, LogoMark, WovenDivider
│   │   └── ScrollReveal.tsx     # scroll-in animation wrapper
│   ├── tailwind.config.ts       # design tokens
│   └── next.config.mjs
├── packages/                    # reserved for shared packages
├── turbo.json
└── pnpm-workspace.yaml
```

## Design system

Custom tokens defined in `apps/web/tailwind.config.ts`:

| Token | Value | Use |
|---|---|---|
| `paper` | `#F9FAFB` | page background |
| `surface` | `#FFFFFF` | cards, panels |
| `ink` / `ink-soft` / `ink-muted` | `#111827` / `#374151` / `#6B7280` | text hierarchy |
| `weave-blue` | `#2563EB` | primary accent |
| `weave-thread` | `#D1D5DB` | borders |

Fonts: `font-display` (Fraunces), `font-sans` (Hanken Grotesk), `font-mono` (JetBrains Mono). Custom animations: `thread-draw`, `soft-rise`, `weave-sway`.

## Keyboard shortcuts

| Keys | Action |
|---|---|
| `⌘K` / `Ctrl K` | Focus search |
| `⌘E` / `Ctrl E` | Toggle view / edit mode |
| `E` | Start editing (when not typing) |
| `Esc` | Exit search / edit / close modal |
| `G` then `H` | Go to team home |
| `?` | Show this shortcut list |

## Roadmap & plans

The wiki at `/app` is a front-end prototype: no server, no auth, no database. The domain model (`apps/web/components/wiki/types.ts`) is already shaped for a backend — pages reference parents and sections by id, and visibility is per page.

- **[Roadmap](docs/ROADMAP.md)** — the long arc: Phase 1 make it real (backend + auth), Phase 2 collaboration, Phase 3 self-hosting & ecosystem, plus explicit non-goals
- **[Sprint plan](docs/SPRINT_PLAN.md)** — current two-week sprint, upcoming sprints, backlog, and working agreements
