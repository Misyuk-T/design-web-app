import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getCommonCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/locale";
import { LinkButton } from "@/components/ui/LinkButton";
import { localizedPath } from "@/lib/locale-shared";

export default async function Contact() {
  const { locale, content } = await getLocalizedContent();
  const { settings } = content;
  const { email, location, social } = settings;
  const copy = getCommonCopy(locale).contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-space bg-bone"
    >
      <Container>
        <div className="border-t border-ink pt-5">
          <SectionLabel>{copy.label}</SectionLabel>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12 md:gap-10">
          <h2
            id="contact-heading"
            className="display-xl max-w-[10.5ch] font-serif font-light text-balance md:col-span-9"
          >
            {copy.title}
          </h2>
          <div className="md:col-span-3 md:pt-3">
            <p className="copy-lead text-stone">
              {copy.lead}
            </p>
            <p className="eyebrow mt-8 text-clay">{copy.booking}</p>
            <LinkButton
              href={localizedPath(locale, "/contact")}
              withArrow
              className="mt-8"
            >
              {copy.brief}
            </LinkButton>
          </div>
        </div>

        <a
          href={`mailto:${email}`}
          className="group mt-16 flex items-center justify-between gap-6 border-y border-rule py-7 md:mt-24 md:py-9"
        >
          <span className="min-w-0 [overflow-wrap:anywhere] font-serif text-[1.35rem] font-light leading-none tracking-[-0.035em] text-ink transition-colors duration-[var(--dur)] group-hover:text-clay sm:text-[clamp(1.8rem,5.4vw,5.25rem)]">
            {email}
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 text-2xl transition-transform duration-[var(--dur)] group-hover:translate-x-2 md:text-4xl"
          >
            &rarr;
          </span>
        </a>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-stone">{copy.studio}</p>
            <p className="mt-2 text-sm text-ink">{location}</p>
          </div>
          {social.length > 0 ? (
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-stone underline decoration-rule underline-offset-4 transition-colors duration-[var(--dur)] hover:text-clay"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export { Contact };
