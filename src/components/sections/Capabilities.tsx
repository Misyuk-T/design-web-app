import type { Discipline } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Placeholder } from "@/components/ui/Placeholder";
import { LinkButton } from "@/components/ui/LinkButton";
import { getCommonCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/locale";
import { localizedPath } from "@/lib/locale-shared";
import Link from "next/link";

const TRADE_KEYS: Discipline[] = ["visualization", "printing", "drafting"];

export default async function Capabilities() {
  const { locale, content } = await getLocalizedContent();
  const { services, projects } = content;
  const copy = getCommonCopy(locale).capabilities;

  const plateFor = (key: Discipline): string =>
    projects.find((project) => project.discipline === key)?.coverImage ??
    projects.find((project) => project.disciplines?.includes(key))?.coverImage ??
    "/images/texture.jpg";

  const offerings = TRADE_KEYS.map((key) => services.find((s) => s.key === key))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .map((service, index) => ({
      service,
      index,
      plate: plateFor(service.key),
      note: copy.notes[service.key as keyof typeof copy.notes] ?? "",
    }));

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="section-space bg-ivory"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel number="05">{copy.label}</SectionLabel>
            <h2
              id="capabilities-heading"
              className="section-title mt-7 max-w-[13ch] font-serif font-light text-balance"
            >
              {copy.title}
            </h2>
          </div>
          <p className="copy-lead max-w-[43ch] text-stone md:col-span-4 md:col-start-9">
            {copy.lead}
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-14 md:mt-24 md:grid-cols-3 md:gap-6 lg:gap-8">
          {offerings.map(({ service, index, plate, note }) => (
            <li key={service.id}>
              <article className="group">
                <Placeholder
                  src={plate}
                  alt=""
                  aspect="4/3"
                  sizes="(max-width: 767px) 100vw, 33vw"
                  imgClassName="transition-transform duration-[900ms] ease-quiet group-hover:scale-[1.025]"
                />
                <div className="mt-5 border-t border-rule pt-5">
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="font-serif text-[clamp(1.75rem,2.5vw,2.5rem)] font-light leading-tight tracking-[-0.025em]">
                      <Link
                        href={localizedPath(
                          locale,
                          `/services/${service.key}`,
                        )}
                        className="hover:text-clay"
                      >
                        {service.title}
                      </Link>
                    </h3>
                    <span className="eyebrow pt-2 text-stone">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="eyebrow mt-5 text-clay">{note}</p>
                  <p className="mt-5 text-[0.95rem] leading-7 text-stone">
                    {service.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col gap-7 border-t border-rule pt-8 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[-0.02em]">
            {copy.question}
          </p>
          <LinkButton
            href={localizedPath(locale, "/contact")}
            withArrow
            className="shrink-0"
          >
            {copy.discuss}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
