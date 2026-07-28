import type { Metadata } from "next";
import { Fraunces, Inter, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCommonCopy } from "@/lib/i18n";
import { getLocale, getLocalizedContent } from "@/lib/locale";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_URL } from "@/lib/business-content";

/*
  Fraunces (English display serif), Noto Serif Display (Ukrainian display
  serif), and Inter (body sans) are self-hosted via next/font (NFR-B1).
  Fraunces and Noto Serif Display are loaded as variable fonts so the full
  display-weight range remains available; locale-aware selection happens in
  globals.css.

  NOTE (deviation from ux-spec §2.1): the spec listed both `weight: [...]` and
  `axes: ["opsz"]`. Next 16's font validator rejects that combination
  ("Axes can only be defined for variable fonts when the weight property is
  nonexistent or set to `variable`"). Loading them as variable fonts satisfies
  the intent — variable weight + opsz — while keeping the build green.
*/
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["cyrillic", "latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const SITE_NAME = "Studio Kova";
const META = {
  uk: {
    title: `${SITE_NAME} — Архітектура, інтер’єри та виготовлення`,
    description:
      "Мультидисциплінарна студія архітектури, інтер’єру, 3D-візуалізації, адитивного виробництва й технічної документації — одна лінія від концепції до втіленого об’єкта.",
    keywords: [
      "архітектурна студія",
      "дизайн інтер’єру",
      "3D-візуалізація",
      "3D-друк",
      "робочі креслення",
      "проєктна документація",
    ],
  },
  en: {
    title: `${SITE_NAME} — Architecture, Interiors & Fabrication`,
    description:
      "A multidisciplinary studio working across architecture, interiors, 3D visualization, additive fabrication, and technical documentation — one continuous line from concept to made object.",
    keywords: [
      "architecture studio",
      "interior design",
      "3D visualization",
      "3D printing",
      "technical drafting",
      "project documentation",
    ],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = META[locale];

  return {
    metadataBase: new URL("https://studiokova.com"),
    title: {
      default: meta.title,
      template: `%s — ${SITE_NAME}`,
    },
    description: meta.description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    keywords: [...meta.keywords],
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      locale: locale === "uk" ? "uk_UA" : "en_US",
      images: [
        {
          url: "/og-studio-kova.png",
          width: 1200,
          height: 630,
          alt:
            locale === "uk"
              ? "Studio Kova — від концепції до втілення"
              : "Studio Kova — from concept to completion",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-studio-kova.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, content } = await getLocalizedContent();
  const copy = getCommonCopy(locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#studio`,
    name: content.settings.studioName,
    url: `${SITE_URL}/${locale}`,
    description: META[locale].description,
    email: content.settings.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "uk" ? "Копенгаген" : "Copenhagen",
      addressCountry: "DK",
    },
    knowsAbout: [
      "Architecture",
      "Interior design",
      "3D visualization",
      "Project documentation",
      "3D printing",
    ],
    sameAs: content.settings.social.map((item) => item.url),
    availableLanguage: ["Ukrainian", "English"],
  };

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${notoSerifDisplay.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <StructuredData data={structuredData} />
        <a
          href="#main"
          className="sr-only rounded-frame focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:uppercase focus:tracking-[0.18em] focus:text-bone"
        >
          {copy.skip}
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
