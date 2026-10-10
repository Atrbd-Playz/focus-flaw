# FocusFlaw — Design System

> The stylesheet reference for the FocusFlaw dashboard.
> Everything here is derived from the Figma export **`FocusFlaw Home Page.svg`** (1440×1024).
>
> **Live version:** run the app and open [`/styleguide`](http://localhost:3000/styleguide). That page parses `app/globals.css` and renders every token, type role and icon *from the real code*, so it can never drift from this document.

---

## 1. Principles

| Principle | What it means here |
| --- | --- |
| **One source of truth** | Every colour, font, radius and type size lives as a CSS custom property in the `@theme` block of `app/globals.css`. Nothing else may define a colour. |
| **Flat, hairline-driven** | The design has no drop shadows. Depth comes from a `0.25px` hairline border at 60% opacity and from surface colour, never from blur. |
| **Tokens over literals** | Components contain **zero raw hex values**. They use the utilities Tailwind v4 generates from the tokens (`bg-surface`, `text-ink`, `font-clock`, `rounded-card`). |
| **Content-driven breakpoints** | Every breakpoint is the width at which the 1440px design stops fitting — not a device name. See §9. |
| **Data owns copy** | Every string and number the UI renders lives in `lib/data.ts`. Components are presentational. |

---

## 2. Colour

### 2.1 Surfaces

The Figma export used **7 near-identical creams**. They are consolidated into 5 intentional roles so the palette stays legible and themable.

| Token | Value | Role |
| --- | --- | --- |
| `--color-canvas` | `#fcf9f4` | Page background |
| `--color-surface` | `#fdf9f4` | Default card surface, mode selector, transport buttons |
| `--color-surface-alt` | `#f8f6ef` | Secondary panels — Weekly Overview, Focus Music |
| `--color-surface-raised` | `#fbfaf7` | List rows, inset chips, hover states |
| `--color-nav-active` | `#f9f0de` | Active sidebar pill |
| `--color-canvas-aside` | `#fcf8f4` | Right-rail band |

> **Rule:** never invent a sixth cream. If a surface needs to differ, change one of these roles instead.

### 2.2 Lines

| Token | Value | Role |
| --- | --- | --- |
| `--color-line` | `rgb(98 99 104 / 0.6)` | **The card frame.** 0.25px @ 60% muted grey |
| `--color-line-soft` | `rgb(98 99 104 / 0.35)` | Dividers inside cards, row borders |

The export contained **5 competing border greys** at opacities 0.55–0.7. All of them map to these two tokens.

### 2.3 Text

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#272b2a` | Headings, primary numbers |
| `--color-graphite` | `#41444c` | Secondary dark — media controls, search, bell |
| `--color-muted` | `#626368` | Body copy, labels, icon strokes |
| `--color-muted-subtle` | `#6c6c71` | Counters, meta text |

`#626368` appeared **129 times** in the export. It is now a single token — and the *only* colour monochrome icons are allowed to take, via `currentColor`.

### 2.4 Brand & accent

| Token | Value | Role |
| --- | --- | --- |
| `--color-accent` | `#fe8242` | Primary orange — progress arcs, focus outline |
| `--color-accent-strong` | `#f26e3c` | Hover / pressed orange |
| `--color-accent-soft` | `#fdeede` | Peach ring track, selected-mode background |
| `--color-accent-70` | `rgb(254 130 66 / 0.7)` | 70% accent for icon chips |
| `--color-amber` | `#feb65e` | Sun badge |
| `--color-chart-bar` | `#ffc090` | Weekly Overview bars |

### 2.5 Semantic

| Token | Value | Role |
| --- | --- | --- |
| `--color-success` | `#479975` | Completed checkbox |
| `--color-danger` | `#ee5f5f` | Errors, destructive actions |
| `--color-leaf` | `#99b16c` | Logo / illustration green |
| `--color-leaf-dark` | `#5e8554` | Logo / illustration green (shadow) |

### 2.6 Illustration palette

**Only the multi-colour artwork** (logo, tomato, tea cup, plant, stat chips) may use these. They are **never** allowed on text, borders or UI chrome.

| Token | Value | | Token | Value |
| --- | --- | --- | --- | --- |
| `--color-illus-cream` | `#fcf7eb` | | `--color-illus-moss` | `#70975d` |
| `--color-illus-sand` | `#fcedda` | | `--color-illus-olive` | `#898457` |
| `--color-illus-peach` | `#f8e0c2` | | `--color-illus-sprout` | `#7ea864` |
| `--color-illus-amber` | `#f8b06c` | | `--color-illus-stem` | `#60925a` |
| `--color-illus-gold` | `#fcc17e` | | `--color-illus-flame` | `#f99840` |
| `--color-illus-honey` | `#fed29a` | | `--color-illus-tomato` | `#ff624d` |
| | | | `--color-illus-blush` | `#eeb6b6` |

These exist as tokens purely so the icon generator can tokenize artwork the same way it tokens UI chrome.

---

## 3. Typography

Nine families are loaded through `next/font` in `app/layout.tsx`, each with exactly one job. Body copy is **Roboto**.

| Token | Family | Role |
| --- | --- | --- |
| `--font-sans` | Roboto | Body copy & UI text |
| `--font-brand` | Rosario | Brand wordmark ("FocusFlaw", tagline) |
| `--font-display` | Sansation | Greeting headline |
| `--font-greeting` | RocknRoll One | Greeting subtitle |
| `--font-kbd` | Salsa | Keyboard shortcut hint ("Ctrl + K") |
| `--font-micro` | Roboto Condensed | Micro labels, meta, tagline, chart axis |
| `--font-clock` | Lisu Bosa | Timer digits (25:00) |
| `--font-quote` | Lily Script One | Decorative hero quote |
| `--font-chart` | Baloo Da 2 | Chart day labels |

> `app/globals.css` maps these to the **kebab-case** variables `next/font` emits (`--font-roboto-condensed`, `--font-lisu-bosa`, …).

### 3.1 Type scale

Tuned to the sizes actually present in the Figma file rather than Tailwind's defaults.

| Token | Size | Used for |
| --- | --- | --- |
| `--text-micro` | 10px | Chart axis, mode duration |
| `--text-tiny` | 11px | Row meta, action labels |
| `--text-sm` | 13px | Nav labels, subtitles |
| `--text-base` | 15px | Task titles, body |
| `--text-md` | 16px | Card headings |
| `--text-lg` | 20px | Greeting |
| `--text-xl` | 22px | Stat values, brand |
| `--text-2xl` | 32px | Big stat |
| `--text-clock` | 64px | Timer digits |

---

## 4. Shape

### 4.1 Radius

The export contained `rx` values of 15, 15.25, 15.875, 16, 16.125, 10, 18.9 and 24. Consolidated:

| Token | Value | Role |
| --- | --- | --- |
| `--radius-card` | `16px` | Every outer card |
| `--radius-panel` | `15px` | Inset panels, list rows |
| `--radius-pill` | `999px` | Badges, round controls, sliders |

### 4.2 Elevation

| Token | Value | Role |
| --- | --- | --- |
| `--shadow-hairline` | `0 0 0 0.25px rgb(98 99 104 / 0.6)` | Border substitute for controls sitting **on imagery** (hero buttons), where a real border would shift layout |

There is deliberately **no** blurred shadow anywhere in the system.

### 4.3 The card frame

```css
.card-frame {
  border-radius: var(--radius-card);            /* 16px        */
  border: 0.25px solid var(--color-line);       /* hairline    */
  background-color: var(--color-surface);
}
```

| Utility | Surface | Used by |
| --- | --- | --- |
| `card-frame` | `--color-surface` | All primary cards, sidebar, header-less panels |
| `card-frame-alt` | `--color-surface-alt` | Weekly Overview, Focus Music |
| `hairline` | *(none)* | Controls on the hero photo |
| `row-frame` | `--color-surface-raised` | Task rows, action rows |

---

## 5. Spacing

Layout gaps are `12px` (`gap-3`) on phones and `16px` (`gap-4`) from `sm` up, growing to `24px` (`p-6`) for the page gutter at `lg`. Card padding is `16–24px` depending on card size.

Touch targets are never below **44×44px** — see `min-h-11` on action rows and nav bars.

---

## 6. Iconography

### 6.1 Pipeline

`assets/*.svg` → **`scripts/build-icons.mts`** → `components/icons/index.tsx`

```
npm run icons
```

The generator:

1. resolves Figma's `.cls-n { … }` `<style>` blocks into real presentation attributes;
2. strips noise (`id`, `data-name`, `<defs>`);
3. maps **every raw hex** through the `PALETTE` table to a token;
4. converts kebab-case attributes to JSX camelCase;
5. emits one `SVGProps<SVGSVGElement>` component per asset.

It **fails loudly**: any colour not present in `PALETTE` is reported and sets a non-zero exit code, so an un-tokenized colour can never reach the component tree silently.

`components/icons/index.tsx` is a **generated file — do not edit it by hand.**

### 6.2 Rules

| Icon kind | Colour behaviour |
| --- | --- |
| Monochrome UI icon (`#626368`, `#41444c`, `#272b2a`) | → `currentColor`. Inherits the surrounding text colour, so one class colours icon **and** label. |
| 2-tone control (`#41444c` + `#fbf7f3`) | Circle → `currentColor`, glyph → `var(--color-surface)`. |
| Multi-colour artwork (logo, tomato, cup, plant) | Keeps its literal illustration-token palette. |

### 6.3 Naming

| Source asset | Component |
| --- | --- |
| `Home icon.svg` | `HomeIcon` |
| `play vector (5).svg` | `PlayCircleIcon` |
| `play vector (1).svg` | `PlayGlyphIcon` |
| `tick box_2.svg` | `CheckboxCheckedIcon` |
| `unchecked tick box.svg` | `CheckboxEmptyIcon` |
| `Tomato.svg` | `TomatoIllustration` |
| `FocusFlawLogo.svg` | `FocusFlawLogo` |

The full inventory (34 components) is rendered on `/styleguide`.

### 6.4 Sizing

Icons ship **without** `width`/`height` so CSS owns their size. Always pass a size utility (`className="size-5"`); the generated components set `fill="none"` on the root and `aria-hidden` for decorative use.

---

## 7. UI primitives

| Component | Purpose |
| --- | --- |
| `Card` | The frame. `alt` switches to the secondary surface. |
| `SectionHeader` | Title + optional trailing node (counter, dropdown, "View All"). |
| `ActionRow` | Raised row: leading icon · label · optional meta · optional chevron. |
| `Checkbox` | `checked` → green square with light tick; empty → hairline outline. |
| `ProgressRing` | SVG ring on a `0 0 100 100` viewBox so the caller sizes it with CSS. |
| `NavItemLink` | One nav entry, two presentations (`rail`, `bar`). |
| `BrandBlock` | Leaf mark · wordmark · tagline. |

Range inputs (seek / volume) are styled by the `.ff-range` class in `globals.css`, using `--color-graphite` for the thumb and `--color-line-soft` for the track.

---

## 8. Accessibility

- Every icon-only control has an `aria-label`; decorative icons are `aria-hidden`.
- Nav links keep their accessible name at every breakpoint — the icon rail hides the *text node*, never the name.
- The Weekly Overview chart is accompanied by a visually-hidden data summary.
- `:focus-visible` gets a 2px `--color-accent` outline with 2px offset, everywhere.
- `prefers-reduced-motion` collapses all transitions and animations.
- Checkboxes are real `<button role="checkbox" aria-checked>`; sliders are real `<input type="range">`.

---

## 9. Responsive behaviour

Breakpoints are **content-driven**. Each one is the width at which the 1440px design stops fitting, then reflows. See `docs/ARCHITECTURE.md` for the full rationale.

| Range | Sidebar | Main | Right rail | Brand lockup |
| --- | --- | --- | --- | --- |
| `< 768px` | hidden → **fixed bottom nav** | single column, 2-up cards become 1-up | stacked below main | inline in header |
| `768–1023px` | 76px **icon-only** rail | full width | stacked below main | inline in header |
| `1024–1279px` | 216px labelled rail | full width | stacked below main | **top of the rail** |
| `≥ 1280px` | 216px labelled rail | `minmax(0,1fr)` | 360px sticky column | top of the rail |

### 9.1 What hides, and why

| Element | Hidden below | Reason |
| --- | --- | --- |
| Greeting subtitle | — | Always shown; truncates rather than wrapping |
| Brand tagline | — | Always shown once the lockup has room |
| `Ctrl + K` hint | `md` | Pure affordance; the icon alone still reads as "search" |
| Hero quote | `md` | Purely decorative — removing it costs nothing |
| Nav labels | `lg` | Replaced by `title` tooltips + the accessible name |
| Sidebar | `md` | Replaced by the thumb-reachable bottom bar |

Nothing that carries information is ever removed — only decoration.

---

## 10. Bugs fixed from the Figma export

| # | In the export | Fixed as |
| --- | --- | --- |
| 1 | Unchecked checkboxes shipped an **invisible white tick** (`stroke: #fbfaf7`) on an empty box | The path is dropped by the generator (`DROP_PATHS`); an empty box is a plain outline |
| 2 | "Daily **Steak**" | Corrected to "Daily Streak" in `lib/data.ts` |
| 3 | Tasks counter read **2/7** above a list of 5 | Derived from the data: `done/tasks.length` |
| 4 | "Statistics" component was misspelt `Satistics.tsx` | Renamed; the card is now `FocusMusic` |
| 5 | Brand spelled three ways ("Focus Flaw", "FocusFlaw", "FocusFlaw.") | Single constant: `brand.name` in `lib/data.ts` |
| 6 | Hero photo was stretched to a fixed 818×467 box | `object-cover` — it crops instead of distorting |
| 7 | Album art overflowed the music card | `overflow-hidden` + `object-cover` on a sized square |
| 8 | ~150 exploded inline SVG icon fragments duplicated per row | 34 generated components, one import each |

---

## 11. House rules

1. **Never write a hex in a component.** Add a token to `@theme` instead.
2. **Never edit `components/icons/index.tsx`.** Regenerate it.
3. **Never put copy in a component.** Add it to `lib/data.ts`.
4. **New colour?** If `scripts/build-icons.mts` reports it as unmapped, decide whether it is chrome (token) or artwork (`illus-*`) and add it there too.
5. **Check `/styleguide` after any token change** — it is rendered from the same file.
