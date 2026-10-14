import type { ReactNode } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BrandBlock } from "@/components/layout/BrandBlock";
import { LeftNav } from "@/components/layout/LeftNav";
import { BottomNav } from "@/components/layout/BottomNav";

/**
 * ============================================================================
 *  AppShell — the page grid.
 * ----------------------------------------------------------------------------
 *  ONE DOM tree serves two layouts. The switch between them is the
 *  `artboard:` variant, declared once in `app/globals.css`:
 *
 *    --breakpoint-artboard: 1100px
 *
 *   < artboard   RESPONSIVE. The frame is fluid, the rail drops under the
 *                main column, and below md the sidebar is replaced by a
 *                fixed bottom nav. Every `artboard:*` class below is inert.
 *   >= artboard  ARTBOARD MODE. `.ff-frame` is laid out at the design's exact
 *                1440x1024 Figma frame and scaled to the viewport with
 *                `zoom: calc(100cqw / 1440px)`, so every card keeps the size
 *                the design drew it (see docs/STYLEGUIDE.md § 9).
 *
 *  Because both modes live in the same markup there is no duplicated DOM,
 *  no second accessibility tree and no `isDesktop` branch in JS.
 *
 *  `min-w-0` on every track and flex child, so long task titles scroll
 *  inside their card instead of widening the page.
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
    <>
      {/* The container: `[container-type:inline-size]` makes `100cqw` resolve to
          the shell's content box, which is what the frame's zoom divides by. */}
      <div className="ff-shell min-h-dvh bg-canvas pb-24 @container md:pb-6 artboard:pb-0">
        <div className="ff-frame mx-auto flex w-full max-w-[1600px] items-start gap-3 p-3 sm:gap-4 sm:p-4 lg:p-6 artboard:mx-0 artboard:w-[1440px] artboard:min-h-[1024px] artboard:max-w-none artboard:flex-none artboard:items-stretch artboard:gap-0 artboard:px-0 artboard:pt-[7px] artboard:pb-0 artboard:[zoom:calc(100cqw/1440px)]">
          {/* Left column — hidden below md, where BottomNav takes over. */}
          <div className="ff-side hidden shrink-0 flex-col gap-4 md:flex md:w-19 lg:w-54 artboard:w-[229px] artboard:flex-none artboard:gap-0">
            {/* Brand sits here from lg up; below that it renders in the header. */}
            <BrandBlock className="ff-brand hidden lg:flex " />
            <LeftNav activeId={activeId} className="ff-nav " />
          </div>

          {/* Right column */}
          <div className="ff-content flex min-w-0 flex-1 flex-col gap-4 lg:gap-5 artboard:w-[1211px] artboard:flex-none artboard:gap-0">
            <TopBar />

            <div className="ff-grid grid min-w-0 gap-3 sm:gap-4 artboard:flex artboard:items-start artboard:gap-[19px]">
              {/* Main column */}
              <div className="ff-main flex min-w-0 flex-col gap-3 sm:gap-4 artboard:w-[820px] artboard:flex-none artboard:gap-0">
                {main}
              </div>

              {/* Right rail — full width below the main column until xl.
                  `not-artboard` keeps the sticky rail out of artboard mode,
                  where the page never scrolls and `static` is the truth. */}
              <aside
                aria-label="Summary"
                className="ff-rail flex min-w-0 flex-col gap-3 sm:gap-4 artboard:static artboard:w-[370px] artboard:flex-none artboard:mr-[2px] artboard:gap-0 artboard:self-start xl:not-artboard:sticky xl:not-artboard:top-6 xl:not-artboard:self-start"
              >
                {aside}
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* Outside the shell: `container-type` makes it a containing block for
          this fixed element. */}
      <BottomNav activeId={activeId} />
    </>
  );
}