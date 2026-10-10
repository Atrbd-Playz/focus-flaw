import { navItems } from "@/lib/data";
import { NavItemLink } from "@/components/layout/NavItemLink";

/**
 * Fixed bottom navigation for phones (< md), replacing the sidebar.
 *
 * Adaptation research (see docs/ARCHITECTURE.md § Responsive strategy):
 * side navigation is a desktop affordance — on a phone it becomes a
 * thumb-reachable bottom bar with 44px+ touch targets.
 *
 * Only the four primary destinations fit at 320px; the rest stay reachable
 * from the sidebar on larger screens, and this bar never scrolls away.
 */
export function BottomNav({ activeId = "home" }: { activeId?: string }) {
  const primary = navItems.filter((n) => n.mobile).slice(0, 4);

  return (
    <nav
      aria-label="Primary"
      className="card-frame fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-1 px-2 py-1.5 md:hidden"
      style={{ paddingBlockEnd: "max(0.375rem, env(safe-area-inset-bottom))" }}
    >
      {primary.map((item) => (
        <NavItemLink key={item.id} item={item} active={item.id === activeId} layout="bar" />
      ))}
    </nav>
  );
}
