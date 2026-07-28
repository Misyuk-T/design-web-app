import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { getCommonCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/locale";

export default async function Process() {
  const { locale, content } = await getLocalizedContent();
  const { settings } = content;
  const copy = getCommonCopy(locale).process;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section-space bg-clay text-bone"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel
              number="04"
              inverse
            >
              {copy.label}
            </SectionLabel>
            <h2
              id="process-heading"
              className={`display-lg mt-8 max-w-[12ch] font-serif font-light text-balance ${
                locale === "uk" ? "display-lg-uk" : ""
              }`}
            >
              {copy.title}
            </h2>
          </div>
          <p className="copy-lead max-w-[42ch] text-bone md:col-span-4">
            {copy.lead}
          </p>
        </div>

        <ol className="process-grid mt-16 grid grid-cols-1 border-t border-bone/30 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
          {settings.processSteps.map((step) => (
            <li
              key={step.number}
              className="flex min-h-[16rem] min-w-0 flex-col py-7 sm:min-h-[22rem] sm:px-6"
            >
              <span className="eyebrow text-bone">{step.number}</span>
              <h3 className="mt-8 min-w-0 font-serif text-[clamp(1.65rem,2.2vw,1.9rem)] font-light leading-[1.08] tracking-[-0.025em] [hyphens:auto] [overflow-wrap:anywhere]">
                {step.title}
              </h3>
              <p className="mt-auto pt-10 text-sm leading-6 text-bone/90">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
