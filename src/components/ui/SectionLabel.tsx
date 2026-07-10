import type { ElementType, ReactNode } from "react";
import { cx } from "./cx";

export interface SectionLabelProps {
  /** Editorial section number, e.g. "01". Omit for unnumbered book-ends. */
  number?: string;
  /** The label text, e.g. "Studio". Also used as a discipline tag. */
  children: ReactNode;
  /** Element to render as. Default: "p" (decorative — the real <h2> follows). */
  as?: ElementType;
  className?: string;
}

/**
 * The signature uppercase eyebrow (ux-spec §2.3). Renders "01 — Studio":
 * small, letter-spaced, muted. The visible number is decorative — the real
 * heading is the serif <h2> a section renders after this (NFR-A5).
 */
export function SectionLabel({
  number,
  children,
  as: Tag = "p",
  className,
}: SectionLabelProps) {
  return (
    <Tag
      className={cx(
        "text-xs font-medium uppercase tracking-[0.18em] text-stone",
        className,
      )}
    >
      {number ? (
        <>
          <span>{number}</span>
          <span aria-hidden="true"> — </span>
        </>
      ) : null}
      <span className="text-ink">{children}</span>
    </Tag>
  );
}

export default SectionLabel;
