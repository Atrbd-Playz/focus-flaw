import type { LucideIcon, LucideProps } from "lucide-react";
import {
  Calendar,
  ChartColumn,
  FileText,
  House,
  Settings,
  SquareCheck,
  Timer,
} from "lucide-react";
import type { NavItemId } from "@/lib/types";

/**
 * ============================================================================
 *  nav-icons — WHICH glyph each navigation entry draws.
 * ----------------------------------------------------------------------------
 *  The navbar draws [lucide-react](https://lucide.dev) icons. This table is
 *  the single place to change one: swap the component, or leave the glyph
 *  alone and override how it draws via `props`.
 *
 *  This is CODE-ONLY configuration on purpose — there is no settings UI, no
 *  persistence, no runtime switch. Swapping an icon is an edit here plus a
 *  rebuild.
 *
 *  To change a glyph:
 *
 *      pomodoro: { icon: AlarmClock },        // was Timer
 *
 *  To change how one entry draws (stroke weight, fill, ...) without touching
 *  the glyph, pass props. They are spread AFTER the layout's own sizing
 *  classes, so anything set here wins:
 *
 *      statistics: { icon: ChartColumn, props: { strokeWidth: 1.5 } },
 *
 *  Sizing stays with the layout (`NavItemLink`), because the rail and the
 *  bottom bar size the same glyph differently at each breakpoint. Only pass
 *  `className` here if an entry genuinely needs to break that.
 *
 *  Every entry is required: `NavItemId` is a closed union, so adding a nav
 *  destination to `lib/data.ts` without giving it an icon is a type error
 *  rather than a blank row.
 * ============================================================================
 */

/** A nav glyph, plus any lucide props to pin on it in code. */
export interface NavIconEntry {
  /** The lucide component to draw. */
  icon: LucideIcon;
  /**
   * Extra props spread onto the icon, after the layout's sizing classes.
   * Sizing is normally left to the layout — see the note above.
   */
  props?: Omit<LucideProps, "aria-hidden" | "aria-label">;
}

/**
 * Lucide's own names, not the `*Icon` suffixed aliases it also exports —
 * those would collide with the generated Figma set in `components/icons`.
 */
export const navIcons: Record<NavItemId, NavIconEntry> = {
  home: { icon: House },
  pomodoro: { icon: Timer },
  tasks: { icon: SquareCheck },
  calendar: { icon: Calendar },
  statistics: { icon: ChartColumn },
  notes: { icon: FileText },
  settings: { icon: Settings },
};
