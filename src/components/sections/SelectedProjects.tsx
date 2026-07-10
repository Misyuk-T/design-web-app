import Link from "next/link";
import type { Discipline } from "@/lib/types";
import { getContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Placeholder } from "@/components/ui/Placeholder";
import { LinkButton } from "@/components/ui/LinkButton";

/** Human-readable discipline tags for the small uppercase card labels. */
const DISCIPLINE_LABEL: Record<Discipline, string> = {
  architecture: "Architecture",
  interiors: "Interior Design",
  visualization: "3D Visualization",
  printing: "3D Printing",
  drafting: "Drafting",
};

/**
 * Section 03 — Selected Projects. The portfolio band and emotional center:
 * featured work rendered imagery-forward in a two-column editorial grid with
 * reserved 4/5 aspect frames (zero layout shift, NFR-P3). Each card links to
 * its detail route. Async server component — fetches its own content.
 */
export async function SelectedProjects() {
  const { projects } = await getContent();
  // getContent() already sorts (order asc, then year desc); keep only featured.
  const featured = projects.filter((project) => project.featured).slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section
      id="selected-projects"
      aria-labelledby="selected-projects-heading"
      className="border-t border-rule py-24 md:py-32"
    >
      <Container>
        {/* Band header — label + serif headline, with an "all projects" CTA. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel number="03">Selected Work</SectionLabel>
            <h2
              id="selected-projects-heading"
              className="mt-6 max-w-[18ch] font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.08] tracking-[-0.015em] text-ink"
            >
              A handful of places, each held end to end.
            </h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <LinkButton href="/projects" withArrow>
              All projects
            </LinkButton>
          </div>
        </div>

        {/* Imagery-forward grid. */}
        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2">
          {featured.map((project) => (
            <li key={project.id}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <Placeholder
                  src={project.coverImage}
                  alt={project.title}
                  aspect="4/5"
                  imgClassName="transition-transform duration-[var(--dur)] ease-quiet group-hover:scale-[1.03]"
                />
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-stone">
                  {DISCIPLINE_LABEL[project.discipline]}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] font-normal leading-tight">
                  <span className="text-ink underline decoration-transparent decoration-[1px] underline-offset-[6px] transition-[text-decoration-color] duration-[var(--dur)] ease-quiet group-hover:decoration-clay">
                    {project.title}
                  </span>
                </h3>
                <p className="mt-2 text-[0.9375rem] text-stone">
                  {project.year} — {project.location}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default SelectedProjects;
