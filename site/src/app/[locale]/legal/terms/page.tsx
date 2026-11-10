import type { Metadata } from "next";
import { getDict } from "@/content";
import { type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/legal/terms", ...t.legal.terms.meta });
}

export default function TermsPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const x = t.legal.terms;
  return (
    <>
      <PageHero eyebrow={t.nav.legal} title={x.title} sub={x.text} />
      <Section>
        <div className="mx-auto max-w-4xl">
          {locale === "en" && <p className="mb-8 rounded-2xl bg-brand-soft p-4 text-sm text-brand-deep">{t.legal.translationNote}</p>}
          <div className="flex flex-wrap gap-3">
            <a href={SITE.termsPdf} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><Icon name="arrowUp" className="h-4 w-4" />{x.open}</a>
            <a href={SITE.termsPdf} download className="btn btn-ghost-light">{x.download}</a>
          </div>
          <iframe src={SITE.termsPdf} title={x.title} className="mt-8 h-[78vh] w-full rounded-3xl border border-ink/10 bg-white">
            {x.embed}
          </iframe>
        </div>
      </Section>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [x.title, "/legal/terms"]])} />
    </>
  );
}
