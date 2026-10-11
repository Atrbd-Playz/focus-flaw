import { PlantIllustration, RedTomatoIllustration, TeaCupIllustration } from "@/components/icons";
import { timerModes } from "@/lib/data";
import type { TimerMode } from "@/lib/types";
import { cn } from "@/lib/cn";

/** Which illustration marks each mode. */
const MODE_ICON: Record<TimerMode["id"], (p: { className?: string }) => React.ReactElement> = {
  pomodoro: RedTomatoIllustration,
  short: TeaCupIllustration,
  long: PlantIllustration,
};

/**
 * ModeSelector — Pomodoro / Short Break / Long Break.
 *
 * A tablist: exactly one segment is selected, keyboard focus lands on each
 * `<button role="tab">`, and the selection is expressed as `aria-selected`
 * rather than a colour class so the state survives forced-colours mode.
 *
 * Artboard: a 522x60 pill split into three equal segments. The selected one
 * is filled `--color-mode-active` behind a 1.5px `--color-mode-line` outline
 * (the Figma accent stroke), and its label/duration stack sits slightly
 * above the vertical centre.
 */
export function ModeSelector({
  activeId,
  onSelect,
}: {
  activeId: TimerMode["id"];
  onSelect?: (id: TimerMode["id"]) => void;
}) {
  return (
    <div role="tablist" aria-label="Timer mode" className="ff-modes hairline flex w-full flex-wrap justify-center gap-1 rounded-card bg-surface p-1.5 sm:gap-2 sm:p-2 artboard:absolute artboard:left-[110px] artboard:top-[343px] artboard:h-[60px] artboard:w-[522px] artboard:gap-0 artboard:border-0 artboard:bg-surface artboard:p-0 artboard:shadow-none">
      {timerModes.map((mode) => {
        const Icon = MODE_ICON[mode.id];
        const selected = mode.id === activeId;
        return (
          <button
            key={mode.id}
            role="tab"
            aria-selected={selected}
            type="button"
            onClick={() => onSelect?.(mode.id)}
            className={cn(
              "ff-mode flex min-h-11 min-w-0 flex-1 basis-[140px] items-center justify-center gap-2.5 rounded-card px-3 py-2 transition-colors",
              "focus-visible:outline-2 focus-visible:outline-accent",
              selected
                ? "border border-accent bg-accent-soft artboard:border-[1.5px] artboard:border-mode-line artboard:bg-mode-active"
                : "border border-transparent hover:bg-surface-raised",
              "artboard:gap-[15px] artboard:rounded-card artboard:p-0",
            )}
          >
            <Icon className="ff-mode-icon size-7 shrink-0 artboard:size-[26px]" />
            <span className="flex min-w-0 flex-col items-start leading-tight">
              <span className="truncate text-sm font-medium text-ink">{mode.label}</span>
              <span className="font-micro text-micro text-muted opacity-70">{mode.duration}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
