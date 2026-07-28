import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LANGUAGE_COOKIE,
  stripLocalePrefix,
  type Locale,
} from "@/lib/locale-shared";

const CONCEPT_ROUTES = ["/v1", "/v2"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localized = stripLocalePrefix(pathname);

  if (localized.locale) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = localized.pathname;

    const requestHeaders = new Headers(request.headers);
    const existingCookie = requestHeaders.get("cookie");
    requestHeaders.set(
      "cookie",
      [
        `${LANGUAGE_COOKIE}=${localized.locale}`,
        existingCookie,
      ]
        .filter(Boolean)
        .join("; "),
    );

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    });
    response.cookies.set(LANGUAGE_COOKIE, localized.locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  if (
    pathname.startsWith("/api") ||
    CONCEPT_ROUTES.some(
      (conceptPath) =>
        pathname === conceptPath || pathname.startsWith(`${conceptPath}/`),
    )
  ) {
    return NextResponse.next();
  }

  const preferredLocale =
    request.cookies.get(LANGUAGE_COOKIE)?.value === "en"
      ? ("en" as Locale)
      : ("uk" as Locale);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname =
    pathname === "/" ? `/${preferredLocale}` : `/${preferredLocale}${pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
