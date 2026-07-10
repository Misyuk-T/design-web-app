import Link from "next/link";

const STUDIO_NAME = "Studio Kova";
const EMAIL = "studio@studiokova.com";
const LOCATION = "Copenhagen, DK";

const NAVIGATE: { label: string; href: string }[] = [
  { label: "Studio", href: "/#studio" },
  { label: "Disciplines", href: "/#disciplines" },
  { label: "Work", href: "/projects" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

const DISCIPLINES: string[] = [
  "Architecture",
  "Interiors",
  "Visualization",
  "Fabrication",
  "Drafting",
];

const SOCIAL: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://instagram.com/studiokova" },
  { label: "Pinterest", href: "https://pinterest.com/studiokova" },
  { label: "LinkedIn", href: "https://linkedin.com/company/studiokova" },
];

const headingClass =
  "text-xs font-medium uppercase tracking-[0.18em] text-stone";
const itemClass =
  "text-sm text-stone underline decoration-oat decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-[var(--dur)] ease-quiet hover:decoration-clay";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-bone">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Wordmark + contact */}
          <div className="md:col-span-5">
            <p className="font-serif text-2xl font-normal tracking-[-0.01em] text-ink">
              {STUDIO_NAME}
            </p>
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-stone">
              A multidisciplinary studio drawing one continuous line from
              concept to made object — architecture, interiors, visualization,
              fabrication, and documentation.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-6 inline-block font-serif text-lg text-ink underline decoration-oat decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-[var(--dur)] ease-quiet hover:decoration-clay"
            >
              {EMAIL}
            </a>
          </div>

          {/* Navigate */}
          <nav
            aria-label="Footer"
            className="md:col-span-3 md:col-start-7"
          >
            <h2 className={headingClass}>Navigate</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {NAVIGATE.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={itemClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div className="md:col-span-3">
            <h2 className={headingClass}>Connect</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {SOCIAL.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={itemClass}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-stone">{LOCATION}</p>
          </div>
        </div>

        {/* Fine print */}
        <div className="mt-16 flex flex-col gap-4 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-stone">
            &copy; {year} {STUDIO_NAME}
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase tracking-[0.18em] text-stone">
            {DISCIPLINES.map((discipline, index) => (
              <li key={discipline} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-oat">
                    /
                  </span>
                ) : null}
                {discipline}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
