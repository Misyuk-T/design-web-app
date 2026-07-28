import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { getCommonCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/locale";
import { localizedPath } from "@/lib/locale-shared";

export default async function Hero() {
  const { locale, content } = await getLocalizedContent();
  const { studioName, tagline, heroStatement, heroSub, location } =
    content.settings;
  const copy = getCommonCopy(locale).hero;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-ink text-bone"
    >
      <div className="absolute inset-0 -z-20">
        <Placeholder
          src="/images/hero.jpg"
          aspect="16/10"
          priority
          sizes="100vw"
          className="h-full rounded-none"
          imgClassName="scale-[1.01] object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(24,22,19,0.30)_0%,rgba(24,22,19,0.18)_32%,rgba(24,22,19,0.84)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 w-full bg-[linear-gradient(90deg,rgba(24,22,19,0.45)_0%,transparent_58%)] md:w-3/4"
      />

      <Container className="flex min-h-[calc(100svh-4.5rem)] flex-col pb-7 pt-8 md:pb-10 md:pt-10">
        <div className="hero-reveal flex items-start justify-between border-t border-bone/35 pt-4">
          <p className="eyebrow text-bone">{studioName}</p>
          <div className="hidden items-center gap-10 text-right sm:flex">
            <div>
              <p className="eyebrow text-bone/80">{copy.based}</p>
              <p className="mt-1 text-sm text-bone">{location}</p>
            </div>
            <div>
              <p className="eyebrow text-bone/80">{copy.takingOn}</p>
              <p className="mt-1 text-sm text-bone">{copy.commissions}</p>
            </div>
          </div>
        </div>

        <div className="hero-reveal-delayed mt-auto grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <h1
            id="hero-heading"
            className="display-xl max-w-[11.5ch] font-serif font-light text-balance md:col-span-8 lg:col-span-9"
          >
            {heroStatement}
          </h1>

          <div className="border-t border-bone/35 pt-5 md:col-span-4 md:mb-1 lg:col-span-3">
            <p className="font-serif text-[1.35rem] font-light leading-snug text-bone">
              {tagline}
            </p>
            <p className="mt-4 text-sm leading-6 text-bone/85">{heroSub}</p>
            <Link
              href={localizedPath(locale, "/projects")}
              className="group mt-7 inline-flex items-center gap-4 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-bone"
            >
              {copy.explore}
              <span
                aria-hidden="true"
                className="transition-transform duration-[var(--dur)] group-hover:translate-x-1.5"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between md:mt-12">
          <p className="eyebrow text-bone/75 sm:hidden">{location}</p>
          <span
            aria-hidden="true"
            className="ml-auto flex items-center gap-3 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-bone/75"
          >
            {copy.scroll}
            <span className="h-px w-10 bg-bone/45" />
          </span>
        </div>
      </Container>
    </section>
  );
}
