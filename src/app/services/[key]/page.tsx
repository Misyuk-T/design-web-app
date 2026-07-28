import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  getBusinessCopy,
  getServiceOffer,
  localizedAlternates,
} from "@/lib/business-content";
import { getLocalizedContent } from "@/lib/locale";
import { localizedPath } from "@/lib/locale-shared";
import type { Discipline } from "@/lib/types";

const KEYS: Discipline[] = [
  "architecture",
  "interiors",
  "visualization",
  "drafting",
  "printing",
];

type Params = { key: string };

export function generateStaticParams() {
  return KEYS.map((key) => ({ key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { key } = await params;
  if (!KEYS.includes(key as Discipline)) notFound();
  const { locale, content } = await getLocalizedContent();
  const service = content.services.find((item) => item.key === key);
  if (!service) notFound();
  return {
    title: service.title,
    description: service.description,
    alternates: localizedAlternates(`/services/${key}`, locale),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { key } = await params;
  if (!KEYS.includes(key as Discipline)) notFound();
  const { locale, content } = await getLocalizedContent();
  const service = content.services.find((item) => item.key === key);
  if (!service) notFound();
  const offer = getServiceOffer(locale, service.key);
  const copy = getBusinessCopy(locale).services;
  const relevant = content.projects
    .filter(
      (project) =>
        project.discipline === service.key ||
        project.disciplines?.includes(service.key),
    )
    .slice(0, 2);

  return (
    <div>
      <header className="section-space border-b border-rule">
        <Container>
          <Link
            href={localizedPath(locale, "/services")}
            className="eyebrow text-stone hover:text-clay"
          >
            ← {copy.label}
          </Link>
          <div className="mt-9 grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <SectionLabel>{offer.eyebrow}</SectionLabel>
              <h1 className="display-xl mt-7 max-w-[12ch] font-serif font-light text-balance">
                {service.title}
              </h1>
            </div>
            <div className="md:col-span-4 md:self-end">
              <p className="copy-lead text-stone">{offer.promise}</p>
              <p className="mt-6 border-l border-clay pl-5 text-sm leading-6 text-ink">
                {offer.audience}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section className="section-space">
        <Container>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <SectionLabel>
                {locale === "uk" ? "Що входить" : "What is included"}
              </SectionLabel>
              <ol className="mt-8 border-t border-rule">
                {offer.deliverables.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[2.5rem_1fr] border-b border-rule py-5"
                  >
                    <span className="eyebrow text-clay">0{index + 1}</span>
                    <span className="text-[0.975rem] leading-7">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <SectionLabel>
                {locale === "uk" ? "Хороший match, якщо" : "A good fit when"}
              </SectionLabel>
              <ul className="mt-8 space-y-5">
                {offer.goodFit.map((item) => (
                  <li
                    key={item}
                    className="border-l border-clay pl-5 font-serif text-[clamp(1.5rem,2.5vw,2.3rem)] font-light leading-tight"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-12 border-t border-rule pt-7">
                <p className="eyebrow text-stone">
                  {locale === "uk" ? "Що надіслати" : "What to send"}
                </p>
                <p className="mt-4 text-[0.975rem] leading-7 text-stone">
                  {offer.startingPoint}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {relevant.length > 0 ? (
        <section className="section-space bg-ink text-bone">
          <Container>
            <SectionLabel inverse>
              {locale === "uk" ? "Пов’язані кейси" : "Related cases"}
            </SectionLabel>
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
              {relevant.map((project) => (
                <Link
                  key={project.id}
                  href={localizedPath(locale, `/projects/${project.slug}`)}
                  className="group"
                >
                  <Placeholder
                    src={project.coverImage}
                    alt={project.title}
                    aspect="4/3"
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                  <h2 className="mt-5 border-t border-bone/20 pt-4 font-serif text-[clamp(2rem,3vw,3rem)] font-light group-hover:text-clay">
                    {project.title}
                  </h2>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="section-space bg-clay text-bone">
        <Container>
          <p className="eyebrow text-bone/70">{copy.discuss}</p>
          <Link
            href={localizedPath(locale, "/contact")}
            className="mt-7 flex w-full items-center justify-between gap-5 font-serif text-[clamp(2.5rem,7vw,7rem)] font-light leading-none"
          >
            {service.title} <span aria-hidden="true">→</span>
          </Link>
        </Container>
      </section>
    </div>
  );
}
