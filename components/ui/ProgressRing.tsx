import { cn } from "@/lib/cn";

/**
 * Circular progress ring — used by the timer hero and the "4/7" stat.
 *
 * Drawn as SVG on a 100x100 viewBox so the caller sizes it with CSS
 * (`size-[clamp(...)]`) and the stroke scales with it, which keeps the arc
 * crisp at every breakpoint instead of locking the design to one pixel size.
 *
 * Geometry lives in viewBox units: r=44, so a stroke of `s` renders as
 * `s%` of the box. Defaults match the Figma ring (14/239 ≈ 0.059).
 *
 * Track = `--color-accent-soft`, arc = `--color-accent`, both round-capped.
 */
export function ProgressRing({
  value,
  max,
  strokeWidth = 6,
  label,
  className,
  children,
}: {
  value: number;
  max: number;
  /** Stroke thickness in viewBox units (100 = full box). */
  strokeWidth?: number;
  /** Read by assistive tech; falls back to "value of max". */
  label?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, max === 0 ? 0 : value / max));
  const dash = c * clamped;

  return (
    <div className={cn("relative grid place-items-center", className)} role="img" aria-label={label ?? `${value} of ${max}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90 overflow-visible">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth={strokeWidth} className="stroke-accent-soft" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          className="stroke-accent"
        />
      </svg>
      <div className="relative z-10 grid place-items-center text-center">{children}</div>
    </div>
  );
}
