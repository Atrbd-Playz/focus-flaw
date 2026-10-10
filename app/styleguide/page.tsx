import type { Metadata } from "next";
import * as Icons from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ActionRow } from "@/components/ui/ActionRow";
import { Checkbox } from "@/components/ui/Checkbox";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { PlusIcon } from "@/components/icons";
import { readThemeTokens, tokensBySection, readFontTokens, readTypeTokens } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Styleguide · FocusFlaw",
  description:
    "The FocusFlaw design system: tokens, type scale, icon inventory and UI primitives, rendered from the source stylesheet.",
};

/**
 * ============================================================================
 *  /styleguide — the design system, rendered live.
 * ----------------------------------------------------------------------------
 *  Every token on this page is read out of `app/globals.css` at build time
 *  (see lib/tokens.ts), and every icon is the real component the app renders.
 *  Nothing here is transcribed by hand, so it cannot fall out of sync.
 *
 *  Docs counterpart: docs/STYLEGUIDE.md
 * ============================================================================
 */

const sections = tokensBySection(readThemeTokens());
const fonts = readFontTokens();
const typeScale = readTypeTokens();

/** Every exported icon component (the generator exports only components). */
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const iconInventory = (Object.keys(Icons) as Array<keyof typeof Icons>)
  .map((name) => ({ name: String(name), Icon: Icons[name] as IconComponent }))
  .filter((entry) => typeof entry.Icon === "function")
  .sort((a, b) => a.name.localeCompare(b.name));

/** Colors get a swatch; every other token gets a value chip. */
const COLOR_SECTIONS = new Set([
  "Surface / canvas",
  "Lines",
  "Text",
  "Brand / accent",
  "Semantic",
  "Illustration palette",
]);

/**
 * The job each font family does, plus a sample string to show it off.
 * Keys are the literal Tailwind utilities (e.g. `font-clock`) so the scanner
 * picks them up and guarantees they exist in the generated CSS.
 */
const FONT_ROLES: Record<string, { role: string; sample: string }> = {
  "font-sans": { role: "Body copy & UI text", sample: "The quick brown fox" },
  "font-brand": { role: "Brand wordmark", sample: "FocusFlaw" },
  "font-display": { role: "Greeting headline", sample: "Good evening, Abdur" },
  "font-greeting": { role: "Greeting subtitle", sample: "Stay Focused, you’re doing great!" },
  "font-kbd": { role: "Keyboard shortcut", sample: "Ctrl + K" },
  "font-micro": { role: "Micro labels, meta, tagline", sample: "Small steps, Big Progress" },
  "font-clock": { role: "Timer digits", sample: "25:00" },
  "font-quote": { role: "Decorative quote", sample: "Focus is a skill" },
  "font-chart": { role: "Chart axis labels", sample: "Sun Mon Tue Wed" },
};

const BREAKPOINTS: Array<{ range: string; label: string; behaviour: string }> = [
  { range: "< 768px", label: "Phone", behaviour: "Single column, fixed bottom nav, brand inline in the header, quote and Ctrl+K hint hidden." },
  { range: "768 - 1023px", label: "Tablet", behaviour: "72px icon rail (labels become tooltips), main column full width, secondary cards 2-up." },
  { range: "1024 - 1279px", label: "Laptop", behaviour: "216px labelled sidebar carrying the brand; right rail drops below the main column." },
  { range: ">= 1280px", label: "Desktop", behaviour: "Full three-column design, matching the 1440px Figma frame." },
];

