import {
  CalendarIcon,
  HomeIcon,
  NoteIcon,
  SettingsIcon,
  StatisticsIcon,
  TimerIcon,
  CheckboxOutlineSmallIcon,
} from "@/components/icons";
import type { NavItem, NavItemId } from "@/lib/types";
import { cn } from "@/lib/cn";

/** Which generated icon each nav entry uses. */
const ICONS: Record<NavItemId, (p: { className?: string }) => React.ReactElement> = {
  home: HomeIcon,
  pomodoro: TimerIcon,
  tasks: CheckboxOutlineSmallIcon,
  calendar: CalendarIcon,
  statistics: StatisticsIcon,
  notes: NoteIcon,
  settings: SettingsIcon,
};

/**
 * Navigation entry — one component, two presentations:
 *
 *  layout="rail"  sidebar row. The label is visible at lg+ and hidden on the
 *                 md-icon rail, but the accessible name never disappears: the
 *                 link carries `aria-label` and the visible text is purely
 *                 decorative (`hidden lg:inline`).
 *  layout="bar"   mobile bottom bar — icon stacked over its label.
 *
 * Active state = `--color-nav-active` pill + ink label; inactive = muted.
 * Icons are `currentColor`, so one class colours icon and text together.
 * Rendered as a real <a>: keyboard reachable, ready for routes.
 */
export function NavItemLink({
  item,
  active,
  layout,
  className,
}: {
  item: NavItem;
  active: boolean;
  layout: "rail" | "bar";
  /** Hook for the artboard-mode geometry (see globals.css `.ff-nav-link`). */
  className?: string;
}) {
  const Icon = ICONS[item.id];
  const state = active
    ? "bg-nav-active text-ink"
    : "text-muted hover:bg-surface-raised hover:text-ink";

  if (layout === "bar") {
    return (
      <a
        href={`#${item.id}`}
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-card px-1 py-1.5",
          "focus-visible:outline-2 focus-visible:outline-accent",
          state,
        )}
      >
        <Icon className="size-4 md:size-5 lg:size-6 shrink-0" />
        <span className="max-w-full hidden lg:inline truncate text-[14px]">{item.label}</span>
      </a>
    );
  }

  return (
    <a
      href={`#${item.id}`}
      aria-label={item.label}
      title={item.label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-card py-2.5 text-sm font-medium",
        "focus-visible:outline-2 focus-visible:outline-accent",
        "justify-center px-0 lg:w-full lg:justify-start lg:px-3",
        state,
        "artboard:h-[41px] artboard:flex-none artboard:justify-start artboard:py-0 artboard:pr-0 artboard:pl-[20px] artboard:gap-[18px] artboard:rounded-card",
        className,
      )}
    >
      <Icon className="size-4 shrink-0" />
      {/* Visible only where the sidebar is wide enough to carry labels. */}
      <span className="hidden lg:inline lg:truncate">{item.label}</span>
    </a>
  );
}
