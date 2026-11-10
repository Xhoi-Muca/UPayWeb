import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { href, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { CreditCard } from "@/components/CreditCard";
import { HomeScreen, PhoneFrame } from "@/components/Phone";
import { Icon, type IconName } from "@/components/Icon";
import { StoreButtons } from "@/components/StoreButtons";
import { JsonLd } from "@/components/JsonLd";
import { FinalCta, PageHero, Section, SectionHead } from "@/components/ui";

type P = { params: { locale: Locale } };
const icons: IconName[] = ["coins", "arrowUp", "qr", "send", "gift", "bell"];

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/personal", ...t.personal.meta });
}

export default function PersonalPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const p = t.personal;
  return (
    <>
      <PageHero
        eyebrow={p.hero.eyebrow}
        title={p.hero.title}
        sub={p.hero.sub}
        actions={<><Link href={href(locale, "/app")} className="btn btn-primary">{t.ui.openAccount}</Link><Link href={href(locale, "/payments")} className="btn btn-ghost-dark">{t.nav.payments}</Link></>}
        aside={
          <div className="relative mx-auto h-[520px] max-w-[440px]">
            <div className="absolute right-0 top-0 w-[62%] rotate-[4deg] "><PhoneFrame label={t.ui.illustrative}><HomeScreen t={t} /></PhoneFrame></div>
            <CreditCard className="absolute bottom-6 left-0 w-[64%] -rotate-[8deg]" label={t.nav.card} />
          </div>
        }
      />
      <Section>
        <SectionHead title={t.home.wallet.title} sub={t.home.wallet.sub} />
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {p.blocks.map((b, i) => (
            <Reveal key={b.t} delay={(i % 3) * 0.07}>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-[0_12px_30px_-10px_rgba(13,93,208,.8)]"><Icon name={icons[i]} className="h-7 w-7" /></span>
              <h3 className="mt-6 text-h3 font-bold">{b.t}</h3>
              <p className="mt-3 text-ink/65">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="dark">
        <SectionHead tone="dark" eyebrow={t.home.how.eyebrow} title={t.home.how.title} />
        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {t.home.how.steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 0.08} className="glass rounded-4xl p-8">
              <span className="text-6xl font-bold tracking-tighter text-petal-sky">{i + 1}</span>
              <h3 className="mt-4 text-h3 font-bold">{s.t}</h3>
              <p className="mt-3 text-white/65">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </Section>
      <FinalCta title={t.home.final.title} sub={t.home.final.sub}>
        <StoreButtons t={t} />
      </FinalCta>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.personal, "/personal"]])} />
    </>
  );
}
