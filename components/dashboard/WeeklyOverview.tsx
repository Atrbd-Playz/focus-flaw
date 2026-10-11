import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { weekChart, weekHeader } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * "Weekly Overview" — a 7-day bar chart drawn with plain divs.
 *
 * The Figma export baked each bar's height into a pixel value; here every bar
 * is `value / max * 100%`, so swapping the data updates the chart with no
 * layout maths. The measured heights (60/47/66/27/47/66/66 px on a 90px plot)
 * live in `weekChart.points`.
 *
 * Structure: a fixed-width y-axis gutter, then the plot (two rules — a top
 * rule at the highest tick and a baseline — with the bars between them) and
 * the day labels under it. Only those two rules exist in the design; the
 * intermediate ticks are labels only.
 *
 * The plot top lands 68px under the heading, a deliberately generous gap in
 * the export; the gutter is 10px taller than the track so `space-between`
 * centres all four ticks on their gridlines.
 */
export function WeeklyOverview({ className }: { className?: string }) {
  const { ticks, max, points } = weekChart;

  return (
    <Card
      alt
      className={cn(
        "ff-weekly flex flex-col gap-4 p-4 sm:p-5",
        "artboard:h-[271px] artboard:mt-[7px] artboard:gap-0 artboard:p-[11px_24px]",
        className,
      )}
    >
      <SectionHeader
        title={weekHeader.title}
        trailing={
          <button
            type="button"
            className="flex items-center gap-1 rounded-pill px-2 py-1 text-micro text-muted transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-accent"
          >
            {weekHeader.range}
            <svg viewBox="0 0 10 6" className="size-2.5" aria-hidden="true">
              <path
                d="M1 1l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        }
      />

      <div className="ff-chart flex gap-2 artboard:mt-[68px] artboard:items-start artboard:gap-2">
        {/* y-axis gutter: labels only, aligned to the same rhythm as the plot */}
        <div
          className="ff-chart-gutter flex h-[132px] w-4 flex-col justify-between text-micro text-muted sm:h-[152px] artboard:mt-[-5px] artboard:h-[100px] artboard:w-[26px] artboard:flex-none artboard:items-start artboard:text-left"
          aria-hidden="true"
        >
          {[...ticks].reverse().map((t) => (
            <span key={t} className="leading-none">
              {t}
            </span>
          ))}
        </div>

        <div className="ff-chart-main min-w-0 flex-1">
          <div className="ff-chart-track relative flex h-[132px] items-end justify-between gap-1.5 sm:h-[152px] artboard:h-[90px] artboard:gap-0">
            <span className="ff-grid-top absolute inset-x-0 top-0 block h-0.5 bg-grid" aria-hidden="true" />
            <span
              className="ff-grid-base absolute inset-x-0 -bottom-0.5 block h-0.5 bg-grid-base"
              aria-hidden="true"
            />

            {points.map((p) => (
              <span
                key={p.day}
                className="ff-bar w-full rounded-t-[4px] bg-chart-bar transition-[height] duration-500 artboard:w-[18px] artboard:min-w-0 artboard:flex-none"
                style={{ height: `${Math.max(4, (p.value / max) * 100)}%` }}
                title={`${p.day}: ${p.value}`}
              />
            ))}
          </div>

          <ul className="ff-chart-days mt-2 flex justify-between gap-1.5 text-center font-chart text-micro text-muted sm:gap-2 artboard:mt-[11px] artboard:gap-0">
            {points.map((p) => (
              <li
                key={p.day}
                className="min-w-0 flex-1 truncate artboard:w-[18px] artboard:min-w-0 artboard:flex-none artboard:overflow-visible artboard:text-clip"
              >
                {p.day}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Screen-reader summary of the chart */}
      <p className="sr-only">
        Focus hours this week: {points.map((p) => `${p.day} ${p.value}`).join(", ")}.
      </p>
    </Card>
  );
}