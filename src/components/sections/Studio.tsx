import { getContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { Placeholder } from "@/components/ui/Placeholder";

/**
 * Section 01 — Studio / About (ux-spec §5).
 *
 * Editorial "one team, five disciplines, one visual language" band: a numbered
 * label, an asymmetric grid pairing a light serif headline with the studio's
 * sensory philosophy paragraph, a quiet supporting plate, and a compact
 * hairline-ruled credential/stat row. Warm `bone` ground, no boxes or shadows —
 * hairlines are the only structural rule.
 */
export default async function Studio() {
  const { settings } = await getContent();
  const { tagline, aboutStatement, stats } = settings;

  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="scroll-mt-24 border-t border-rule py-24 md:py-32"
    >
      <Container>
        <SectionLabel number="01">Studio</SectionLabel>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-14 md:grid-cols-12">
          {/* Serif headline — the real section heading (NFR-A5). */}
          <h2
            id="studio-heading"
            className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.08] tracking-[-0.015em] text-ink md:col-span-5"
          >
            {tagline}
          </h2>

          {/* Sensory philosophy paragraph (Body L). */}
          <div className="md:col-span-6 md:col-start-7">
            <p className="max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-ink">
              {aboutStatement}
            </p>
          </div>
        </div>

        {/* Quiet supporting plate — decorative, zero layout shift. */}
        <div className="mt-14 md:mt-20">
          <Placeholder
            src="/images/studio.jpg"
            aspect="3/2"
            className="w-full"
          />
        </div>

        {/* Compact credential / stat row — hairline-ruled, no boxes. */}
        {stats.length > 0 && (
          <div className="mt-14 md:mt-20">
            <Hairline />
            <dl className="grid grid-cols-1 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={
                    "flex flex-col gap-2 py-8 sm:py-10" +
                    (i > 0
                      ? " border-t border-rule sm:border-t-0 sm:border-l sm:pl-8 md:pl-10"
                      : "")
                  }
                >
                  <dt className="order-2 text-xs font-medium uppercase tracking-[0.18em] text-stone">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-serif text-[clamp(2.25rem,4vw,3rem)] font-light leading-none tracking-[-0.01em] text-ink">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Hairline />
          </div>
        )}
      </Container>
    </section>
  );
}

export { Studio };
