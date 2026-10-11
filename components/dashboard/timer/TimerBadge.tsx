import { RedTomatoIllustration } from "@/components/icons";

/**
 * TimerBadge — the current mode chip in the top-left of the hero.
 *
 * Artboard: 128x38 pill at (38, 20) with the tomato mark and the mode name,
 * centred. The photo behind it supplies the contrast, so the chip is a bare
 * surface fill with no stroke — `hairline` is neutralised by the
 * `artboard:border-0 / artboard:shadow-none` pair below.
 */
export function TimerBadge({ mode }: { mode: string }) {
  return (
    <span className="ff-badge hairline inline-flex items-center gap-2 rounded-pill bg-surface px-3 py-2 artboard:absolute artboard:left-[38px] artboard:top-[20px] artboard:h-[38px] artboard:w-[128px] artboard:justify-center artboard:gap-2 artboard:rounded-[19px] artboard:border-0 artboard:bg-surface artboard:p-0 artboard:shadow-none">
      <RedTomatoIllustration className="size-5 shrink-0" />
      <span className="text-sm font-medium text-ink">{mode}</span>
    </span>
  );
}