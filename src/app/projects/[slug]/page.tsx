import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Placeholder } from "@/components/ui/Placeholder";
import { disciplineLabels, getCommonCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/locale";
import {
  getBusinessCopy,
  getProjectProof,
  localizedAlternates,
  SITE_URL,
} from "@/lib/business-content";
import { localizedPath } from "@/lib/locale-shared";
import { StructuredData } from "@/components/seo/StructuredData";

type Params = { slug: string };

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
  const { locale, content } = await getLocalizedContent();
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const proof = getProjectProof(locale, slug);

  return {
    title: project.title,
    description: project.summary,
    alternates: localizedAlternates(`/projects/${slug}`, locale),
    robots: proof.verified
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.coverImage }],
    },
  };
}

function MetaItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="eyebrow text-stone">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-ink">{value}</dd>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const { locale, content } = await getLocalizedContent();
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const proof = getProjectProof(locale, slug);

  const { projects } = content;
  const copy = getCommonCopy(locale).project;
  const businessCopy = getBusinessCopy(locale).project;
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const paragraphs = project.body.split(/\n\n+/).filter(Boolean);
  const gallery = project.images.filter((src) => src !== project.coverImage);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}${localizedPath(locale, `/projects/${project.slug}`)}`,
    image: `${SITE_URL}${project.coverImage}`,
    dateCreated: String(project.year),
    about: disciplineLabels[locale][project.discipline],
    creator: {
      "@type": "Organization",
      name: "Studio Kova",
      url: `${SITE_URL}/${locale}`,
    },
    creativeWorkStatus: proof.status,
  };

  return (
    <article className="pb-24 md:pb-36">
      <StructuredData data={structuredData} />
      <header className="pb-12 pt-10 md:pb-16 md:pt-14">
        <Container>
          <Link
            href={localizedPath(locale, "/projects")}
            className="group inline-flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-stone transition-colors duration-[var(--dur)] hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-[var(--dur)] group-hover:-translate-x-1"
            >
              &larr;
            </span>
            {copy.archive}
          </Link>

          <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-12 md:items-end md:gap-10">
            <div className="md:col-span-8">
              <SectionLabel>
                {disciplineLabels[locale][project.discipline]}
              </SectionLabel>
              {!proof.verified ? (
                <p className="eyebrow mt-5 inline-flex border border-clay px-3 py-2 text-clay">
                  {businessCopy.mockLabel} / {proof.status}
                </p>
              ) : null}
              <h1 className="display-xl mt-7 max-w-[9ch] font-serif font-light text-balance">
                {project.title}
              </h1>
            </div>
            <p className="copy-lead max-w-[40ch] text-stone md:col-span-4 md:pb-2">
              {project.summary}
            </p>
          </div>
        </Container>
      </header>

      <div className="px-0 md:px-5 lg:px-8">
        <Placeholder
          src={project.coverImage}
          alt={project.title}
          aspect="16/9"
          priority
          sizes="100vw"
          className="rounded-none"
        />
      </div>

      <Container className="mt-10 md:mt-14">
        <dl className="grid grid-cols-2 gap-x-7 gap-y-8 border-y border-rule py-7 md:grid-cols-5 md:gap-x-8 md:py-9">
          <MetaItem label={copy.year} value={project.year} />
          <MetaItem label={copy.location} value={project.location} />
          <MetaItem
            label={copy.category}
            value={disciplineLabels[locale][project.discipline]}
          />
          <MetaItem label={copy.scope} value={project.role} />
          <MetaItem label={businessCopy.status} value={proof.status} />
        </dl>
        {!proof.verified ? (
          <p className="mt-5 max-w-[72ch] border-l border-clay pl-5 text-sm leading-6 text-clay">
            {proof.disclosure}
          </p>
        ) : null}
      </Container>

      <section className="mt-16 bg-ivory py-16 md:mt-24 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <SectionLabel>{businessCopy.status}</SectionLabel>
              <dl className="mt-8 space-y-6">
                <MetaItem label={businessCopy.client} value={proof.clientType} />
                <MetaItem label={businessCopy.stage} value={proof.stage} />
                <MetaItem label={businessCopy.scale} value={proof.scale} />
                <MetaItem
                  label={businessCopy.timeframe}
                  value={proof.timeframe}
                />
              </dl>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="border-t border-rule py-7">
                <p className="eyebrow text-clay">{businessCopy.challenge}</p>
                <p className="mt-4 font-serif text-[clamp(1.65rem,2.8vw,2.5rem)] font-light leading-tight">
                  {proof.challenge}
                </p>
              </div>
              <div className="border-t border-rule py-7">
                <p className="eyebrow text-clay">{businessCopy.outcome}</p>
                <p className="mt-4 font-serif text-[clamp(1.65rem,2.8vw,2.5rem)] font-light leading-tight">
                  {proof.outcome}
                </p>
              </div>
              <div className="border-y border-rule py-7">
                <p className="eyebrow text-clay">{businessCopy.credits}</p>
                <p className="mt-4 text-[0.975rem] leading-7 text-stone">
                  {proof.credits}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="mt-16 md:mt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="eyebrow text-clay md:col-span-2">{copy.story}</p>
          <div className="space-y-7 md:col-span-7 md:col-start-5">
            {paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={paragraph}
                className={
                  paragraphIndex === 0
                    ? "font-serif text-[clamp(1.65rem,3vw,2.65rem)] font-light leading-[1.25] tracking-[-0.02em] text-ink"
                    : "text-[clamp(1.05rem,1.4vw,1.2rem)] leading-8 text-stone"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>

      {gallery.length > 0 ? (
        <Container className="mt-16 md:mt-28">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-12 md:items-start">
            {gallery.map((src, galleryIndex) => (
              <Placeholder
                key={`${src}-${galleryIndex}`}
                src={src}
                alt=""
                aspect={galleryIndex % 2 === 0 ? "4/5" : "5/4"}
                sizes={
                  galleryIndex % 2 === 0
                    ? "(max-width: 767px) 100vw, 58vw"
                    : "(max-width: 767px) 100vw, 42vw"
                }
                className={
                  galleryIndex % 2 === 0
                    ? "md:col-span-7"
                    : "md:col-span-5 md:mt-32"
                }
              />
            ))}
          </div>
        </Container>
      ) : null}

      <Container className="mt-20 md:mt-32">
        <Link
          href={localizedPath(
            locale,
            `/contact?service=${encodeURIComponent(
              disciplineLabels[locale][project.discipline],
            )}&project=${encodeURIComponent(project.title)}`,
          )}
          className="mb-16 flex items-center justify-between gap-6 border-y border-rule py-8 font-serif text-[clamp(2rem,4.5vw,4.5rem)] font-light leading-none hover:text-clay md:mb-24 md:py-10"
        >
          {businessCopy.similar}
          <span aria-hidden="true">→</span>
        </Link>
        <nav
          aria-label={copy.more}
          className="grid grid-cols-1 border-y border-rule sm:grid-cols-2"
        >
          <Link
            href={localizedPath(locale, `/projects/${previous.slug}`)}
            className="group py-8 sm:border-r sm:border-rule sm:pr-8 md:py-10"
          >
            <span className="eyebrow text-stone">
              &larr; {copy.previous}
            </span>
            <span className="mt-3 block font-serif text-[clamp(1.65rem,3vw,2.75rem)] font-light tracking-[-0.025em] transition-colors duration-[var(--dur)] group-hover:text-clay">
              {previous.title}
            </span>
          </Link>
          <Link
            href={localizedPath(locale, `/projects/${next.slug}`)}
            className="group border-t border-rule py-8 sm:border-t-0 sm:pl-8 sm:text-right md:py-10"
          >
            <span className="eyebrow text-stone">
              {copy.next} &rarr;
            </span>
            <span className="mt-3 block font-serif text-[clamp(1.65rem,3vw,2.75rem)] font-light tracking-[-0.025em] transition-colors duration-[var(--dur)] group-hover:text-clay">
              {next.title}
            </span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
