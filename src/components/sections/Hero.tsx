import { getSiteSettings } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Hero — the full-bleed opening statement (ux-spec §5 book-end: unnumbered).
 *
 * One senior studio, end-to-end: the studio wordmark, the material-driven
 * positioning statement (this page's single <h1>), a quiet sensory sub-line,
 * and a subtle scroll cue — set over one large atmospheric local SVG plate.
 * Serif Display XL dominates; the warm `bone` scrim keeps ink text AA-legible
 * over the image and the `bg-oat` frame guarantees zero layout shift (NFR-P3).
 */
export default async function Hero() {
  const { studioName, tagline, heroStatement, heroSub } =
    await getSiteSettings();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden"
    >
      {/* Atmospheric plate + warm scrim (decorative — hidden from AT). */}
      <div className="absolute inset-0 -z-10">
        <Placeholder
          src="/images/hero.svg"
          aspect="16/10"
          priority
          className="h-full"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-bone/85 via-bone/65 to-bone/90"
        />
      </div>

      <Container className="py-24 md:py-32 lg:py-40">
        <div className="max-w-[48rem]">
          <SectionLabel className="mb-8 md:mb-10">{studioName}</SectionLabel>

          <h1
            id="hero-heading"
            className="font-serif font-light text-ink text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            {heroStatement}
          </h1>

          <p className="mt-8 max-w-[34ch] font-serif font-normal text-ink text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight tracking-[-0.015em]">
            {tagline}
          </p>

          <p className="mt-8 max-w-[54ch] text-stone leading-relaxed text-[clamp(1.05rem,1.4vw,1.3rem)]">
            {heroSub}
          </p>
        </div>
      </Container>

      {/* Quiet scroll cue — book-end restraint; honors prefers-reduced-motion. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center md:bottom-10"
      >
        <span className="flex flex-col items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-stone">
          Scroll
          <span className="h-10 w-px bg-oat motion-safe:animate-pulse" />
        </span>
      </div>
    </section>
  );
}
