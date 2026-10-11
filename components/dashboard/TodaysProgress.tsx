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

/** Ring geometry in artboard pixels: 130px box, 9px stroke. */
const RING = { r: 46.54, strokeWidth: 6.92 } as const;

/**
 * "Today's Progress" — completion ring plus two stat tiles.
 *
 * Artboard (473x235): the 130px ring sits at (25, 72) and the two stats form
 * a two-cell grid from x171. Each stat is an icon chip over a value over a
 * label; the trio is centred as a block while the value and label share a
 * left edge, exactly as the export draws them. Every one of those numbers is
 * an `artboard:*` class below.
 *
 * Responsive: single stacked column on phones, ring + tiles side by side
 * from sm up (the design's horizontal layout at 1440).
 */
export function TodaysProgress({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "ff-progress relative flex flex-col gap-5 p-5 sm:p-6",
        "artboard:flex-none artboard:h-[235px] artboard:w-[473px] artboard:gap-0 artboard:p-[11px_12px]",
        className,
      )}
    >
      <SectionHeader title={sectionTitles.progress} className="artboard:px-[12px]" />

      <div className="ff-progress-body flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8 artboard:block artboard:flex-none">
        {/* Completion ring */}
        <ProgressRing
          value={progress.done}
          max={progress.goal}
          r={RING.r}
          strokeWidth={RING.strokeWidth}
          label={`${progress.done} of ${progress.goal} pomodoros`}
          className="ff-progress-ring size-[130px] shrink-0 artboard:absolute artboard:left-[25px] artboard:top-[72px] artboard:h-[130px] artboard:w-[130px]"
          contentClassName="artboard:static artboard:flex artboard:flex-col artboard:items-center artboard:justify-center"
        >
          <div className="flex flex-col items-center">
            <span className="ff-ring-value text-2xl font-medium leading-none text-ink artboard:text-[32px] artboard:leading-[36px]">
              {progress.done}
              <span className="text-muted">/</span>
              {progress.goal}
            </span>
            <span className="ff-ring-label mt-2 text-sm text-muted artboard:mt-0 artboard:text-[13px] artboard:leading-[14px]">
              Pomodoros
            </span>
          </div>
        </ProgressRing>

        {/* Stat tiles
            `flex-wrap` + nowrap labels: side by side whenever the card has
            room (the 1440 design), stacked onto their own lines when it does
            not (half-width card at md-lg) — never squeezed or truncated. */}
        <div className="ff-stat-grid flex w-full min-w-0 flex-1 flex-wrap items-start justify-around gap-x-4 gap-y-3 artboard:absolute artboard:left-[171px] artboard:top-[84px] artboard:grid artboard:w-[302px] artboard:grid-cols-2 artboard:gap-0">
          {progressStats.map((stat) => {
            const Icon = STAT_ICON[stat.id];
            return (
              <div
                key={stat.id}
                className="ff-stat flex shrink-0 flex-col items-center gap-1 text-center artboard:grid artboard:grid-cols-[max-content] artboard:justify-center artboard:justify-items-start artboard:content-start artboard:gap-0"
              >
                <Icon className="ff-stat-chip size-[29px] shrink-0 artboard:left-[-40px] artboard:h-[29px] artboard:w-[29px] artboard:justify-self-center" />
                <span className="ff-stat-value whitespace-nowrap text-xl font-medium tracking-wide text-ink artboard:mt-[7px] artboard:text-[22px] artboard:leading-none">
                  {stat.value}
                </span>
                <span className="ff-stat-label whitespace-nowrap text-sm text-muted artboard:mt-[11px] artboard:text-[13px] artboard:leading-none">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}