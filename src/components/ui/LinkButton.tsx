import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "./cx";

export interface LinkButtonProps {
  href: string;
  children: ReactNode;
  /** Trailing arrow that nudges right on hover (ux-spec §4.1). */
  withArrow?: boolean;
  /** Opens in a new tab with safe rel. Use for off-site links. */
  external?: boolean;
  /** Light treatment for dark or image-backed surfaces. */
  inverse?: boolean;
  className?: string;
}

/**
 * The understated primary CTA (ux-spec §4.1): a bordered rect with a letter-
 * spaced uppercase label that inverts to ink-on-bone on hover. Not a filled
 * pill. Renders a Next <Link> so internal, hash, and mailto hrefs all work.
 */
export function LinkButton({
  href,
  children,
  withArrow = false,
  external = false,
  inverse = false,
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cx(
        "group inline-flex min-h-12 items-center gap-5 rounded-frame border px-6 py-3",
        "text-[0.6875rem] font-semibold uppercase tracking-[0.2em]",
        "transition-colors duration-[var(--dur)] ease-quiet",
        inverse
          ? "border-bone/65 text-bone hover:border-bone hover:bg-bone hover:text-ink"
          : "border-ink text-ink hover:bg-ink hover:text-bone",
        className,
      )}
    >
      <span>{children}</span>
      {withArrow ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-[var(--dur)] ease-quiet group-hover:translate-x-1"
        >
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}

export default LinkButton;
