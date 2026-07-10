import Link from "next/link";

const STUDIO_NAME = "Studio Kova";

/**
 * Primary navigation. In-page links use the "/#anchor" form so they resolve
 * from any route (they route home, then scroll). "Work" points at the /projects
 * route (where the portfolio index and detail pages live). No <h1> here — the
 * Hero owns the page's single <h1>; the wordmark is a link home.
 */
const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Studio", href: "/#studio" },
  { label: "Disciplines", href: "/#disciplines" },
  { label: "Work", href: "/projects" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

const linkClass =
  "text-xs font-medium uppercase tracking-[0.18em] text-stone transition-colors duration-[var(--dur)] ease-quiet hover:text-ink";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bone/85 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 md:px-10 lg:px-16"
      >
        <Link
          href="/"
          className="font-serif text-lg font-normal tracking-[-0.01em] text-ink"
        >
          {STUDIO_NAME}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile nav — no-JS disclosure keeps this a server component */}
        <details className="group relative md:hidden">
          <summary
            className="flex cursor-pointer list-none items-center text-xs font-medium uppercase tracking-[0.18em] text-ink [&::-webkit-details-marker]:hidden"
            aria-label="Toggle navigation menu"
          >
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>
          <ul className="absolute right-0 top-full mt-4 flex w-52 flex-col gap-1 rounded-frame border border-rule bg-ivory p-2 shadow-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-frame px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-stone transition-colors duration-[var(--dur)] ease-quiet hover:bg-bone hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}

export default Header;
