import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The heading row used at the top of every card: title on the leading edge,
 * an optional counter/action on the trailing edge.
 *
 * Title uses `text-md` (16px) `font-medium` on `--color-ink`, matching the
 * Figma card headings.
 */
export function SectionHeader({
  title,
  trailing,
  className,
}: {
  title: string;
  /** Rendered at the trailing edge — counters, dropdowns, "View All". */
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <h2 className="min-w-0 truncate text-md font-medium text-ink">{title}</h2>
      {trailing ? <div className="shrink-0 text-sm text-muted">{trailing}</div> : null}
    </div>
  );
}
