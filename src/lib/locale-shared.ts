export type Locale = "uk" | "en";
export const LANGUAGE_COOKIE = "studio-kova-language";

export function localizedPath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function stripLocalePrefix(pathname: string) {
  const match = pathname.match(/^\/(uk|en)(?=\/|$)/);
  if (!match) return { locale: null, pathname };

  const locale = match[1] as Locale;
  const stripped = pathname.slice(match[0].length) || "/";
  return { locale, pathname: stripped };
}
