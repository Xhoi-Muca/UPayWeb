import type { Metadata } from "next";
import { getDict } from "@/content";
import { articles } from "@/content/articles";
import { type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { NewsCard } from "@/components/NewsCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/news", ...t.news.meta });
}

export default function NewsPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const [first, ...rest] = articles;
  return (
    <>
      <PageHero eyebrow={t.news.hero.eyebrow} title={t.news.hero.title} sub={t.news.hero.sub} />
      <Section>
        <Reveal><NewsCard article={first} locale={locale} t={t} /></Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((a, i) => <Reveal key={a.slug} delay={i * 0.07}><NewsCard article={a} locale={locale} t={t} /></Reveal>)}
        </div>
        {locale === "en" && <p className="mt-10 text-sm text-ink/55">{t.ui.originalLang}</p>}
      </Section>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.news, "/news"]])} />
    </>
  );
}