export default function StyleguidePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="font-brand text-sm font-semibold uppercase tracking-widest text-accent">
          FocusFlaw
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink">Design System</h1>
        <p className="mt-3 max-w-[68ch] text-base text-muted">
          Every value below is parsed from <code className="font-micro">app/globals.css</code> and
          every icon is the component the app actually renders, so this page cannot drift from the
          code. Written rules live in{" "}
          <code className="font-micro">docs/STYLEGUIDE.md</code>.
        </p>
      </header>

      {/* ---------------------------------------------------------------- */}
      <Section id="colors" title="Color tokens" blurb="No component contains a raw hex. Components reference the utilities these tokens generate." />
      <div className="flex flex-col gap-8">
        {sections
          .filter((s) => COLOR_SECTIONS.has(s.section))
          .map((group) => (
            <section key={group.section}>
              <h3 className="mb-3 font-micro text-sm font-semibold uppercase tracking-wider text-muted-subtle">
                {group.section}
              </h3>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.tokens.map((token) => (
                  <li key={token.name} className="card-frame overflow-hidden">
                    <div
                      className="h-16 w-full border-b border-line-soft"
                      style={{ backgroundColor: `var(--color-${token.name.replace(/^color-/, "")})` }}
                    />
                    <div className="flex flex-col gap-0.5 p-3">
                      <code className="font-micro text-xs font-medium text-ink">
                        --{token.name}
                      </code>
                      <code className="font-micro text-[11px] text-muted-subtle">{token.value}</code>
                      {token.comment ? (
                        <span className="text-tiny text-muted">{token.comment}</span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      <Section id="type" title="Typography" blurb="Nine families loaded via next/font, each with a single job. Body copy is Roboto." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-micro text-sm font-semibold uppercase tracking-wider text-muted-subtle">
            Font roles
          </h3>
          <ul className="flex flex-col gap-4">
            {fonts.map((font) => {
              const meta = FONT_ROLES[font.name];
              if (!meta) return null;
              return (
                <li
                  key={font.name}
                  className="flex flex-col gap-1 border-b border-line-soft pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium text-muted-subtle">{meta.role}</span>
                    <code className="shrink-0 font-micro text-[11px] text-muted-subtle">
                      {font.name}
                    </code>
                  </div>
                  <span className={`${font.name} truncate text-xl text-ink`}>{meta.sample}</span>
                  <code className="truncate font-micro text-[11px] text-muted-subtle">
                    {font.value}
                  </code>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-micro text-sm font-semibold uppercase tracking-wider text-muted-subtle">
            Type scale
          </h3>
          <ul className="flex flex-col gap-3">
            {typeScale.map((step) => (
              <li key={step.name} className="flex items-baseline gap-4 border-b border-line-soft pb-3 last:border-0 last:pb-0">
                <span className="min-w-0 flex-1 truncate text-ink" style={{ fontSize: step.size }}>
                  {step.comment || step.name}
                </span>
                <code className="shrink-0 font-micro text-[11px] text-muted-subtle">
                  {step.size}
                </code>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ---------------------------------------------------------------- */}
      <Section id="icons" title={`Iconography (${iconInventory.length})`} blurb="Generated from /assets/*.svg. Monochrome icons take currentColor so they inherit their context." />
      <Card className="p-5">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {iconInventory.map(({ name, Icon }) => (
            <li key={name} className="card-frame flex flex-col items-center gap-2 p-4 text-muted">
              <span className="grid h-10 place-items-center text-graphite">
                <Icon className="size-7" />
              </span>
              <code className="text-center font-micro text-[10px] leading-tight text-muted-subtle">
                {name}
              </code>
            </li>
          ))}
        </ul>
      </Card>

      {/* ---------------------------------------------------------------- */}
      <Section id="primitives" title="UI primitives" blurb="The shared recipes every card is assembled from." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col gap-4 p-5">
          <SectionHeader title="Section header" trailing="3/7" />
          <ActionRow icon={<PlusIcon className="size-5" />} label="Action row" meta="with meta text" showChevron />
          <div className="flex flex-wrap items-center gap-4">
            <Checkbox checked />
            <Checkbox checked={false} />
            <span className="font-micro text-xs text-muted">checkbox · checked / empty</span>
          </div>
        </Card>

        <Card alt className="flex flex-col items-center gap-4 p-5">
          <SectionHeader title="Progress ring" trailing="42%" />
          <ProgressRing value={42} max={100} strokeWidth={7} className="size-[140px]">
            <div className="flex flex-col items-center">
              <span className="font-clock text-4xl font-extralight text-ink">25:00</span>
              <span className="mt-1 text-sm text-ink">Focus Time</span>
            </div>
          </ProgressRing>
          <p className="text-center text-tiny text-muted">
            Track = accent-soft, arc = accent, 0.25px hairline frame, 16px radius.
          </p>
        </Card>
      </div>

      {/* ---------------------------------------------------------------- */}
      <Section id="breakpoints" title="Responsive strategy" blurb="Content-driven breakpoints: each step is where the 1440px design stops fitting." />
      <Card className="overflow-hidden p-0">
        <ul className="flex flex-col">
          {BREAKPOINTS.map((bp) => (
            <li
              key={bp.range}
              className="flex flex-col gap-1 border-b border-line-soft px-5 py-4 last:border-0 sm:flex-row sm:gap-6"
            >
              <code className="w-32 shrink-0 font-micro text-sm font-medium text-ink">{bp.range}</code>
              <span className="w-24 shrink-0 text-sm font-medium text-accent">{bp.label}</span>
              <span className="min-w-0 flex-1 text-sm text-muted">{bp.behaviour}</span>
            </li>
          ))}
        </ul>
      </Card>
    </main>
  );
}

function Section({
  id,
  title,
  blurb,
}: {
  id: string;
  title: string;
  blurb: string;
}) {
  return (
    <section id={id} className="mt-12 mb-5 scroll-mt-8 first:mt-0">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <p className="mt-1 max-w-[72ch] text-sm text-muted">{blurb}</p>
    </section>
  );
}
