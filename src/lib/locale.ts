import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { getContent } from "@/lib/content";
import { localizeContent } from "@/lib/i18n";
import { LANGUAGE_COOKIE, type Locale } from "@/lib/locale-shared";

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return value === "en" ? "en" : "uk";
});

export const getLocalizedContent = cache(async () => {
  const [locale, content] = await Promise.all([getLocale(), getContent()]);
  return {
    locale,
    content: localizeContent(content, locale),
  };
});
