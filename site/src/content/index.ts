import sq from "./sq";
import en from "./en";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "./sq";

export type { Dict };
export function getDict(locale: Locale): Dict {
  return locale === "en" ? en : sq;
}
