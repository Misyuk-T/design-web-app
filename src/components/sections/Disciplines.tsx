import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { getCommonCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/locale";
import Link from "next/link";
import { localizedPath } from "@/lib/locale-shared";

export async function Disciplines() {
  const { locale, content } = await getLocalizedContent();
  const { services } = content;
  const copy = getCommonCopy(locale).disciplines;
  const disciplines = [...services].sort(
    (a, b) => a.throughlineStep - b.throughlineStep,
  );

  return (
    <section
      id="disciplines"
      aria-labelledby="disciplines-heading"
      className="section-space border-t border-rule bg-ivory"
    >
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionLabel number="02">{copy.label}</SectionLabel>
              <h2
                id="disciplines-heading"
                className="section-title mt-7 max-w-[11.5ch] font-serif font-light text-balance"
                style={
                  locale === "uk"
                    ? { fontSize: "clamp(2.35rem, 4.45vw, 4.25rem)" }
                    : undefined
                }
              >
                {copy.title}
              </h2>
              <p className="mt-7 max-w-[38ch] text-[0.975rem] leading-7 text-stone">
                {copy.lead}
              </p>
              <div className="mt-10 hidden items-center gap-4 lg:flex">
                <span className="eyebrow text-clay">01</span>
                <span className="h-px w-16 bg-clay/50" />
                <span className="eyebrow text-clay">05</span>
              </div>
            </div>
          </div>

          <ol className="border-t border-rule lg:col-span-7 lg:col-start-6">
            {disciplines.map((service) => (
              <li
                key={service.id}
                className="group border-b border-rule py-8 md:py-10"
              >
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-5 sm:grid-cols-[3.5rem_minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-x-7">
                  <span className="eyebrow pt-2 text-stone">
                    {service.number}
                  </span>
                  <h3 className="min-w-0 font-serif text-[clamp(1.75rem,2.8vw,3rem)] font-light leading-[1.04] tracking-[-0.03em] text-ink transition-colors duration-[var(--dur)] [hyphens:auto] [overflow-wrap:anywhere] group-hover:text-clay">
                    <Link
                      href={localizedPath(
                        locale,
                        `/services/${service.key}`,
                      )}
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className="col-start-2 max-w-[46ch] text-[0.95rem] leading-7 text-stone sm:col-start-3 sm:pt-1">
                    {service.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default Disciplines;
