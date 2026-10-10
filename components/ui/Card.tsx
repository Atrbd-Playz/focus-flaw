import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * The card frame — one recipe for every panel in the design.
 *
 * Figma: rx="16" stroke-width="0.25" stroke-opacity="0.6" stroke="#626368"
 * i.e. a 16px radius with a 0.25px hairline in the muted grey at 60%.
 *
 * `alt` switches to the secondary panel surface (chart / music / nav rail).
 */
export function Card({
  alt = false,
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { alt?: boolean }) {
  return (
    <div className={cn(alt ? "card-frame-alt" : "card-frame", className)} {...rest}>
      {children}
    </div>
  );
}
