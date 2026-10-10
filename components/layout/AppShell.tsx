import type { ReactNode } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BrandBlock } from "@/components/layout/BrandBlock";
import { LeftNav } from "@/components/layout/LeftNav";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/cn";

/**
 * ============================================================================
 *  AppShell — the page grid.
 * ----------------------------------------------------------------------------
 *  Breakpoints are content-driven, not device-driven: each step is where the
 *  1440px design stops fitting, then the layout reflows. Full rationale in
 *  docs/ARCHITECTURE.md § Responsive strategy.
 *
 *    < md    (0-767)     single column, fixed bottom nav, brand inline in the
 *                        header, every card stacked
 *    md-lg   (768-1023)  72px icon rail; secondary cards reflow 2-up; brand
 *                        still inline in the header
 *    lg-xl   (1024-1279) 216px labelled sidebar carrying the brand lockup;
 *                        the right rail drops below the main column, since
 *                        three columns cannot hold the design's proportions
 *    >= xl   (1280+)     full 3-column design: rail | main | right rail
 *
 *  `minmax(0, 1fr)` on every track and `min-w-0` on every flex child, so long
 *  task titles scroll inside their card instead of widening the page.
 *
 *  Structure:
 *    [ left column: BrandBlock (lg+) + LeftNav ]   <- hidden below md
 *    [ right column: TopBar + grid( main | aside ) ]
 * ============================================================================
 */
export function AppShell({
  main,
  aside,
  activeId = "home",
}: {
  /** Timer + progress + quick actions. */
  main: ReactNode;
  /** Tasks + weekly overview + music. */
  aside: ReactNode;
  activeId?: string;
}) {
  return (
    <div className="min-h-dvh bg-canvas pb-24 md:pb-6">
      <div className="mx-auto flex w-full max-w-[1600px] items-start gap-3 p-3 sm:gap-4 sm:p-4 lg:p-6">
        {/* Left column — hidden below md, where BottomNav takes over. */}
        <div className="hidden shrink-0 flex-col gap-4 md:flex md:w-[76px] lg:w-[216px]">
          {/* Brand sits here from lg up; below that it renders in the header. */}
          <BrandBlock className="hidden lg:flex" />
          <LeftNav activeId={activeId} />
        </div>

        {/* Right column */}
        <div className={cn("flex min-w-0 flex-1 flex-col gap-4 lg:gap-5")}>
          <TopBar />

          <div className="grid min-w-0 gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
            {/* Main column */}
            <div className="flex min-w-0 flex-col gap-3 sm:gap-4">{main}</div>

            {/* Right rail — full width below the main column until xl */}
            <aside
              aria-label="Summary"
              className="flex min-w-0 flex-col gap-3 sm:gap-4 xl:sticky xl:top-6 xl:self-start"
            >
              {aside}
            </aside>
          </div>
        </div>
      </div>

      <BottomNav activeId={activeId} />
    </div>
  );
}
