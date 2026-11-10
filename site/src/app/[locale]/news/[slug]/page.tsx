import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { articles } from "@/content/articles";
import { href, locales, type Locale } from "@/lib/i18n";
import { SITE_URL, SITE } from "@/lib/site";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { fmtDate } from "@/components/NewsCard";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PetalMark } from "@/components/PetalMark";
import { FinalCta } from "@/components/ui";
import { StoreButtons } from "@/components/StoreButtons";

type P = { params: { locale: Locale; slug: string } };

export function generateStaticParams() {
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export function generateMetadata({ params }: P): Metadata {
  const a = articles.find((x) => x.slug === params.slug);
  if (!a) return {};
  const t = getDict(params.locale);
  const title = params.locale === "en" ? a.titleEn : a.title;
  return buildMetadata({ locale: params.locale, path: `/news/${a.slug}`, title, description: t.news.items[a.slug]?.excerpt ?? t.news.meta.description, image: a.image, type: "article" });
}

export default function ArticlePage({ params }: P) {
  const a = articles.find((x) => x.slug === params.slug);
  if (!a) notFound();
  const locale = params.locale;
  const t = getDict(locale);
  const title = locale === "en" ? a.titleEn : a.title;
  const ld = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    datePublished: a.date,
    inLanguage: "sq",
    image: a.image ? [SITE_URL + a.image] : undefined,
    author: { "@type": "Organization", name: SITE.operator },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: SITE_URL + href(locale, `/news/${a.slug}`),
  };
  return (
    <>
      <header className="relative overflow-hidden bg-ink pb-16 pt-36 text-white sm:pt-44">
        <div className="container-x relative max-w-4xl">
          <Link href={href(locale, "/news")} className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><Icon name="arrow" className="h-4 w-4 rotate-180" />{t.ui.back}</Link>
          <time dateTime={a.date} className="mt-8 block text-sm font-bold uppercase tracking-[0.14em] text-petal-sky">{t.ui.published} {fmtDate(a.date, locale)}</time>
          <h1 className="mt-4 text-balance text-h1 font-bold">{title}</h1>
        </div>
      </header>
      <article className="bg-sand py-14 sm:py-20">
        <div className="container-x max-w-3xl">
          <div className="relative mb-12 aspect-[1024/536] overflow-hidden rounded-4xl bg-gradient-to-br from-brand to-ink shadow-soft">
            {a.image ? <Image src={a.image} alt="" fill priority sizes="(min-width:768px) 768px, 100vw" className="object-cover" /> : <div className="grid h-full place-items-center"><PetalMark mono="rgba(255,255,255,.25)" className="h-28 w-28" /></div>}
          </div>
          {locale === "en" && <p className="mb-8 rounded-2xl bg-brand-soft p-4 text-sm text-brand-deep">{t.ui.originalLang}</p>}
          <div lang="sq" className="space-y-5 text-[1.12rem] leading-8 text-ink/85 [&_a]:text-brand [&_a]:underline [&_p]:mb-5 [&_strong]:text-ink" dangerouslySetInnerHTML={{ __html: a.html }} />
        </div>
      </article>
      <FinalCta title={t.home.final.title} sub={t.home.final.sub}><StoreButtons t={t} /></FinalCta>
      <JsonLd data={[ld, breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.news, "/news"], [title, `/news/${a.slug}`]])]} />
    </>
  );
}
