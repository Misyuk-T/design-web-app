import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  getBusinessCopy,
  localizedAlternates,
} from "@/lib/business-content";
import { getLocale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale-shared";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getBusinessCopy(locale).studioPage;
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: localizedAlternates("/studio", locale),
  };
}

export default async function StudioPage() {
  const locale = await getLocale();
  const copy = getBusinessCopy(locale);

  return (
    <div>
      <header className="section-space border-b border-rule">
        <Container>
          <SectionLabel>{copy.studioPage.metadataTitle}</SectionLabel>
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12">
            <h1 className="display-xl max-w-[12ch] font-serif font-light text-balance md:col-span-9">
              {copy.studioPage.title}
            </h1>
            <p className="copy-lead max-w-[42ch] text-stone md:col-span-3 md:self-end">
              {copy.studioPage.lead}
            </p>
          </div>
        </Container>
      </header>

      <section className="section-space">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <Placeholder
              src="/images/studio.jpg"
              alt=""
              aspect="5/4"
              sizes="(max-width: 767px) 100vw, 58vw"
              className="md:col-span-7"
            />
            <div className="md:col-span-4 md:col-start-9 md:self-end">
              <SectionLabel>{copy.market.label}</SectionLabel>
              <h2 className="mt-7 font-serif text-[clamp(2.25rem,4vw,4rem)] font-light leading-none tracking-[-0.035em]">
                {copy.market.title}
              </h2>
              <p className="mt-7 text-[0.975rem] leading-7 text-stone">
                {copy.market.body}
              </p>
              <p className="mt-6 border-l border-clay pl-5 text-sm leading-6 text-clay">
                {copy.market.note}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space bg-ink text-bone">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionLabel inverse>{copy.team.label}</SectionLabel>
              <h2 className="section-title mt-7 max-w-[12ch] font-serif font-light text-balance">
                {copy.team.title}
              </h2>
              <p className="mt-7 max-w-[48ch] text-[0.975rem] leading-7 text-bone/70">
                {copy.team.lead}
              </p>
            </div>
            <ol className="border-t border-bone/20 md:col-span-6 md:col-start-7">
              {copy.team.roles.map((role, index) => (
                <li
                  key={role.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-5 border-b border-bone/20 py-8"
                >
                  <span className="eyebrow pt-2 text-clay">0{index + 1}</span>
                  <div>
                    <h3 className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] font-light leading-tight">
                      {role.title}
                    </h3>
                    <p className="mt-4 max-w-[45ch] text-sm leading-7 text-bone/70">
                      {role.focus}
                    </p>
                    <p className="eyebrow mt-6 text-clay">
                      {copy.team.pending}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="section-space bg-ivory">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionLabel>{copy.proof.label}</SectionLabel>
              <h2 className="section-title mt-7 max-w-[11ch] font-serif font-light">
                {copy.proof.title}
              </h2>
              <p className="mt-7 max-w-[45ch] text-[0.975rem] leading-7 text-stone">
                {copy.proof.lead}
              </p>
            </div>
            <ol className="border-t border-rule md:col-span-6 md:col-start-7">
              {copy.proof.items.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] border-b border-rule py-6"
                >
                  <span className="eyebrow text-clay">0{index + 1}</span>
                  <p className="text-[0.975rem] leading-7 text-ink">{item}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-16 border-t border-rule pt-8 md:mt-24">
            <Link
              href={localizedPath(locale, "/contact")}
              className="inline-flex items-center gap-4 font-serif text-[clamp(2rem,4vw,4rem)] font-light hover:text-clay"
            >
              {copy.services.discuss} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
