"use client";

import { usePathname } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/locale-shared";

type Variant = "main" | "v1" | "v2";

type VariantSwitchProps = {
  locale: Locale;
  inverse?: boolean;
};

const VARIANT_PATHS: Record<Variant, string> = {
  main: "",
  v1: "/v1",
  v2: "/v2",
};

function getCurrentVariant(pathname: string): Variant {
  if (pathname === "/v1" || pathname.endsWith("/v1")) return "v1";
  if (pathname === "/v2" || pathname.endsWith("/v2")) return "v2";
  return "main";
}

export function VariantSwitch({
  locale,
  inverse = false,
}: VariantSwitchProps) {
  const pathname = usePathname();
  const currentVariant = getCurrentVariant(pathname);
  const label =
    locale === "uk" ? "Перемкнути дизайн сайту" : "Switch website design";

  function changeVariant(variant: Variant) {
    if (variant === currentVariant) return;

    const destination =
      variant === "main"
        ? localizedPath(locale)
        : localizedPath(locale, VARIANT_PATHS[variant]);

    window.location.assign(destination);
  }

  return (
    <label className="relative inline-flex min-w-0 items-center">
      <span className="sr-only">{label}</span>
      <select
        value={currentVariant}
        onChange={(event) => changeVariant(event.target.value as Variant)}
        aria-label={label}
        className={[
          "h-11 w-[5.75rem] cursor-pointer appearance-none rounded-full border bg-transparent py-0 pl-3 pr-7 text-[0.625rem] font-semibold uppercase tracking-[0.14em] outline-none transition-colors duration-[var(--dur)] focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2",
          inverse
            ? "border-bone/30 text-bone hover:border-bone/70 focus-visible:ring-offset-ink"
            : "border-rule text-ink hover:border-clay focus-visible:ring-offset-bone",
        ].join(" ")}
      >
        <option value="main" className="bg-bone text-ink">
          00 / Main
        </option>
        <option value="v1" className="bg-bone text-ink">
          01 / V1
        </option>
        <option value="v2" className="bg-bone text-ink">
          02 / V2
        </option>
      </select>
      <svg
        viewBox="0 0 10 6"
        aria-hidden="true"
        className="pointer-events-none absolute right-3 h-1.5 w-2.5"
      >
        <path
          d="M1 1 5 5 9 1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
    </label>
  );
}
