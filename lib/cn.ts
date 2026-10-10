/**
 * Tiny class-name joiner so components never ship a dependency just to
 * concatenate conditional Tailwind strings.
 *
 *     cn("base", condition && "extra", className)
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
