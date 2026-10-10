import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { weekChart, weekHeader } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * "Weekly Overview" — a 7-day bar chart drawn with plain divs.
 *
 * The Figma export baked each bar's height into a pixel value
 * (`h-[60px]`, `h-[47px]`...). Here every bar is `value / max * 100%`, so
 * swapping the data updates the chart with no layout maths.
 *
 * The plot uses `aspect` + percentage heights inside a flex column with a
 * fixed label gutter, so it scales with the card at any width.
 */
export function WeeklyOverview({ className }: { className?: string }) {
  const { ticks, max, points } = weekChart;

  return (
    <Card alt className={cn("flex flex-col gap-4 p-4 sm:p-5", className)}>
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

      {/* Plot */}
      <div className="flex gap-2">
        {/* y-axis gutter */}
        <div className="flex w-4 flex-col justify-between text-micro text-muted" aria-hidden="true">
          {[...ticks].reverse().map((t) => (
            <span key={t} className="leading-none">
              {t}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* gridlines */}
          <div className="relative h-[132px] sm:h-[152px]" aria-hidden="true">
            <div className="absolute inset-0 flex flex-col justify-between">
              {ticks.map((t) => (
                <span key={t} className="block h-px w-full bg-line-soft" />
              ))}
            </div>

            {/* bars */}
            <ul className="absolute inset-0 flex items-end justify-between gap-1.5 sm:gap-2">
              {points.map((p) => (
                <li key={p.day} className="flex h-full min-w-0 flex-1 items-end">
                  <span
                    className="w-full rounded-t-[4px] bg-chart-bar transition-[height] duration-500"
                    style={{ height: `${Math.max(4, (p.value / max) * 100)}%` }}
                    title={`${p.day}: ${p.value}`}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* x-axis labels */}
          <ul className="mt-2 flex justify-between gap-1.5 text-center font-chart text-micro text-muted sm:gap-2">
            {points.map((p) => (
              <li key={p.day} className="min-w-0 flex-1 truncate">
                {p.day}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Screen-reader summary of the chart */}
      <p className="sr-only">
        Pomodoros completed this week:{" "}
        {points.map((p) => `${p.day} ${p.value}`).join(", ")}.
      </p>
    </Card>
  );
}
