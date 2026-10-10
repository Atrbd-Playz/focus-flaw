import Image from "next/image";
import {
  PlayGlyphIcon,
  RefreshIcon,
  RedTomatoIllustration,
  SlidersIcon,
  TomatoIllustration,
  TeaCupIllustration,
  PlantIllustration,
} from "@/components/icons";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { timer, timerModes } from "@/lib/data";
import type { TimerModeId } from "@/lib/types";
import { cn } from "@/lib/cn";

/** Mode icon, keyed by the mode id. */
const MODE_ICON: Record<TimerModeId, React.ComponentType<{ className?: string }>> = {
  pomodoro: TomatoIllustration,
  short: TeaCupIllustration,
  long: PlantIllustration,
};

/**
 * ============================================================================
 *  TimerHero — the centrepiece.
 * ----------------------------------------------------------------------------
 *  A photo-backed panel holding: mode badge · circular countdown · transport
 *  controls · the three timer modes · a decorative quote.
 *
 *  Responsive:
 *   - the photo is `object-cover`, so it crops instead of distorting (the
 *     Figma export stretched it to a fixed 818x467 box — fixed here)
 *   - the ring scales with `clamp()` from 150px to 216px, so the digits never
 *     overflow the arc on a phone
 *   - the quote is decorative and dropped below md
 *   - the mode selector wraps (`basis-[150px]`) rather than overflowing
 * ============================================================================
 */
export function TimerHero({ className }: { className?: string }) {
  const activeMode = timerModes[0];

  return (
    <section
      aria-label="Focus timer"
      className={cn("relative isolate overflow-hidden rounded-card", className)}
    >
      {/* Photographic backdrop — decorative, so alt is empty */}
      <Image
        src="/SunlitCozyWorkspaceWithSleepingCat1.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1280px) 818px, 100vw"
        className="absolute inset-0 -z-10 object-cover object-center"
      />

      <div className="flex flex-col items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
        {/* Mode badge + quote */}
        <div className="flex w-full items-start justify-between gap-3">
          <span className="hairline inline-flex items-center gap-2 rounded-pill bg-surface px-3 py-2">
            <RedTomatoIllustration className="size-4" />
            <span className="text-sm font-medium text-ink">{timer.mode}</span>
          </span>

          {/* Decorative — dropped where there is no room for it */}
          <p className="hidden max-w-[14ch] text-right font-quote text-sm leading-snug text-graphite md:block">
            {timer.quote}
          </p>
        </div>

        {/* Countdown */}
        <ProgressRing
          value={timer.ring.value}
          max={timer.ring.max}
          strokeWidth={7}
          label={`${timer.display} ${timer.caption}`}
          className="size-[clamp(150px,40vw,216px)]"
        >
          <div className="flex flex-col items-center px-6">
            <p className="font-clock text-[clamp(2.25rem,8vw,3.5rem)] font-extralight leading-none text-ink">
              {timer.display}
            </p>
            <p className="mt-2 text-sm text-ink sm:text-base">{timer.caption}</p>
          </div>
        </ProgressRing>

        {/* Transport controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            aria-label="Reset timer"
            className="hairline grid size-10 place-items-center rounded-pill bg-surface text-graphite transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent sm:size-11"
          >
            <RefreshIcon className="size-4" />
          </button>

          <button
            type="button"
            aria-label="Start focus timer"
            className="grid size-14 place-items-center rounded-pill bg-graphite transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent sm:size-[54px]"
          >
            <PlayGlyphIcon className="size-5 sm:size-6" />
          </button>

          <button
            type="button"
            aria-label="Timer settings"
            className="hairline grid size-10 place-items-center rounded-pill bg-surface text-graphite transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent sm:size-11"
          >
            <SlidersIcon className="size-4" />
          </button>
        </div>

        {/* Mode selector */}
        <div
          role="tablist"
          aria-label="Timer mode"
          className="hairline flex w-full max-w-[576px] flex-wrap justify-center gap-1 rounded-card bg-surface p-1.5 sm:gap-2 sm:p-2"
        >
          {timerModes.map((mode) => {
            const Icon = MODE_ICON[mode.id];
            const selected = mode.id === activeMode.id;
            return (
              <button
                key={mode.id}
                role="tab"
                aria-selected={selected}
                type="button"
                className={cn(
                  "flex min-h-11 min-w-0 flex-1 basis-[140px] items-center justify-center gap-2.5 rounded-panel px-3 py-2 transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-accent",
                  selected
                    ? "border border-accent bg-accent-soft"
                    : "border border-transparent hover:bg-surface-raised",
                )}
              >
                <Icon className="size-7 shrink-0" />
                <span className="flex min-w-0 flex-col items-start leading-tight">
                  <span className="truncate text-sm font-medium text-ink">{mode.label}</span>
                  <span className="font-micro text-micro text-muted opacity-70">
                    {mode.duration}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
