import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkButton } from "@/components/ui/LinkButton";
import { ProjectImageDeck } from "@/components/projects/ProjectImageDeck";
import { disciplineLabels, getCommonCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/locale";
import { localizedPath } from "@/lib/locale-shared";
import { getBusinessCopy, getProjectProof } from "@/lib/business-content";

const CARD_LAYOUT = [
  {
    className: "md:col-span-7",
    aspect: "5/6",
    sizes: "(max-width: 767px) 100vw, 58vw",
  },
  {
    className: "md:col-span-4 md:col-start-9 md:mt-32",
    aspect: "4/5",
    sizes: "(max-width: 767px) 100vw, 33vw",
  },
  {
    className: "md:col-span-5 md:mt-8",
    aspect: "4/5",
    sizes: "(max-width: 767px) 100vw, 42vw",
  },
  {
    className: "md:col-span-6 md:col-start-7 md:mt-28",
    aspect: "5/6",
    sizes: "(max-width: 767px) 100vw, 50vw",
  },
  {
    className: "md:col-span-7 md:mt-8",
    aspect: "5/6",
    sizes: "(max-width: 767px) 100vw, 58vw",
  },
  {
    className: "md:col-span-4 md:col-start-9 md:mt-32",
    aspect: "1/1",
    sizes: "(max-width: 767px) 100vw, 33vw",
  },
] as const;

export async function SelectedProjects() {
  const { locale, content } = await getLocalizedContent();
  const { projects } = content;
  const featured = projects.filter((project) => project.featured).slice(0, 6);
  const copy = getCommonCopy(locale).selected;
  const businessCopy = getBusinessCopy(locale).project;

  if (featured.length === 0) return null;

  return (
    <section
      id="selected-projects"
      aria-labelledby="selected-projects-heading"
      className="section-space bg-ink text-bone"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 border-t border-bone/20 pt-5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel
              number="03"
              inverse
            >
              {copy.label}
            </SectionLabel>
            <h2
              id="selected-projects-heading"
              className="display-lg mt-8 max-w-[13ch] font-serif font-light text-balance"
            >
              {copy.title}
            </h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <LinkButton href={localizedPath(locale, "/projects")} withArrow inverse>
              {copy.all}
            </LinkButton>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
          {featured.map((project, index) => {
            const layout = CARD_LAYOUT[index];
            const images =
              project.images.length > 0
                ? project.images
                : [project.coverImage];
            return (
              <li key={project.id} className={layout.className}>
                <ProjectImageDeck
                  images={images}
                  title={project.title}
                  locale={locale}
                  mode="editorial"
                  sizes={layout.sizes}
                  aspectRatio={layout.aspect}
                />
                <Link
                  href={localizedPath(locale, `/projects/${project.slug}`)}
                  className="group mt-5 block"
                >
                  <div className="flex items-start justify-between gap-5 border-t border-bone/20 pt-4">
                    <div>
                      <p className="eyebrow text-bone/65">
                        {disciplineLabels[locale][project.discipline]}
                      </p>
                      {!getProjectProof(locale, project.slug).verified ? (
                        <p className="eyebrow mt-2 text-clay">
                          {businessCopy.mockLabel}
                        </p>
                      ) : null}
                      <h3 className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.85rem)] font-light leading-none tracking-[-0.025em] text-bone">
                        {project.title}
                      </h3>
                    </div>
                    <p className="eyebrow shrink-0 text-bone/65">
                      {project.year}
                    </p>
                  </div>
                  <p className="mt-4 max-w-[52ch] text-sm leading-6 text-bone/70">
                    {project.summary}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export default SelectedProjects;
