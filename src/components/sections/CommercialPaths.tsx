import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getBusinessCopy } from "@/lib/business-content";
import { getLocale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale-shared";

export async function CommercialPaths() {
  const locale = await getLocale();
  const copy = getBusinessCopy(locale).paths;

  return (
    <section className="border-b border-rule bg-bone py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 className="section-title mt-7 max-w-[12ch] font-serif font-light text-balance">
              {copy.title}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="copy-lead max-w-[48ch] text-stone">{copy.lead}</p>
            <div className="mt-10 grid grid-cols-1 border-t border-rule sm:grid-cols-2">
              {copy.items.map((item, index) => (
                <Link
                  key={item.number}
                  href={localizedPath(locale, item.href)}
                  className={[
                    "group flex min-h-[19rem] flex-col border-b border-rule py-7 transition-colors duration-[var(--dur)] hover:bg-ivory sm:px-7",
                    index > 0 ? "sm:border-l sm:border-rule" : "",
                  ].join(" ")}
                >
                  <span className="eyebrow text-clay">{item.number}</span>
                  <h3 className="mt-8 max-w-[12ch] font-serif text-[clamp(2rem,3.5vw,3.4rem)] font-light leading-none tracking-[-0.035em]">
                    {item.title}
                  </h3>
                  <p className="mt-6 max-w-[38ch] text-sm leading-7 text-stone">
                    {item.description}
                  </p>
                  <span className="eyebrow mt-auto pt-10 text-ink">
                    {item.cta} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CommercialPaths;
