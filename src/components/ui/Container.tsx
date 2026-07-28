import type { ElementType, ReactNode } from "react";
import { cx } from "./cx";

export interface ContainerProps {
  /** Element to render as. Default: "div". */
  as?: ElementType;
  /**
   * "default" — the 1320px editorial measure (most bands).
   * "narrow" — a ~68ch reading measure for text-heavy passages.
   */
  width?: "default" | "narrow";
  className?: string;
  children: ReactNode;
}

/**
 * The editorial container (ux-spec §3): centered max-width with responsive
 * gutters. Everything on the page sits inside one of these. Use `width="narrow"`
 * for prose that should hold a comfortable measure.
 */
export function Container({
  as: Tag = "div",
  width = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cx(
        "mx-auto w-full px-5 sm:px-7 md:px-10 lg:px-14",
        width === "narrow" ? "max-w-[72ch]" : "max-w-[1320px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export default Container;
