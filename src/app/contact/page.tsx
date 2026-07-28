import type { Metadata } from "next";
import { BriefForm } from "@/components/forms/BriefForm";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  getBusinessCopy,
  localizedAlternates,
} from "@/lib/business-content";
import { getLocalizedContent } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getLocalizedContent();
  const copy = getBusinessCopy(locale).contactPage;
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: localizedAlternates("/contact", locale),
  };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; project?: string }>;
}) {
  const query = await searchParams;
  const { locale, content } = await getLocalizedContent();
  const copy = getBusinessCopy(locale).contactPage;
  const { email, location } = content.settings;

  return (
    <div className="section-space">
      <Container>
        <SectionLabel>{copy.label}</SectionLabel>
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12">
          <h1 className="display-xl max-w-[10ch] font-serif font-light text-balance md:col-span-8">
            {copy.title}
          </h1>
          <div className="md:col-span-4 md:self-end">
            <p className="copy-lead text-stone">{copy.lead}</p>
            <div className="mt-7 border-l border-clay pl-5">
              <p className="eyebrow text-stone">{location}</p>
              <a
                href={`mailto:${email}`}
                className="mt-3 block text-sm text-ink underline decoration-rule underline-offset-4 hover:text-clay"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 md:mt-24">
          <BriefForm
            locale={locale}
            recipient={email}
            initialService={query.service}
            initialBrief={
              query.project
                ? locale === "uk"
                  ? `Цікавить проєкт, подібний за задачею до «${query.project}».`
                  : `We are interested in a project with a brief similar to “${query.project}”.`
                : undefined
            }
          />
        </div>
      </Container>
    </div>
  );
}
