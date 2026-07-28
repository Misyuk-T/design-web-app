import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getCommonCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { getContent } from "@/lib/content";
import { localizedPath } from "@/lib/locale-shared";

const footerLink =
  "text-sm text-bone/60 transition-colors duration-[var(--dur)] hover:text-bone";

export async function Footer() {
  const year = new Date().getFullYear();
  const [locale, content] = await Promise.all([getLocale(), getContent()]);
  const copy = getCommonCopy(locale);
  const { social, email } = content.settings;
  const navigation = [
    { label: copy.header.studio, href: localizedPath(locale, "/studio") },
    {
      label: copy.header.disciplines,
      href: localizedPath(locale, "/services"),
    },
    { label: copy.header.work, href: localizedPath(locale, "/projects") },
    { label: copy.header.process, href: localizedPath(locale, "/#process") },
    { label: copy.footer.contact, href: localizedPath(locale, "/contact") },
  ] as const;

  return (
    <footer className="bg-ink text-bone">
      <Container className="pb-8 pt-16 md:pb-10 md:pt-20">
        <div className="grid grid-cols-1 gap-12 border-b border-bone/15 pb-14 md:grid-cols-12 md:gap-x-4 md:gap-y-12 md:pb-20 lg:gap-x-12">
          <div className="md:col-span-5">
            <Link
              href={localizedPath(locale)}
              className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none tracking-[-0.04em]"
            >
              Studio Kova
            </Link>
            <p className="mt-6 max-w-[40ch] text-sm leading-7 text-bone/75">
              {copy.footer.description}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2 md:col-start-8">
            <h2 className="eyebrow text-bone/70">{copy.footer.navigate}</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 md:col-start-11">
            <h2 className="eyebrow text-bone/70">{copy.footer.elsewhere}</h2>
            <ul className="mt-5 space-y-3">
              {social.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-bone/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Studio Kova <span className="mx-2">/</span>{" "}
            {copy.footer.location}
          </p>
          <p>
            <a href={`mailto:${email}`} className="hover:text-bone">
              {email}
            </a>
            <span className="mx-2">/</span>
            <Link
              href={localizedPath(locale, "/privacy")}
              className="hover:text-bone"
            >
              {copy.footer.privacy}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
