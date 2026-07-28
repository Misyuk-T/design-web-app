import Image from "next/image";
import { cx } from "./cx";

export interface PlaceholderProps {
  /** Local asset path, e.g. "/images/hero.jpg" (no remote assets — NFR-B1). */
  src: string;
  /**
   * Descriptive alt for meaningful imagery. Leave undefined/"" for purely
   * decorative plates — the frame is then hidden from assistive tech (NFR-A1).
   */
  alt?: string;
  /** CSS aspect-ratio, e.g. "16/10", "4/5", "3/2", "1/1". Default "4/5". */
  aspect?: string;
  /** Eager-load above-the-fold imagery (hero). Default lazy. */
  priority?: boolean;
  /** Responsive source-size hint used by next/image. */
  sizes?: string;
  /** Extra classes on the frame. */
  className?: string;
  /** Extra classes on the <img> (e.g. group-hover:scale-[1.03] from a card). */
  imgClassName?: string;
}

/**
 * A fixed-aspect image frame (ux-spec §4.2) that reserves its box so a slow or
 * absent image causes zero layout shift (NFR-P3). Backed by `bg-oat` so it
 * always reads as a warm plate, never white. Plain <img> keeps SVG placeholders
 * config-free (no next/image SVG allowance needed).
 */
export function Placeholder({
  src,
  alt,
  aspect = "4/5",
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
  className,
  imgClassName,
}: PlaceholderProps) {
  const decorative = !alt;
  return (
    <div
      className={cx(
        "relative w-full overflow-hidden rounded-frame bg-oat",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt ?? ""}
        aria-hidden={decorative || undefined}
        fill
        sizes={sizes}
        preload={priority}
        className={cx(
          "absolute inset-0 h-full w-full object-cover",
          imgClassName,
        )}
      />
    </div>
  );
}

export default Placeholder;
