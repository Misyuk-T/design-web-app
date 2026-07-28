import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  getBusinessCopy,
  localizedAlternates,
} from "@/lib/business-content";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getBusinessCopy(locale).privacyPage;
  return {
    title: copy.metadataTitle,
    description: copy.intro,
    alternates: localizedAlternates("/privacy", locale),
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const copy = getBusinessCopy(locale).privacyPage;

  return (
    <div className="section-space">
      <Container>
        <SectionLabel>{copy.metadataTitle}</SectionLabel>
        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h1 className="display-xl max-w-[12ch] font-serif font-light text-balance">
              {copy.title}
            </h1>
            <p className="copy-lead mt-8 max-w-[48ch] text-stone">
              {copy.intro}
            </p>
          </div>
          <div className="md:col-span-5">
            {copy.sections.map((section) => (
              <section
                key={section.title}
                className="border-t border-rule py-7 last:border-b"
              >
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] font-light">
                  {section.title}
                </h2>
                <p className="mt-4 max-w-[52ch] text-[0.975rem] leading-7 text-stone">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
