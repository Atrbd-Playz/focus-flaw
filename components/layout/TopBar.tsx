import { BellIcon, SearchIcon, SettingsFilledIcon, SunIllustration } from "@/components/icons";
import { BrandBlock } from "@/components/layout/BrandBlock";
import { greeting, searchHint } from "@/lib/data";

/**
 * Header row: brand (below lg) · greeting · search · notifications · settings.
 *
 * In artboard mode this row is the header panel (1211x98, rx15, no stroke —
 * the Figma rect is a bare fill one shade off the canvas); below the
 * breakpoint the same markup is a fluid, wrapping row.
 *
 * Responsive (see docs/ARCHITECTURE.md § 7):
 *   < sm    brand + actions on line 1, greeting drops to its own line so
 *           nothing truncates to nothing at 320px
 *   sm-lg   brand moves inline ahead of the greeting
 *   >= lg   brand is rendered by AppShell above the sidebar, so it disappears
 *           from here and the row becomes greeting + actions
 *
 * Ordering is done with flex `order` so the DOM stays semantic (greeting
 * immediately follows the brand) while the visual order changes per
 * breakpoint. `artboard:*` carries the exact design pixels.
 */
export function TopBar() {
  return (
    <>
    <header
      id="top"
      className="w-full"
    >
      <div className="flex justify-between lg:justify-end w-full">
        {/* Brand — only where the sidebar column cannot carry it */}
        <BrandBlock className="min-w-0 lg:hidden" />



        {/* Actions */}
        <div className="ff-actions ml-auto flex shrink-0 items-center gap-0.5 sm:ml-0">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="flex items-center md:gap-5 rounded-pill bg-white px-3 py-3 transition-colors hover:bg-surface-raised cursor-pointer sm:px-4"
          >
            <SearchIcon className="size-4 shrink-0 text-graphite" />
            <span className="hidden font-kbd text-sm leading-none text-graphite md:inline">{searchHint}</span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="grid size-10 place-items-center rounded-pill text-graphite transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-accent"
          >
            <BellIcon className="size-4" />
          </button>

          {/* Settings */}
          <button
            type="button"
            aria-label="Settings"
            className="ff-settings grid size-10 place-items-center rounded-pill text-graphite transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-accent artboard:ml-[19px]"
          >
            <SettingsFilledIcon className="size-4" />
          </button>
        </div>
      </div>


    </header>

      {/* Greeting */}
      <div className="ff-greeting lg:absolute flex gap-3 items-center ">
        <SunIllustration className="size-6 shrink-0 text-amber md:size-8 " />
        <div className="min-w-0">
          <p className="truncate font-display text-md font-bold leading-snug text-ink">{greeting.title}</p>
          <p className="truncate font-greeting text-tiny text-muted">{greeting.subtitle}</p>
        </div>
      </div>

    </>
    
  );
}