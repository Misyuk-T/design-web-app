import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Placeholder } from "@/components/ui/Placeholder";
import { disciplineLabels, getCommonCopy } from "@/lib/i18n";
import { getLocale, getLocalizedContent } from "@/lib/locale";
import {
  getBusinessCopy,
  getProjectProof,
  localizedAlternates,
} from "@/lib/business-content";
import { localizedPath } from "@/lib/locale-shared";

const INDEX_LAYOUT = [
  { className: "md:col-span-7", aspect: "5/6" },
  { className: "md:col-span-4 md:col-start-9 md:mt-32", aspect: "4/5" },
  { className: "md:col-span-5 md:mt-8", aspect: "4/5" },
  { className: "md:col-span-6 md:col-start-7 md:mt-28", aspect: "5/6" },
  { className: "md:col-span-7 md:mt-8", aspect: "5/6" },
  { className: "md:col-span-4 md:col-start-9 md:mt-32", aspect: "1/1" },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getCommonCopy(locale).projects;
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: localizedAlternates("/projects", locale),
  };
}

export default async function ProjectsPage() {
  const { locale, content } = await getLocalizedContent();
  const { projects } = content;
  const copy = getCommonCopy(locale).projects;
  const businessCopy = getBusinessCopy(locale).project;
  const years = projects.map((project) => project.year);

  return (
    <div>
      <header className="section-space border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end md:gap-10">
            <div className="md:col-span-9">
              <SectionLabel>{copy.archive}</SectionLabel>
              <h1 className="display-xl mt-8 max-w-[10ch] font-serif font-light text-balance">
                {copy.title}
              </h1>
            </div>
            <div className="md:col-span-3 md:pb-2">
              <p className="copy-lead text-stone">
                {copy.lead}
              </p>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 border-y border-rule sm:grid-cols-4 md:mt-24">
            <div className="py-5 sm:border-r sm:border-rule sm:px-6 sm:first:pl-0">
              <dt className="eyebrow text-stone">{copy.projects}</dt>
              <dd className="mt-2 font-serif text-2xl">{projects.length}</dd>
            </div>
            <div className="border-l border-rule py-5 pl-6 sm:border-l-0 sm:border-r sm:px-6">
              <dt className="eyebrow text-stone">{copy.years}</dt>
              <dd className="mt-2 font-serif text-2xl">
                {Math.min(...years)}—{Math.max(...years)}
              </dd>
            </div>
            <div className="border-t border-rule py-5 sm:border-r sm:border-t-0 sm:px-6">
              <dt className="eyebrow text-stone">{copy.disciplines}</dt>
              <dd className="mt-2 font-serif text-2xl">{copy.five}</dd>
            </div>
            <div className="border-l border-t border-rule py-5 pl-6 sm:border-l-0 sm:border-t-0 sm:pl-6">
              <dt className="eyebrow text-stone">{copy.base}</dt>
              <dd className="mt-2 font-serif text-2xl">{copy.copenhagen}</dd>
            </div>
          </dl>
        </Container>
      </header>

      <section aria-label={copy.all} className="section-space">
        <Container>
          <ul className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
            {projects.map((project, index) => {
              const layout = INDEX_LAYOUT[index % INDEX_LAYOUT.length];
              const size =
                layout.className.includes("col-span-7")
                  ? "(max-width: 767px) 100vw, 58vw"
                  : "(max-width: 767px) 100vw, 42vw";

              return (
                <li key={project.id} className={layout.className}>
                  <Link
                    href={localizedPath(locale, `/projects/${project.slug}`)}
                    className="group block"
                  >
                    <Placeholder
                      src={project.coverImage}
                      alt={project.title}
                      aspect={layout.aspect}
                      sizes={size}
                      imgClassName="transition-transform duration-[900ms] ease-quiet group-hover:scale-[1.025]"
                    />
                    <div className="mt-5 flex items-start justify-between gap-5 border-t border-rule pt-4">
                      <div>
                        <p className="eyebrow text-stone">
                          {disciplineLabels[locale][project.discipline]}
                        </p>
                        {!getProjectProof(locale, project.slug).verified ? (
                          <p className="eyebrow mt-2 text-clay">
                            {businessCopy.mockLabel}
                          </p>
                        ) : null}
                        <h2 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.85rem)] font-light leading-none tracking-[-0.03em] transition-colors duration-[var(--dur)] group-hover:text-clay">
                          {project.title}
                        </h2>
                      </div>
                      <p className="eyebrow shrink-0 text-stone">
                        {project.year}
                      </p>
                    </div>
                    <p className="mt-4 max-w-[52ch] text-sm leading-6 text-stone">
                      {project.summary}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </div>
  );
}
