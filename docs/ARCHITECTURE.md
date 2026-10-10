# FocusFlaw — Architecture

> How the dashboard is put together, and why.
> Design reference: `docs/STYLEGUIDE.md`.

---

## 1. Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16.4** (App Router, Turbopack) | Already scaffolded; RSC keeps the dashboard statically prerendered |
| Language | **TypeScript 5** (strict) | Domain types in `lib/types.ts` keep the data layer honest |
| Styling | **Tailwind v4, CSS-first** | `@theme` in `globals.css` *is* the token file — no JS config to keep in sync |
| Fonts | `next/font/google` (9 families) | Self-hosted, zero layout shift, exposes the CSS variables the tokens wrap |
| Icons | Generated React components | See §5 |
| Runtime deps | **none** | Only `next`, `react`, `react-dom` |

> The old `tailwind.config.ts` was a **dead v3 config that Next never loaded**. It has been deleted; Tailwind v4 reads `globals.css` directly.

---

## 2. Directory layout

```
app/
  layout.tsx          fonts + metadata + body token classes
  globals.css         ← ALL design tokens (@theme), base, utilities
  page.tsx            composes AppShell from the dashboard cards
  styleguide/page.tsx live design system, parsed from globals.css
lib/
  types.ts            domain types (Nav, Task, Track, WeekChart …)
  data.ts             ← ALL copy and numbers
  cn.ts               class-name joiner
  tokens.ts           reads @theme out of globals.css for /styleguide
assets/               the raw Figma icon exports (34 SVGs)
scripts/
  build-icons.mts      assets/ → components/icons/index.tsx
components/
  icons/index.tsx     GENERATED — do not edit
  ui/                 primitives: Card, SectionHeader, ActionRow,
                      Checkbox, ProgressRing
  layout/             AppShell, TopBar, BrandBlock, LeftNav,
                      BottomNav, NavItemLink
  dashboard/          TimerHero, TodaysProgress, QuickActions,
                      TasksCard, WeeklyOverview, FocusMusic
public/               photographic assets (hero backdrop, album art)
docs/                 STYLEGUIDE.md · ARCHITECTURE.md
```

### Layering rule

```
page.tsx
   └── layout/          (structure)
         └── dashboard/  (feature cards)
               └── ui/    (primitives)
                     └── icons/  (generated)
lib/data + lib/types feed every layer as props.
```

A component may only import **downward**. `ui/` never imports from `dashboard/`; `icons/` imports nothing.

---

## 3. Data layer

`lib/data.ts` is the only place content lives. `lib/types.ts` types it.

```ts
export const tasks: Task[] = [
  { id: "t1", title: "Finish Website UI Design", time: "9:00 - 10:15", status: "done" },
  …
];
```

```tsx
// components/dashboard/TasksCard.tsx — presentational only
export function TasksCard({ className }: { className?: string }) {
  const done = tasks.filter((t) => t.status === "done").length;
  …
}
```

**Consequence:** swapping `lib/data.ts` for a fetch is a one-file change; no component has to move. Values are transcribed from the Figma export, so the design is reproducible pixel-for-pixel today.

There is deliberately **no state** — this build is front-end only. The one place state will arrive is the timer (countdown, mode, play/pause); see §9.

---

## 4. Component architecture

### 4.1 Primitives (`components/ui/`)

Small, dumb, and shared. Each owns exactly one recipe:

| Primitive | Owns |
| --- | --- |
| `Card` | radius + hairline + surface (`alt` variant) |
| `SectionHeader` | title row with a trailing slot |
| `ActionRow` | raised row: icon · label · meta · chevron |
| `Checkbox` | the two checkbox states |
| `ProgressRing` | the SVG arc, on a `0 0 100 100` viewBox |

`ProgressRing` is worth calling out: the Figma ring was locked to 239×239 px. It is now drawn on a normalized viewBox, so the caller sizes it with `size-[clamp(...)]` and the **stroke scales with it** — the arc stays proportional at every breakpoint instead of the design leaking one pixel size into the code.

### 4.2 Layout (`components/layout/`)

| Component | Responsibility |
| --- | --- |
| `AppShell` | The page grid. Owns every breakpoint decision. |
| `BrandBlock` | Logo + wordmark + tagline |
| `TopBar` | Greeting + search + notifications + settings |
| `LeftNav` / `NavItemLink` | Sidebar navigation |
| `BottomNav` | Mobile-only fixed bar |

`AppShell` takes `main` and `aside` as props, so `page.tsx` is pure composition:

```tsx
<AppShell
  main={<> <TimerHero /> <div className="grid md:grid-cols-2">…</div> </>}
  aside={<> <TasksCard /> <WeeklyOverview /> <FocusMusic /> </>}
/>
```

### 4.3 Feature cards (`components/dashboard/`)

Each card is one section of the Figma frame, prop-driven and token-only. They know nothing about layout — that is `AppShell`'s job.

