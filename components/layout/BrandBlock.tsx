import { FocusFlawLogo } from "@/components/icons";
import { brand } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * Brand lockup: leaf mark · name · tagline.
 *
 * Lives in two places depending on breakpoint (see AppShell):
 *  - lg+   at the top of the left navigation column (matches the 1440 design,
 *          where the logo sits in the sidebar gutter)
 *  - < lg  inline in the header, next to the greeting
 *
 * `display` is driven by the caller so the duplicate never shows twice.
 */
export function BrandBlock({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label={`${brand.name} home`}
      className={cn("flex min-w-0 items-center gap-3", className)}
    >
      <FocusFlawLogo className="size-[38px] shrink-0" />
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-brand text-xl font-semibold leading-tight text-ink">
          {brand.name}
        </span>
        <span className="mt-0.5 truncate font-micro text-sm text-muted">
          {brand.tagline}
        </span>
      </span>
    </a>
  );
}
