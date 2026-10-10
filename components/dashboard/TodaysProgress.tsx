import { StatClockIllustration, StatFireIllustration } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { progress, progressStats, sectionTitles } from "@/lib/data";
import { cn } from "@/lib/cn";

const STAT_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  "focus-time": StatClockIllustration,
  streak: StatFireIllustration,
};

/**
 * "Today's Progress" — completion ring plus two stat tiles.
 *
 * Responsive: single stacked column on phones, ring + tiles side by side
 * from sm up (the design's horizontal layout at 1440).
 */
export function TodaysProgress({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col gap-5 p-5 sm:p-6", className)}>
      <SectionHeader title={sectionTitles.progress} />

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        {/* Completion ring */}
        <ProgressRing
          value={progress.done}
          max={progress.goal}
          strokeWidth={9}
          label={`${progress.done} of ${progress.goal} pomodoros`}
          className="size-[124px] shrink-0"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-medium text-ink">
              {progress.done}
              <span className="text-muted">/</span>
              {progress.goal}
            </span>
            <span className="text-sm text-muted">Pomodoros</span>
          </div>
        </ProgressRing>

        {/* Stat tiles
            `flex-wrap` + nowrap labels: side by side whenever the card has
            room (the 1440 design), stacked onto their own lines when it does
            not (half-width card at md-lg) — never squeezed or truncated. */}
        <div className="flex w-full min-w-0 flex-1 flex-wrap items-start justify-around gap-x-4 gap-y-3">
          {progressStats.map((stat) => {
            const Icon = STAT_ICON[stat.id];
            return (
              <div
                key={stat.id}
                className="flex shrink-0 flex-col items-center gap-1 text-center"
              >
                <Icon className="size-8 shrink-0" />
                <span className="whitespace-nowrap text-xl font-medium tracking-wide text-ink">
                  {stat.value}
                </span>
                <span className="whitespace-nowrap text-sm text-muted">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
