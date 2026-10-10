# FocusFlaw

A minimalist, modern pomodoro/productivity dashboard — a Next.js 16 (App Router) implementation of the **FocusFlaw Home Page** Figma design (1440×1024).

> Front-end only for now: every number and string is mock data in `lib/data.ts`. No timer, audio or persistence logic yet (see `docs/ARCHITECTURE.md` §9).

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (statically prerendered) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run icons` | Regenerates `components/icons/index.tsx` from `assets/*.svg` |
| `npx tsc --noEmit` | Typecheck only |

---

## What's here

| Route | Purpose |
| --- | --- |
| `/` | The dashboard |
| `/styleguide` | **Live design system** — colour swatches, type scale, icon inventory and UI primitives, all parsed out of `app/globals.css` at build time so they can't drift from the code |

---

## Documentation

| Document | Contents |
| --- | --- |
| [`docs/STYLEGUIDE.md`](docs/STYLEGUIDE.md) | Colour, typography, shape, iconography, responsive behaviour, accessibility, Figma bugs fixed |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Layering, data flow, icon + token pipelines, responsive strategy, commands, roadmap |

---

## Project layout

```
app/            layout.tsx (fonts) · globals.css (ALL tokens) · page.tsx · styleguide/
lib/            types.ts · data.ts (all copy) · cn.ts · tokens.ts
components/
  icons/        GENERATED — run `npm run icons`, never hand-edit
  ui/           Card · SectionHeader · ActionRow · Checkbox · ProgressRing
  layout/       AppShell · TopBar · BrandBlock · LeftNav · BottomNav · NavItemLink
  dashboard/    TimerHero · TodaysProgress · QuickActions · TasksCard · WeeklyOverview · FocusMusic
scripts/        build-icons.mts — assets/*.svg → components/icons/index.tsx
assets/         raw Figma icon exports
docs/           STYLEGUIDE.md · ARCHITECTURE.md
```

---

## House rules

1. **No raw hex in components.** Add a token to the `@theme` block in `app/globals.css` and use the utility it generates (`bg-surface`, `text-ink`, `font-clock`, `rounded-card`).
2. **No copy in components.** Add strings and numbers to `lib/data.ts`.
3. **Never edit `components/icons/index.tsx`.** It is generated; run `npm run icons`.
4. **Check `/styleguide` after any token change** — it renders from the same stylesheet.
