export const locales = ["sq", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sq";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** Albanian lives at the root, English under /en. */
export function href(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === defaultLocale ? clean || "/" : `/en${clean}`;
}

export function alternates(path: string) {
  return {
    sq: href("sq", path),
    en: href("en", path),
  };
}
