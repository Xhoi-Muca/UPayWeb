import type { Metadata } from "next";
import { SITE_URL, SITE } from "./site";
import { alternates, href, type Locale } from "./i18n";

export function buildMetadata(opts: { locale: Locale; path: string; title: string; description: string; image?: string; type?: "website" | "article" }): Metadata {
  const { locale, path, title, description, image, type = "website" } = opts;
  const alt = alternates(path);
  const url = SITE_URL + href(locale, path);
  const og = image ? SITE_URL + image : `${SITE_URL}/api/og?l=${locale}&t=${encodeURIComponent(title.slice(0, 80))}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { sq: SITE_URL + alt.sq, en: SITE_URL + alt.en, "x-default": SITE_URL + alt.sq },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: locale === "sq" ? "sq_AL" : "en_GB",
      alternateLocale: locale === "sq" ? ["en_GB"] : ["sq_AL"],
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: SITE.name,
    legalName: SITE.operator,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/cropped-LOGO-UPAY.png`,
    email: SITE.email,
    telephone: SITE.phoneMobile,
    taxID: SITE.nipt,
    parentOrganization: { "@type": "Organization", name: SITE.operator, url: SITE.parentUrl },
    address: { "@type": "PostalAddress", streetAddress: "Rr. Ismail Qemali, Nr. 32, Kati 3", addressLocality: "Tiranë", addressCountry: "AL" },
    areaServed: "AL",
    sameAs: [SITE.appStore, SITE.googlePlay],
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function breadcrumbLd(locale: Locale, crumbs: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE_URL + href(locale, path) })),
  };
}
