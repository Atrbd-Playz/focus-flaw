import { BellIcon, SearchIcon, SettingsFilledIcon, SunIllustration } from "@/components/icons";
import { BrandBlock } from "@/components/layout/BrandBlock";
import { greeting, searchHint } from "@/lib/data";

/**
 * Header row: brand (below lg) · greeting · search · notifications · settings.
 *
 * Deliberately NOT a card — the 1440 design floats this row on the canvas,
 * with no frame, unlike every panel below it.
 *
 * Responsive (see docs/ARCHITECTURE.md § Responsive strategy):
 *   < sm    brand + actions on line 1, greeting drops to its own line so
 *           nothing truncates to nothing at 320px
 *   sm-lg   brand moves inline ahead of the greeting
 *   >= lg   brand is rendered by AppShell above the sidebar, so it disappears
 *           from here and the row becomes greeting + actions
 *
 * Ordering is done with flex `order` so the DOM stays semantic (greeting
 * immediately follows the brand) while the visual order changes per
 * breakpoint.
 */
export function TopBar() {
  return (
    <header
      id="top"
      className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4"
    >
      {/* Brand — only where the sidebar column cannot carry it */}
      <BrandBlock className="order-1 min-w-0 lg:hidden" />

      {/* Greeting */}
      <div className="order-3 flex min-w-0 basis-full items-center gap-3 sm:order-2 sm:basis-auto sm:flex-1 sm:gap-4">
        <SunIllustration className="size-9 shrink-0 text-amber sm:size-10" />
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold leading-snug text-ink">
            {greeting.title}
          </p>
          <p className="truncate font-greeting text-sm text-muted">{greeting.subtitle}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="order-2 ml-auto flex shrink-0 items-center gap-1 sm:order-3 sm:ml-0 sm:gap-2">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="flex items-center gap-3 rounded-pill bg-surface px-3 py-2.5 transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-accent sm:px-4"
        >
          <SearchIcon className="size-5 shrink-0 text-graphite" />
          <span className="hidden font-kbd text-lg leading-none text-graphite md:inline">
            {searchHint}
          </span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="grid size-10 place-items-center rounded-pill text-graphite transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-accent"
        >
          <BellIcon className="size-6" />
        </button>

        {/* Settings */}
        <button
          type="button"
          aria-label="Settings"
          className="grid size-10 place-items-center rounded-pill text-graphite transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-accent"
        >
          <SettingsFilledIcon className="size-6" />
        </button>
      </div>
    </header>
  );
}
