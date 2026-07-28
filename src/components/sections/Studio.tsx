import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Placeholder } from "@/components/ui/Placeholder";
import { getCommonCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/locale";

function splitStatement(statement: string) {
  const firstStop = statement.indexOf(". ");
  if (firstStop === -1) return { lead: statement, body: "" };
  return {
    lead: statement.slice(0, firstStop + 1),
    body: statement.slice(firstStop + 2),
  };
}

export default async function Studio() {
  const { locale, content } = await getLocalizedContent();
  const { settings } = content;
  const { tagline, aboutStatement, stats } = settings;
  const { lead, body } = splitStatement(aboutStatement);
  const copy = getCommonCopy(locale).studio;

  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="section-space scroll-mt-24"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <SectionLabel number="01">{copy.label}</SectionLabel>
          </div>
          <h2
            id="studio-heading"
            className="display-lg max-w-[18ch] font-serif font-light text-balance md:col-span-9"
          >
            {copy.title}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-y-12 md:mt-20 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <Placeholder
              src="/images/studio.jpg"
              alt={copy.alt}
              aspect="5/4"
              sizes="(max-width: 767px) 100vw, 58vw"
              className="h-full min-h-[24rem]"
              imgClassName="object-center"
            />
          </div>

          <div className="flex flex-col md:col-span-4 md:col-start-9">
            <p className="copy-lead font-serif font-light text-ink">{lead}</p>
            {body ? (
              <p className="mt-6 text-[0.975rem] leading-7 text-stone">{body}</p>
            ) : null}

            <div className="mt-16 border-l border-clay pl-6 md:mt-20">
              <p className="eyebrow text-clay">{copy.throughline}</p>
              <p className="mt-3 font-serif text-[1.55rem] font-light leading-snug text-ink">
                {tagline}
              </p>
            </div>
          </div>
        </div>

        {stats.length > 0 ? (
          <dl className="mt-14 grid grid-cols-1 border-y border-rule sm:grid-cols-3 md:mt-20">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={[
                  "flex items-end justify-between gap-6 py-7 sm:flex-col sm:items-start sm:gap-0 sm:px-7 sm:py-9 md:px-10",
                  index > 0
                    ? "border-t border-rule sm:border-l sm:border-t-0"
                    : "",
                ].join(" ")}
              >
                <dt className="eyebrow order-2 max-w-[15ch] text-right text-stone sm:mt-3 sm:text-left">
                  {stat.label}
                </dt>
                <dd className="order-1 font-serif text-[clamp(2.75rem,5vw,4.5rem)] font-light leading-none tracking-[-0.04em] text-ink">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </section>
  );
}

export { Studio };
