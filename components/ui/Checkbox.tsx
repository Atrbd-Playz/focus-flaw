import { CheckboxCheckedIcon, CheckboxEmptyIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Task checkbox.
 *
 * Two states only, matching the design:
 *  - done    -> filled `--color-success` square with a light tick
 *  - todo    -> hairline outline square (the Figma export shipped an invisible
 *               white tick on the empty box; see docs/STYLEGUIDE.md § Bugs fixed)
 *
 * Renders as a real <button> so it is keyboard reachable and announced.
 */
export function Checkbox({
  checked,
  className,
  ...rest
}: { checked: boolean } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={cn(
        "grid size-[22px] shrink-0 place-items-center rounded-[7px] transition-colors",
        "hover:border-muted focus-visible:outline-2 focus-visible:outline-accent",
        className,
      )}
      {...rest}
    >
      {checked ? (
        <CheckboxCheckedIcon className="size-[22px]" />
      ) : (
        <CheckboxEmptyIcon className="size-[22px] text-muted" />
      )}
    </button>
  );
}
