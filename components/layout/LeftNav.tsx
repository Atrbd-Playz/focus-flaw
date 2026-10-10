import { navItems } from "@/lib/data";
import { NavItemLink } from "@/components/layout/NavItemLink";
import { cn } from "@/lib/cn";

/**
 * Left navigation (md and up).
 *
 *  md-lg   centred icon-only rail (76px) — the label text node is hidden, but
 *          the link keeps `aria-label` + `title`, so the accessible name and
 *          the tooltip never disappear
 *  lg+     full 216px sidebar with labels, matching the 1440 design
 *  < md    hidden entirely; <BottomNav /> takes over
 *
 * Uses the standard `card-frame` (16px radius, 0.25px hairline at 60%) —
 * the design's rail carries the same frame as every other panel, just with a
 * surface so close to the canvas that only the hairline reads.
 *
 * A flex column, never absolutely positioned, so it grows with its content.
 */
export function LeftNav({
  activeId = "home",
  className,
}: {
  activeId?: string;
  className?: string;
}) {
  return (
    <nav
      aria-label="Primary"
      className={cn("card-frame flex w-full flex-col gap-1 self-start p-2 lg:p-4", className)}
    >
      {navItems.map((item) => (
        <NavItemLink key={item.id} item={item} active={item.id === activeId} layout="rail" />
      ))}
    </nav>
  );
}
