import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQ } from "@/components/sections/FAQ";
import {
  getBusinessCopy,
  getServiceOffer,
  localizedAlternates,
} from "@/lib/business-content";
import { getLocale, getLocalizedContent } from "@/lib/locale";
import { localizedPath } from "@/lib/locale-shared";
import type { Discipline } from "@/lib/types";

const PRIVATE_KEYS: Discipline[] = ["architecture", "interiors"];
const PARTNER_KEYS: Discipline[] = ["visualization", "drafting", "printing"];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getBusinessCopy(locale).servicesPage;
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: localizedAlternates("/services", locale),
  };
}

export default async function ServicesPage() {
  const { locale, content } = await getLocalizedContent();
  const copy = getBusinessCopy(locale);
  const serviceByKey = new Map(content.services.map((item) => [item.key, item]));

  return (
    <div>
      <header className="section-space border-b border-rule">
        <Container>
          <SectionLabel>{copy.services.label}</SectionLabel>
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12">
            <h1 className="display-xl max-w-[10ch] font-serif font-light text-balance md:col-span-8">
              {copy.services.title}
            </h1>
            <p className="copy-lead max-w-[42ch] text-stone md:col-span-4 md:self-end">
              {copy.services.lead}
            </p>
          </div>
        </Container>
      </header>

      <ServiceGroup
        id="private"
        title={copy.services.privateTitle}
        keys={PRIVATE_KEYS}
        locale={locale}
        serviceByKey={serviceByKey}
      />
      <ServiceGroup
        id="partners"
        title={copy.services.partnersTitle}
        keys={PARTNER_KEYS}
        locale={locale}
        serviceByKey={serviceByKey}
        dark
      />
      <FAQ {...copy.faq} />
    </div>
  );
}

function ServiceGroup({
  id,
  title,
  keys,
  locale,
  serviceByKey,
  dark = false,
}: {
  id: string;
  title: string;
  keys: readonly Discipline[];
  locale: "uk" | "en";
  serviceByKey: Map<Discipline, { key: Discipline; title: string; description: string }>;
  dark?: boolean;
}) {
  const copy = getBusinessCopy(locale).services;
  return (
    <section
      id={id}
      className={`section-space scroll-mt-24 ${
        dark ? "bg-ink text-bone" : "bg-bone"
      }`}
    >
      <Container>
        <h2 className="section-title max-w-[14ch] font-serif font-light text-balance">
          {title}
        </h2>
        <div
          className={`mt-14 grid grid-cols-1 border-t md:mt-20 ${
            dark ? "border-bone/20" : "border-rule"
          }`}
        >
          {keys.map((key, index) => {
            const service = serviceByKey.get(key);
            if (!service) return null;
            const offer = getServiceOffer(locale, key);
            return (
              <article
                key={key}
                className={`grid grid-cols-1 gap-7 border-b py-8 md:grid-cols-12 md:gap-10 md:py-11 ${
                  dark ? "border-bone/20" : "border-rule"
                }`}
              >
                <div className="md:col-span-1">
                  <span className="eyebrow text-clay">0{index + 1}</span>
                </div>
                <div className="md:col-span-4">
                  <p
                    className={`eyebrow ${
                      dark ? "text-bone/55" : "text-stone"
                    }`}
                  >
                    {offer.eyebrow}
                  </p>
                  <h3 className="mt-4 font-serif text-[clamp(2rem,3.5vw,3.6rem)] font-light leading-none">
                    {service.title}
                  </h3>
                </div>
                <div className="md:col-span-4 md:col-start-7">
                  <p
                    className={`text-[0.975rem] leading-7 ${
                      dark ? "text-bone/70" : "text-stone"
                    }`}
                  >
                    {offer.promise}
                  </p>
                </div>
                <div className="md:col-span-2 md:col-start-11 md:text-right">
                  <Link
                    href={localizedPath(locale, `/services/${key}`)}
                    className="eyebrow text-clay"
                  >
                    {copy.details} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <Link
          href={localizedPath(locale, "/contact")}
          className={`mt-12 inline-flex items-center gap-4 font-serif text-[clamp(1.8rem,3vw,3rem)] font-light ${
            dark ? "text-bone hover:text-clay" : "text-ink hover:text-clay"
          }`}
        >
          {copy.discuss} <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </section>
  );
}
