# FocusFlaw — Component Map

Where everything lives and what each piece does. Read this before editing any
component.

---

## 1. The mental model: four layers

Every visual change has up to four possible homes. **Which one you edit decides
whether the change applies everywhere, or only in the 1440 artboard.**

| Layer | File | Applies | Edit here when… |
| --- | --- | --- | --- |
| **Content** | `lib/data.ts` | everywhere | you want to change *what text/numbers appear* |
| **Tokens** | `app/globals.css` → `@theme` | everywhere | you want to change *a colour, font, size or radius globally* |
| **Markup** | `components/**/*.tsx` (Tailwind classes) | below 1100px | you want to change *structure and responsive behaviour* |
| **Artboard** | `app/globals.css` → `@media (min-width: 1100px)` | ≥ 1100px only | you want *exact design pixels* |

The artboard block is deliberately **unlayered**, so it beats every Tailwind
utility at ≥1100px. If you edit a component's Tailwind classes and nothing
changes on a big screen, you are in the wrong layer.

---

## 2. Directory tree

```
app/
  globals.css          ← ALL tokens + the whole artboard block
  layout.tsx           ← 9 font loads + metadata
  page.tsx             ← composes the dashboard (36 lines)
  styleguide/page.tsx  ← live token viewer at /styleguide
lib/
  data.ts              ← every string + number the app renders
  types.ts             ← shapes for those objects
  cn.ts                ← className joiner
  tokens.ts            ← parses @theme for /styleguide
components/
  icons/index.tsx      ← GENERATED. never hand-edit.
  ui/                  ← Card, SectionHeader, ActionRow, Checkbox, ProgressRing
  layout/              ← AppShell, TopBar, BrandBlock, LeftNav, BottomNav, NavItemLink
  dashboard/           ← the 6 cards
    timer/             ← TimerHero's 4 parts
    tasks/             ← TaskRow
public/                ← hero backdrop + album art (PNGs)
assets/                ← raw Figma SVG icons → `npm run icons`
docs/                  ← STYLEGUIDE.md · ARCHITECTURE.md · this file
```

---

## 3. The shell (outermost layout)

| File | Renders | Artboard hooks |
| --- | --- | --- |
| `components/layout/AppShell.tsx` | `.ff-shell` > `.ff-frame` > sidebar + content; `BottomNav` is a **sibling** of the shell | `.ff-shell` `283`, `.ff-frame` `287`, `.ff-side` `299`, `.ff-content` `345`, `.ff-grid` `397`, `.ff-main` `403`, `.ff-rail` `409` |
| `components/layout/TopBar.tsx` | header row: brand · greeting · search · bell · settings | `.ff-topbar` `351`, `.ff-greeting` `362`, `.ff-actions` `376`, `.ff-search` `383`, `.ff-settings` `392` |
| `components/layout/BrandBlock.tsx` | logo · wordmark · tagline (rendered twice, only one visible) | `.ff-brand` `307`, `.ff-brand-logo` `317` |
| `components/layout/LeftNav.tsx` | the 7-item sidebar | `.ff-nav` `322` |
| `components/layout/NavItemLink.tsx` | one nav row, `layout="rail" \| "bar"` | `.ff-nav-link` `334` |
| `components/layout/BottomNav.tsx` | mobile thumb bar (`< md` only) | — never in artboard mode |
| `app/page.tsx` | hero, then progress+quick on a row, then the rail | `.ff-progress-row` `431` |

`BottomNav` is outside `.ff-shell` on purpose — `container-type` implies
`contain: layout`, which would make the shell a containing block for
`position: fixed`.

---

## 4. The 6 cards

| Card | File | Composes | Artboard block |
| --- | --- | --- | --- |
| **TimerHero** | `dashboard/TimerHero.tsx` | `timer/TimerBadge`, `timer/TimerQuote`, `ProgressRing`, `timer/TransportControls`, `timer/ModeSelector` | `419–624` |
| **Today's Progress** | `dashboard/TodaysProgress.tsx` | `ProgressRing` + 2 stat tiles | `626–690` |
| **Quick Actions** | `dashboard/QuickActions.tsx` | 4 × `ui/ActionRow` | `692–711` |
| **Today's Tasks** | `dashboard/TasksCard.tsx` | 5 × `tasks/TaskRow` | `713–764` |
| **Weekly Overview** | `dashboard/WeeklyOverview.tsx` | gutter + bars + day labels | `766–816` |
| **Focus Music** | `dashboard/FocusMusic.tsx` | artwork + meta + seek + transport + volume | `832–891` |

Sub-parts:

