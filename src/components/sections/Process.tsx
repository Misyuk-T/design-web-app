import { getContent } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import Hairline from "@/components/ui/Hairline";

/**
 * Process (band 04) — the in-house throughline made explicit.
 *
 * The studio's argument for continuity: concept, design, visualization,
 * documentation and making happen under one roof, in one hand. Rendered as a
 * numbered editorial list — each step a short contemplative line — with the
 * signature hairline rules and generous vertical rhythm (ux-spec §3, §5).
 *
 * Async server component; sources its steps from getContent().settings.
 */
export default async function Process() {
  const { settings } = await getContent();
  const steps = settings.processSteps;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-t border-rule py-24 md:py-32"
    >
      <Container>
        {/* Band header — asymmetric: label + headline left, framing line right. */}
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-6">
            <SectionLabel number="04">Process</SectionLabel>
            <h2
              id="process-heading"
              className="mt-6 font-serif font-light tracking-[-0.015em] leading-[1.08] text-[clamp(2rem,4vw,3.5rem)]"
            >
              One studio, from first line to finished object.
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="max-w-[46ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-stone">
              Every discipline lives under one roof, so nothing is handed off and
              nothing is lost in translation — the same hands that imagine a space
              draw it, render it, detail it and make it.
            </p>
          </div>
        </div>

        {/* Numbered steps — editorial list, hairline-separated rows. */}
        <ol className="mt-16 md:mt-24">
          {steps.map((step, i) => (
            <li key={step.number}>
              {i === 0 ? <Hairline /> : null}
              <div className="grid grid-cols-1 gap-x-8 gap-y-4 py-10 md:grid-cols-12 md:py-14">
                <div className="md:col-span-5">
                  <div className="flex items-baseline gap-5">
                    <span
                      aria-hidden="true"
                      className="text-xs font-medium uppercase tracking-[0.18em] text-stone"
                    >
                      {step.number}
                    </span>
                    <h3 className="font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] font-normal leading-tight">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="max-w-[52ch] leading-relaxed text-stone md:col-span-6 md:col-start-7">
                  {step.description}
                </p>
              </div>
              <Hairline />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
