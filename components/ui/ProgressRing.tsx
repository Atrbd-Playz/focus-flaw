import { cn } from "@/lib/cn";

/**
 * Circular progress ring — used by the timer hero and the "4/7" stat.
 *
 * Drawn as SVG on a 100x100 viewBox so the caller sizes it with CSS and the
 * stroke scales with it, which keeps the arc crisp at every breakpoint
 * instead of locking the design to one pixel size.
 *
 * All geometry is in viewBox units (100 = the full box):
 *   r            centre-line radius. The design's two rings differ, so it is
 *                passed in: the timer uses (239-13)/2 / 2.39 = 47.3, the
 *                progress stat uses (130-9)/2 / 1.3 = 46.5.
 *   strokeWidth  stroke thickness, likewise expressed as a fraction of the
 *                box (13px on a 239px box = 5.44).
 *
 * The arc always starts at 12 o'clock (`-rotate-90`). `cap="butt"` matches
 * the Figma export, where the arc ends on a true radial edge; "round" adds
 * half a stroke of overshoot at both ends.
 *
 * `contentClassName` styles the wrapper around `children`, because the two
 * call sites want opposite layouts: the hero floats its digits over the photo
 * (`artboard:absolute inset-0`), while the stat stacks them inside the ring.
 */
export function ProgressRing({
  value,
  max,
  r = 44,
  strokeWidth = 6,
  cap = "butt",
  trackClassName = "stroke-accent-soft",
  label,
  className,
  contentClassName,
  children,
}: {
  value: number;
  max: number;
  /** Centre-line radius, in viewBox units. */
  r?: number;
  /** Stroke thickness, in viewBox units (100 = full box). */
  strokeWidth?: number;
  cap?: "butt" | "round";
  /** Colour of the un-swept track; the timer overrides it to the surface. */
  trackClassName?: string;
  /** Read by assistive tech; falls back to "value of max". */
  label?: string;
  className?: string;
  /** Extra classes for the element that wraps `children`. */
  contentClassName?: string;
  children?: React.ReactNode;
}) {
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, max === 0 ? 0 : value / max));
  const dash = c * clamped;
  const linecap = cap === "round" ? "round" : "butt";

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      role="img"
      aria-label={label ?? `${value} of ${max}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full -rotate-90 overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth={strokeWidth} className={trackClassName} />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap={linecap}
          strokeDasharray={`${dash} ${c - dash}`}
          className="stroke-accent"
        />
      </svg>
      <div
        className={cn(
          "ff-ring-content relative z-10 grid place-items-center text-center",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}