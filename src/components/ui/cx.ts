/**
 * Minimal className joiner for the ui primitives. Filters falsy values so
 * conditional classes read cleanly: cx("base", active && "on", className).
 */
export function cx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
