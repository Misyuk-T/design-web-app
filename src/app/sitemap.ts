import type { MetadataRoute } from "next";
import {
  SITE_URL,
  getProjectProof,
} from "@/lib/business-content";
import { getProjects } from "@/lib/content";
import type { Locale } from "@/lib/locale-shared";

const locales: Locale[] = ["uk", "en"];
const staticPaths = [
  "",
  "/studio",
  "/services",
  "/services/architecture",
  "/services/interiors",
  "/services/visualization",
  "/services/drafting",
  "/services/printing",
  "/projects",
  "/contact",
  "/privacy",
] as const;

function localizedUrl(locale: Locale, path: string) {
  return `${SITE_URL}/${locale}${path}`;
}

function languageAlternates(path: string) {
  return {
    languages: {
      uk: localizedUrl("uk", path),
      en: localizedUrl("en", path),
      "x-default": localizedUrl("uk", path),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const verifiedProjectPaths = projects
    .filter((project) => getProjectProof("en", project.slug).verified)
    .map((project) => `/projects/${project.slug}`);
  const paths = [...staticPaths, ...verifiedProjectPaths];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified: new Date(),
      changeFrequency:
        path === "" ? ("weekly" as const) : ("monthly" as const),
      priority:
        path === ""
          ? 1
          : path === "/projects" || path === "/services"
            ? 0.9
            : path === "/privacy"
              ? 0.2
              : 0.7,
      alternates: languageAlternates(path),
    })),
  );
}