- `dashboard/timer/TimerBadge.tsx` — mode chip, top-left of the hero
- `dashboard/timer/TimerQuote.tsx` — decorative script quote
- `dashboard/timer/TransportControls.tsx` — reset · play · sliders
- `dashboard/timer/ModeSelector.tsx` — the three-mode tablist
- `dashboard/tasks/TaskRow.tsx` — checkbox · title · time · kebab

---

## 5. `app/globals.css` line map

| Lines | What's there |
| --- | --- |
| `17–118` | `@theme` — surfaces, lines, text colours, 9 font families, type scale, radii, shadow |
| `120–168` | `@layer base` — body classes, `scroll-margin-top` for the sticky bar |
| `170–193` | the four `@utility` recipes: `card-frame`, `card-frame-alt`, `hairline`, `row-frame` |
| `195–278` | `.ff-range` (slider) — **not** media-scoped, applies at all widths |
| **`280–891`** | **`@media (min-width: 1100px)` — the artboard. This is the file that matters most.** |

Sub-sections inside the artboard block:

```
281–297   frame (shell/frame, zoom)
298–343   left column (brand, nav)
344–417   right column (topbar, greeting, actions, grid, main, rail)
418–498   card boxes (hero, progress-row, secheader, progress, quick, tasks, weekly, music)
499–625   TimerHero interior (badge, quote, ring, clock, caption, transport, modes)
626–691   Today's Progress interior (ring, stat grid, stat, chip, value, label)
692–712   Quick Actions interior
713–765   Today's Tasks interior
766–831   Weekly Overview interior (chart, gutter, track, bars, days, ring-value/label)
832–891   Focus Music interior (art, meta, sub, seek, controls, transport, play, volume)
```

---

## 6. Breakpoints and media queries

| Where | Value | Controls |
| --- | --- | --- |
| `globals.css:280` | `@media (min-width: 1100px)` | **artboard mode** — the exact-pixel layout |
| Tailwind `sm:` | 640px | brand joins the header row |
| Tailwind `md:` | 768px | icon-only rail appears; bottom nav hides |
| Tailwind `lg:` | 1024px | labels on the rail; brand moves to the rail |
| Tailwind `xl:` | 1280px | fluid mode's right rail goes sticky |

`zoom: calc(100cqw / 1440px)` on `.ff-frame` scales the artboard to any width
above 1100px, so the breakpoint itself is the *only* number that matters —
there is no "wide monitor" variant to maintain. Below 1100px the artboard block
switches off entirely and the fluid Tailwind layout takes over.

---

## 7. Cheat sheet — "I want to change…"

| Change | Edit |
| --- | --- |
| Any card's colour / border / radius | its `.ff-<card>` rule in the artboard block |
| The ring border on every card | `@utility card-frame` at `globals.css:170` |
| Text size, weight or font | the `.ff-*` rule for that element, or the Tailwind class on it |
| Card **copy** or numbers | `lib/data.ts` |
| Move the hero ring / clock / caption | `.ff-ring` `528`, `.ff-clock` `542`, `.ff-caption` `551` |
| How far the countdown sweeps | `lib/data.ts:70` — `ring: { value: 36.6, max: 100 }` |
| Bar heights in the chart | `lib/data.ts:106` — `weekChart.points[].value` (÷ `max`) |
| Task list contents | `lib/data.ts:94` |
| Nav items / their icons | `lib/data.ts:36` + the `ICONS` map in `NavItemLink.tsx:14` |
| A quick action's icon | the `ICONS` map in `QuickActions.tsx:9` |
| Slide the whole grid left/right | `.ff-frame` `287` / `.ff-content` `345` |
| Change the artboard breakpoint | `globals.css:280` |
| Replace an icon | edit `assets/*.svg`, then `npm run icons` |

---

## 8. Gotchas

1. **`components/icons/index.tsx` is generated** — edit `assets/*.svg`, then
   `npm run icons`.
2. **Never put a hex in a component** — add a `--color-*` to `@theme`, then use
   `bg-*` / `text-*` / `border-*`.
3. **`TimerHero` is the only `"use client"`** — the mode selector holds
   selection state.
4. **If a `globals.css` edit does not show up**, Turbopack sometimes serves a
   stale chunk. Stop the dev server and `rm -rf .next`, or `rm -rf .next`
   before `next build`.
5. **`.ff-progress` is declared twice** (`460` for the box, `629` for
   `position: relative`) — intentional, they set different properties.
6. **Only two gridlines** exist in the weekly chart (a top rule and a baseline)
   despite four tick labels. Do not "fix" that.
7. **`/styleguide` renders live from `globals.css`** — check it after any token
   change.