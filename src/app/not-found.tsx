import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getLocale } from "@/lib/locale";

const COPY = {
  uk: {
    eyebrow: "404 / Сторінку не знайдено",
    title: "Цієї лінії не існує.",
    lead:
      "Можливо, сторінку перемістили або адреса була неточною. Поверніться до студії чи перегляньте вибрані роботи.",
    home: "На головну",
    projects: "До проєктів",
  },
  en: {
    eyebrow: "404 / Page not found",
    title: "This line does not exist.",
    lead:
      "The page may have moved or the address may be incomplete. Return to the studio or browse the selected work.",
    home: "Back home",
    projects: "View projects",
  },
} as const;

export default async function NotFound() {
  const locale = await getLocale();
  const copy = COPY[locale];

  return (
    <section className="section-space">
      <Container>
        <p className="eyebrow text-clay">{copy.eyebrow}</p>
        <h1 className="display-xl mt-8 max-w-[10ch] font-serif font-light text-balance">
          {copy.title}
        </h1>
        <p className="copy-lead mt-8 max-w-[42ch] text-stone">{copy.lead}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-bone"
          >
            {copy.home}
          </Link>
          <Link
            href="/projects"
            className="inline-flex min-h-12 items-center rounded-full border border-rule px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink"
          >
            {copy.projects}
          </Link>
        </div>
      </Container>
    </section>
  );
}
