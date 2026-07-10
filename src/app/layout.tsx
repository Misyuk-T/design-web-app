import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/*
  Fraunces (display serif) + Inter (body sans), self-hosted via next/font
  (NFR-B1). Loaded as variable fonts so the opsz optical-size axis is available
  and the full 100–900 weight range is present; the light 300–400 display
  weights are applied through CSS (globals.css / utilities), not baked here.

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "Studio Kova";
const SITE_DESCRIPTION =
  "A multidisciplinary studio working across architecture, interiors, 3D visualization, additive fabrication, and technical documentation — one continuous line from concept to made object.";

export const metadata: Metadata = {
  metadataBase: new URL("https://studiokova.com"),
  title: {
    default: `${SITE_NAME} — Architecture, Interiors & Fabrication`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "architecture studio",
    "interior design",
    "3D visualization",
    "3D printing",
    "technical drafting",
    "project documentation",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Architecture, Interiors & Fabrication`,
    description: SITE_DESCRIPTION,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Architecture, Interiors & Fabrication`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only rounded-frame focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:uppercase focus:tracking-[0.18em] focus:text-bone"
        >
          Skip to content
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
