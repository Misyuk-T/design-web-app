import Link from "next/link";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/ui/Container";
import { getCommonCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/locale";
import { localizedPath } from "@/lib/locale-shared";

const linkClass =
  "relative py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-stone transition-colors duration-[var(--dur)] ease-quiet after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-clay after:transition-transform after:duration-[var(--dur)] after:ease-quiet hover:text-ink hover:after:origin-left hover:after:scale-x-100";

export async function Header() {
  const { locale, content } = await getLocalizedContent();
  const copy = getCommonCopy(locale);
  const navigation = copy.header;
  const navLinks = [
    {
      label: navigation.studio,
      href: localizedPath(locale, "/studio"),
      number: "01",
    },
    {
      label: navigation.disciplines,
      href: localizedPath(locale, "/services"),
      number: "02",
    },
    {
      label: navigation.work,
      href: localizedPath(locale, "/projects"),
      number: "03",
    },
    {
      label: navigation.process,
      href: localizedPath(locale, "/#process"),
      number: "04",
    },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-bone/92 backdrop-blur-xl">
      <Container>
        <nav
          aria-label={navigation.primary}
          className="flex h-[4.5rem] items-center justify-between"
        >
          <Link
            href={localizedPath(locale)}
            className="font-serif text-[1.25rem] font-normal tracking-[-0.025em] text-ink"
          >
            Studio Kova
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-7 lg:gap-9">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={localizedPath(locale, "/contact")}
              className="group inline-flex items-center gap-3 border-l border-rule pl-8 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-clay transition-transform duration-[var(--dur)] group-hover:scale-150" />
              {navigation.start}
            </Link>
            <LanguageSwitch locale={locale} />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitch locale={locale} />
            <MobileMenu
              links={navLinks}
              menuLabel={navigation.menu}
              closeLabel={navigation.close}
              navigationLabel={navigation.navigation}
              mobileNavigationLabel={navigation.mobileNavigation}
              commissionsLabel={navigation.commissions}
              homeHref={localizedPath(locale)}
              email={content.settings.email}
            />
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
