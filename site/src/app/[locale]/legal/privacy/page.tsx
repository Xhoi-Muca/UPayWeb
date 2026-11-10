import type { Metadata } from "next";
import { getDict } from "@/content";
import privacy from "@/content/generated/privacy.sq.json";
import { type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/legal/privacy", ...t.legal.privacy.meta });
}

export default function PrivacyPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  return (
    <>
      <PageHero eyebrow={t.nav.legal} title={t.legal.privacy.title} />
      <Section>
        <div className="mx-auto max-w-3xl">
          {locale === "en" && <p className="mb-8 rounded-2xl bg-brand-soft p-4 text-sm text-brand-deep">{t.legal.translationNote}</p>}
          {/* Static legal text migrated verbatim from upay.al/privacy-policy (sanitised at build time). */}
          <div lang="sq" className="prose-legal" dangerouslySetInnerHTML={{ __html: privacy.html }} />
        </div>
      </Section>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [t.legal.privacy.title, "/legal/privacy"]])} />
    </>
  );
}