| Card | Notes |
| --- | --- |
| `TimerHero` | The only card with a photographic backdrop (`object-cover`, not stretched) |
| `TodaysProgress` | Ring + two stat tiles |
| `QuickActions` | 4 `ActionRow`s |
| `TasksCard` | Data-driven rows; the counter is `done/tasks.length`, not a literal |
| `WeeklyOverview` | Bars are `value / max * 100%` — swapping the data updates the chart |
| `FocusMusic` | Restyled range inputs (`.ff-range`) |

---

## 5. Icon pipeline

```
assets/*.svg  ──scripts/build-icons.mts──▶  components/icons/index.tsx
```

Three problems it solves:

1. **Colour.** Figma exports icons with hardcoded hexes. The generator maps every one to a token; monochrome icons become `currentColor`, so they inherit context.
2. **Duplication.** The export copy-pasted a kebab SVG into every task row. Now there is one component.
3. **Noise.** `.cls-1` `<style>` blocks, `id`, `data-name` and stray `px` units are all stripped.

**It fails loudly.** An unmapped colour is printed and the process exits non-zero — a raw hex cannot reach the component tree by accident.

Regenerate with:

```
node scripts/build-icons.mts
```

Known-buggy paths (the invisible checkbox tick) are removed via a `DROP_PATHS` table, so the fix survives regeneration.

---

## 6. Token pipeline

```
app/globals.css  @theme { --color-*, --font-*, --text-*, --radius-*, --shadow-* }
       │
       ├──▶ Tailwind v4 generates utilities: bg-surface, text-ink, font-clock…
       │
       └──▶ lib/tokens.ts parses it at build time ──▶ /styleguide
```

`lib/tokens.ts` walks the `@theme` block, grouping declarations by the `/* --- Section --- */` comments that head them, and `/styleguide` renders swatches from the result. **The documentation is generated from the stylesheet**, so it cannot fall out of date.

---

## 7. Responsive strategy

Researched via the UI-skills registry (`pbakaus/adapt`, `jakubkrehel/better-layout`). Principles adopted:

- **Content-driven breakpoints** — no device names; each step is a width where the layout stops fitting.
- **Don't hide core functionality** — only decoration is removed at small sizes.
- **Bottom nav on mobile** — side navigation is a desktop affordance; phones get a thumb-reachable bar with ≥44px targets.
- **`minmax(0, 1fr)` tracks and `min-width: 0` flex children** — long task titles scroll inside their card instead of widening the page.
- **Progressive disclosure** — the `Ctrl + K` hint and the hero quote are affordances/decoration, so they go first.

### 7.1 The four steps

| Range | Grid | Sidebar | Right rail |
| --- | --- | --- | --- |
| `< 768px` | 1 column | hidden → **fixed bottom nav** | stacked below main |
| `768–1023px` | `76px 1fr` | icon-only rail | stacked below main |
| `1024–1279px` | `216px 1fr` | labelled rail, carries the brand | stacked below main |
| `≥ 1280px` | `216px minmax(0,1fr) 360px` | labelled rail | 360px sticky column |

Why the rail only appears at **1280px**: at 1024, `216 + 360 + gaps` leaves ~430px for the main column, against the design's 818px — the timer ring and the mode selector would both break. Below that width the rail's three cards reflow under the main content, which is a graceful degradation rather than a squeeze.

### 7.2 Brand placement

The brand lockup lives in **two** places, never both at once:

- `≥ lg` — top of the left navigation column (matching the 1440 frame, where the logo sits in the sidebar gutter)
- `< lg` — inline in the header, ahead of the greeting

`AppShell` decides; `BrandBlock` is rendered twice with complementary visibility classes.

### 7.3 Header ordering

`TopBar` uses flex `order` rather than duplicated markup:

| Breakpoint | Visual order |
| --- | --- |
| `< sm` | brand · **actions** · greeting (wraps to its own line) |
| `sm–lg` | brand · greeting · actions |
| `≥ lg` | greeting · actions |

The DOM stays semantic — the greeting immediately follows the brand — while the visual order adapts.

---

## 8. Commands

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (static prerender) |
| `npm run lint` | ESLint |
| `node scripts/build-icons.mts` / `npm run icons` | Regenerates `components/icons/index.tsx` |
| `npx tsc --noEmit` | Typecheck only |

---

## 9. Deliberately out of scope

This build is **front-end only**, as agreed. The following are stubbed with static data and are the natural next steps:

| Area | Current state | Next step |
| --- | --- | --- |
| Timer | `25:00` literal, arc is a fixed 42% | `useState` + `setInterval`, arc derived from remaining seconds |
| Audio | Seek/volume sliders are uncontrolled | `<audio>` + `timeupdate` |
| Tasks | Read-only | `useState` for toggling; persist to `localStorage` |
| Week chart | Static array | Same shape, fed from a `useEffect` |
| Navigation | `href="#id"` anchors | Next.js `<Link>` + routes |
| Auth / user | "Abdur Rahman" literal in `lib/data.ts` | Real session |

Because every value already lives in `lib/data.ts` and every card is presentational, none of this requires touching layout or styling.
