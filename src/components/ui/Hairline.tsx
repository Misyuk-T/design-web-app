import { cx } from "./cx";

export interface HairlineProps {
  className?: string;
}

/**
 * The 1px oat rule — the site's only structural divider (ux-spec §3, NFR-D2).
 * Semantically a separator (renders <hr>). No boxes, no shadows, no color.
 */
export function Hairline({ className }: HairlineProps) {
  return (
    <hr
      className={cx("h-px w-full border-0 bg-rule", className)}
      aria-hidden="true"
    />
  );
}

export default Hairline;
