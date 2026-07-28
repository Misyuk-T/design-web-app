"use client";

import { usePathname } from "next/navigation";
import {
  LANGUAGE_COOKIE,
  localizedPath,
  stripLocalePrefix,
  type Locale,
} from "@/lib/locale-shared";

type LanguageSwitchProps = {
  locale: Locale;
  inverse?: boolean;
};

export function LanguageSwitch({
  locale,
  inverse = false,
}: LanguageSwitchProps) {
  const pathname = usePathname();
  const target: Locale = locale === "uk" ? "en" : "uk";
  const switchLabel =
    locale === "uk" ? "Перемкнути на англійську" : "Switch to Ukrainian";

  function changeLanguage() {
    document.cookie = `${LANGUAGE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = target;
    const destination = localizedPath(
      target,
      stripLocalePrefix(pathname).pathname,
    );

    window.location.assign(destination);
  }

  return (
    <button
      type="button"
      onClick={changeLanguage}
      className={[
        "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-[0.625rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-[var(--dur)]",
        inverse
          ? "border-bone/30 text-bone hover:border-bone/70"
          : "border-rule text-ink hover:border-clay",
      ].join(" ")}
      aria-label={switchLabel}
    >
      <span aria-hidden="true" className="text-sm leading-none">
        {target === "en" ? "🇬🇧" : "🇺🇦"}
      </span>
      <span>{target === "en" ? "EN" : "UA"}</span>
    </button>
  );
}
