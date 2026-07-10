import { getContent } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import Hairline from "@/components/ui/Hairline";

/**
 * Disciplines / Services (ux-spec §5, band "02").
 *
 * The five in-house disciplines as one editorial, hairline-separated list —
 * imagery-light and typographic. Ordered by `throughlineStep` so the section
 * reads as a single continuous capability: concept → design → visualization →
 * documentation → made object, all under one roof.
 *
 * Async server component. Fetches its own data via getContent().
 */
export async function Disciplines() {
  const { services } = await getContent();

  // Honor the throughline sequence explicitly (concept → made object).
  const disciplines = [...services].sort(
    (a, b) => a.throughlineStep - b.throughlineStep,
  );

  return (
    <section
      id="disciplines"
      aria-labelledby="disciplines-heading"
      className="py-24 md:py-32"
    >
      <Container>
        {/* Band header — decorative number + serif headline + throughline lead */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel number="02">Disciplines</SectionLabel>
            <h2
              id="disciplines-heading"
              className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.08] tracking-[-0.015em] text-ink"
            >
              One studio, five disciplines, no handoffs.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="max-w-[46ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-stone">
              Most projects are pulled apart and passed between practices — the
              idea drawn by one hand, rendered by another, documented by a third,
              made by a fourth. We keep the whole line in-house, so intent
              survives from the first sketch to the object you can hold.
            </p>
            <p
              aria-hidden="true"
              className="mt-8 font-serif text-[clamp(1.05rem,1.6vw,1.35rem)] font-light italic leading-snug text-clay"
            >
              Concept &rarr; design &rarr; visualization &rarr; documentation
              &rarr; made object.
            </p>
          </div>
        </div>

        {/* The disciplines list — hairline rows, small labels, serif titles */}
        <ol className="mt-16 md:mt-24">
          {disciplines.map((service, i) => (
            <li key={service.id}>
              {i === 0 && <Hairline />}
              <div className="grid grid-cols-1 items-baseline gap-x-8 gap-y-4 py-10 md:grid-cols-12 md:py-12">
                {/* Editorial number */}
                <div className="md:col-span-2">
                  <span className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-none text-stone">
                    {service.number}
                  </span>
                </div>

                {/* Serif title + throughline caption */}
                <div className="md:col-span-4">
                  <h3 className="font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] font-normal leading-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-stone">
                    <span className="text-stone">
                      Step {String(service.throughlineStep).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true"> — </span>
                    <span className="text-stone">Continuous line</span>
                  </p>
                </div>

                {/* Studio-voice description */}
                <div className="md:col-span-6">
                  <p className="max-w-[52ch] text-base leading-relaxed text-stone">
                    {service.description}
                  </p>
                </div>
              </div>
              <Hairline />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default Disciplines;
