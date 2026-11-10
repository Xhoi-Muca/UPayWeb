import type { Metadata } from "next";
import { getDict } from "@/content";
import { type Locale } from "@/lib/i18n";
import { StoreButtons } from "@/components/StoreButtons";
import { StoreRedirect } from "@/components/StoreRedirect";
import { PageHero } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return { title: t.ui.download, robots: { index: false, follow: true } };
}

/** Replaces the old upay.al/App redirect: phones go to their store, desktops see both badges. */
export default function AppPage({ params }: P) {
  const t = getDict(params.locale);
  return (
    <>
      <StoreRedirect />
      <PageHero eyebrow={t.ui.download} title={t.app.title} sub={`${t.app.sub} ${t.app.desktop}`} actions={<StoreButtons t={t} />} />
    </>
  );
}
