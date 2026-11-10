import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { href, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconName } from "@/components/Icon";
import { Stepper } from "@/components/Stepper";
import { StoreButtons } from "@/components/StoreButtons";
import { QrArt } from "@/components/Phone";
import { JsonLd } from "@/components/JsonLd";
import { FinalCta, PageHero, Section, SectionHead } from "@/components/ui";

type P = { params: { locale: Locale } };
const ic: Record<string, IconName> = { qr: "qr", utilities: "bolt", online: "bag", link: "link", transfers: "send", card: "card" };
const tone: Record<string, string> = {
  qr: "bg-ink text-white",
  utilities: "bg-white shadow-soft",
  online: "bg-sand-2",
  link: "bg-brand text-white",
  transfers: "bg-white shadow-soft",
  card: "bg-coral",
};

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/payments", ...t.payments.meta });
}

export default function PaymentsPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const p = t.payments;
  return (
    <>
      <PageHero
        eyebrow={p.hero.eyebrow}
        title={p.hero.title}
        sub={p.hero.sub}
        actions={<Link href={href(locale, "/app")} className="btn btn-primary">{t.ui.openAccount}</Link>}
        aside={
          <div className="relative mx-auto grid max-w-[420px] grid-cols-2 gap-3">
            {(["qr", "utilities", "link", "card"] as const).map((k, i) => (
              <div key={k} className={`glass flex aspect-square flex-col justify-between rounded-4xl p-6 ${i % 2 ? "translate-y-6" : ""}`}>
                <Icon name={ic[k]} className="h-9 w-9 text-petal-sky" />
                <span className="text-lg font-bold">{p.methods.find((m) => m.id === k)?.t}</span>
              </div>
            ))}
          </div>
        }
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.methods.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 0.06} className={`relative overflow-hidden rounded-4xl p-8 ${tone[m.id]}`}>
              <div id={m.id} className="absolute -top-24" />
              {m.id === "qr" && <QrArt className="absolute -bottom-8 -right-8 h-40 w-40 text-white/10" />}
              <Icon name={ic[m.id]} className="h-9 w-9" />
              <h2 className="mt-6 text-h3 font-bold">{m.t}</h2>
              <p className="mt-3 opacity-75">{m.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-4 rounded-4xl border border-ink/10 bg-white p-8 text-ink/70 shadow-soft">{p.linkPay}</Reveal>
      </Section>

      <Section tone="sand" id="utilities">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow={t.home.bills.eyebrow} title={t.home.bills.title} sub={t.home.bills.text} />
            <Reveal delay={0.1} className="mt-8"><Stepper steps={t.home.bills.steps} /></Reveal>
          </div>
          <Reveal className="self-center">
            <ul className="grid gap-3 sm:grid-cols-2">
              {t.home.bills.list.map((x) => (
                <li key={x} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 font-bold shadow-soft">
                  <Icon name="check" className="h-5 w-5 shrink-0 text-brand" strokeWidth={2.4} />{x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <SectionHead tone="dark" title={p.openBanking.title} sub={p.openBanking.text} />
          <Reveal className="glass rounded-4xl p-8">
            <Icon name="shield" className="h-10 w-10 text-petal-sky" />
            <p className="mt-5 text-white/70">{t.home.trust.items[2].d}</p>
          </Reveal>
        </div>
      </Section>

      <FinalCta title={t.home.final.title} sub={t.home.final.sub}><StoreButtons t={t} /></FinalCta>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.payments, "/payments"]])} />
    </>
  );
}
