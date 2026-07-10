import type { Metadata } from "next";
import Link from "next/link";
import type { Discipline } from "@/lib/types";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Placeholder } from "@/components/ui/Placeholder";

/** Human-readable discipline tags for the small uppercase card labels. */
const DISCIPLINE_LABEL: Record<Discipline, string> = {
  architecture: "Architecture",
  interiors: "Interior Design",
  visualization: "3D Visualization",
  printing: "3D Printing",
  drafting: "Drafting",
};

export const metadata: Metadata = {
  title: "Selected Projects",
  description:
    "A body of recent work across architecture, interiors, visualization, additive fabrication, and documentation — each project carried from first sketch to made object.",
};

/**
 * /projects — the full portfolio index. Lists every project (sorted order asc,
 * then year desc) in the same editorial two-column grid as the home band, with
 * reserved 4/5 aspect frames. Async server component; statically generated.
 */
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-24 md:py-32">
      <Container>
        {/* Page header. */}
        <header className="max-w-[46ch]">
          <SectionLabel>Work</SectionLabel>
          <h1 className="mt-6 font-serif text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
            Selected projects
          </h1>
          <p className="mt-6 text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-stone">
            One studio, five disciplines. A selection of work carried end to
            end — from the first line drawn by hand to the last fitting set on
            site.
          </p>
        </header>

        {/* Full portfolio grid. */}
        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2">
          {projects.map((project) => (
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
                <h2 className="mt-3 font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] font-normal leading-tight">
                  <span className="text-ink underline decoration-transparent decoration-[1px] underline-offset-[6px] transition-[text-decoration-color] duration-[var(--dur)] ease-quiet group-hover:decoration-clay">
                    {project.title}
                  </span>
                </h2>
                <p className="mt-2 text-[0.9375rem] text-stone">
                  {project.year} — {project.location}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
