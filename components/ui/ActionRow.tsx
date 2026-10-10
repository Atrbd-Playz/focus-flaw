import type { ComponentPropsWithoutRef } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * The tappable row shared by Quick Actions and the task list: a raised
 * surface, a leading icon, a label, and an optional trailing affordance.
 *
 * Figma: rounded-[15px], `--color-surface-raised` fill, hairline border.
 * Stays a real <button> so it works with keyboard and touch alike.
 */
export function ActionRow({
  icon,
  label,
  meta,
  showChevron = false,
  className,
  ...rest
}: {
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** Secondary text under/next to the label (e.g. a time range). */
  meta?: React.ReactNode;
  showChevron?: boolean;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "row-frame group flex w-full items-center gap-3 px-3 py-2.5 text-left",
        "transition-colors hover:border-muted/70",
        "focus-visible:outline-2 focus-visible:outline-accent",
        className,
      )}
      {...rest}
    >
      {icon ? <span className="grid size-5 shrink-0 place-items-center text-muted">{icon}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-tiny font-medium text-muted">{label}</span>
        {meta ? <span className="block truncate text-tiny text-muted-subtle">{meta}</span> : null}
      </span>
      {showChevron ? <ChevronRightIcon className="size-3 shrink-0 text-muted" /> : null}
    </button>
  );
}
