import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { alternates, href, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const pages = ["/", "/personal", "/card", "/payments", "/transfers", "/business", "/rewards", "/about", "/news", "/help", "/contact", "/fees", "/legal/privacy", "/legal/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pages, ...articles.map((a) => `/news/${a.slug}`)];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: SITE_URL + href(l, p),
      lastModified: new Date("2026-11-09"),
      changeFrequency: p === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "/" ? 1 : p.startsWith("/news/") ? 0.5 : 0.8,
      alternates: { languages: { sq: SITE_URL + alternates(p).sq, en: SITE_URL + alternates(p).en } },
    })),
  );
}
