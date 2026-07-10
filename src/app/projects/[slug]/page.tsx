import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Discipline } from "@/lib/types";
import { getProjects, getProjectBySlug } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Placeholder } from "@/components/ui/Placeholder";
import { Hairline } from "@/components/ui/Hairline";

/** Human-readable discipline tags. */
const DISCIPLINE_LABEL: Record<Discipline, string> = {
  architecture: "Architecture",
  interiors: "Interior Design",
  visualization: "3D Visualization",
  printing: "3D Printing",
  drafting: "Drafting",
};

type Params = { slug: string };

/** Prerender every project detail page at build time (SSG). */
export async function generateStaticParams(): Promise<Params[]> {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.coverImage }],
    },
  };
}

/** One meta cell — small uppercase label over a plain-text value. */
function MetaItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
        {label}
      </dt>
      <dd className="mt-2 text-[0.95rem] text-ink">{value}</dd>
    </div>
  );
}

/**
 * /projects/[slug] — project detail. Full-bleed hero image, a hairline meta
 * grid (year / location / category / role), the long narrative in a comfortable
 * reading measure, and prev/next navigation across the sorted portfolio.
 * Async server component; statically generated via generateStaticParams.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === project.slug);
  // Wrap around so a project always has a neighbour on each side.
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const paragraphs = project.body.split(/\n\n+/).filter(Boolean);
  const gallery = project.images.filter((src) => src !== project.coverImage);

  const linkClass =
    "text-ink underline decoration-transparent decoration-[1px] underline-offset-[6px] transition-[text-decoration-color] duration-[var(--dur)] ease-quiet hover:decoration-clay";

  return (
    <article className="pb-24 md:pb-32">
      {/* Back to index. */}
      <Container className="pt-10 md:pt-14">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-stone transition-colors duration-[var(--dur)] ease-quiet hover:text-ink"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-[var(--dur)] ease-quiet group-hover:-translate-x-1"
          >
            &larr;
          </span>
          Selected Work
        </Link>
      </Container>

      {/* Title block. */}
      <Container className="mt-8 md:mt-10">
        <SectionLabel>{DISCIPLINE_LABEL[project.discipline]}</SectionLabel>
        <h1 className="mt-5 max-w-[18ch] font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1.03] tracking-[-0.02em] text-ink">
          {project.title}
        </h1>
        <p className="mt-6 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-stone">
          {project.summary}
        </p>
      </Container>

      {/* Full-bleed hero. */}
      <div className="mt-10 w-full md:mt-14">
        <Placeholder
          src={project.coverImage}
          alt={project.title}
          aspect="3/2"
          priority
          className="rounded-none"
        />
      </div>

      {/* Meta grid — hairline-topped, year / location / category / role. */}
      <Container className="mt-12 md:mt-16">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-rule pt-8 md:grid-cols-4">
          <MetaItem label="Year" value={project.year} />
          <MetaItem label="Location" value={project.location} />
          <MetaItem
            label="Category"
            value={DISCIPLINE_LABEL[project.discipline]}
          />
          <MetaItem label="Role" value={project.role} />
        </dl>
      </Container>

      {/* Narrative. */}
      <Container width="narrow" className="mt-16 md:mt-24">
        <div className="space-y-6">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-ink"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>

      {/* Secondary imagery. */}
      {gallery.length > 0 ? (
        <Container className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {gallery.map((src, i) => (
              <Placeholder
                key={`${src}-${i}`}
                src={src}
                alt=""
                aspect="4/3"
              />
            ))}
          </div>
        </Container>
      ) : null}

      {/* Prev / next. */}
      <Container className="mt-20 md:mt-28">
        <Hairline />
        <nav
          aria-label="More projects"
          className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between"
        >
          <Link href={`/projects/${previous.slug}`} className="group block">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
              Previous
            </span>
            <span className="mt-2 block font-serif text-[clamp(1.25rem,2vw,1.75rem)] font-normal leading-tight">
              <span className={linkClass}>{previous.title}</span>
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group block sm:text-right"
          >
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
              Next
            </span>
            <span className="mt-2 block font-serif text-[clamp(1.25rem,2vw,1.75rem)] font-normal leading-tight">
              <span className={linkClass}>{next.title}</span>
            </span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
