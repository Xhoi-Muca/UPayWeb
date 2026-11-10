import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { href, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbLd, faqLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { Icon, type IconName } from "@/components/Icon";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { QrArt } from "@/components/Phone";
import { StoreButtons } from "@/components/StoreButtons";
import { Check, FinalCta, PageHero, Section, SectionHead } from "@/components/ui";

type P = { params: { locale: Locale } };
const ic: IconName[] = ["bag", "card", "qr", "link"];

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/business", ...t.business.meta });
}

export default function BusinessPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const b = t.business;
  const offerIcons: IconName[] = ["bolt", "shield", "coins", "chart", "coins"];
  return (
    <>
      <PageHero
        eyebrow={b.hero.eyebrow}
        title={b.hero.title}
        sub={b.hero.sub}
        actions={<><Link href={href(locale, "/app")} className="btn btn-primary">{t.ui.openAccount}</Link><Link href={href(locale, "/contact")} className="btn btn-ghost-dark">{t.ui.contactSales}</Link></>}
        aside={<Parallax speed={24}><Image src="/img/UPay-Business-Mobile.png" alt={b.pos.eyebrow} width={1593} height={1882} priority sizes="480px" className="mx-auto h-auto w-full max-w-[460px] drop-shadow-[0_40px_60px_rgba(0,0,0,.5)]" /></Parallax>}
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-4xl bg-white p-8 shadow-soft md:row-span-2">
            <Icon name={ic[0]} className="h-9 w-9 text-brand" />
            <h2 className="mt-5 text-h3 font-bold">{b.solutions[0].t}</h2>
            <p className="mt-1 font-bold text-brand">{b.solutions[0].d}</p>
            <ul className="mt-6 space-y-3">{b.solutions[0].points.map((p) => <Check key={p}>{p}</Check>)}</ul>
          </Reveal>
          {b.solutions.slice(1).map((s, i) => (
            <Reveal key={s.id} delay={0.06 * (i + 1)} className={`relative overflow-hidden rounded-4xl p-8 ${["bg-brand text-white", "bg-ink text-white", "bg-sand-2"][i]}`}>
              {s.id === "qr" && <QrArt className="absolute -bottom-6 -right-6 h-36 w-36 text-white/10" />}
              <Icon name={ic[i + 1]} className="h-9 w-9" />
              <h2 className="mt-5 text-h3 font-bold">{s.t}</h2>
              <p className="mt-2 opacity-75">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead tone="dark" eyebrow={b.pos.eyebrow} title={b.pos.title} />
            <Reveal delay={0.1}><ul className="mt-8 space-y-4">{b.pos.points.map((p) => <Check key={p} dark>{p}</Check>)}</ul></Reveal>
          </div>
          <Reveal className="glass rounded-5xl p-8 sm:p-10">
            <h3 className="text-h3 font-bold">{b.pos.stepsTitle}</h3>
            <ol className="mt-8 space-y-4">
              {b.pos.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-bold">{i + 1}</span>
                  <span className="font-bold">{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead title={b.offer.title} sub={b.offer.text} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {b.offer.items.map((o, i) => (
            <Reveal key={o.t} delay={i * 0.05} className="rounded-4xl bg-white p-6 shadow-soft">
              <Icon name={offerIcons[i]} className="h-8 w-8 text-brand" />
              <h3 className="mt-5 text-lg font-bold">{o.t}</h3>
              <p className="mt-2 text-[0.95rem] text-ink/65">{o.d}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[b.cash, b.potential].map((s) => (
            <Reveal key={s.v} className="rounded-4xl bg-brand p-8 text-white">
              <p className="text-[clamp(3.5rem,8vw,6rem)] font-bold leading-none tracking-tighter">{s.v}</p>
              <p className="mt-3 text-xl font-bold">{s.t}</p>
              <p className="mt-1 text-white/70">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow={t.home.cases.eyebrow} title={t.home.cases.title} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.cases.map((c, i) => (
            <Reveal as="div" key={c.name} delay={i * 0.05}>
              <figure className="flex h-full flex-col justify-between rounded-4xl bg-white p-8 shadow-soft">
                <blockquote className="leading-relaxed text-ink/80">“{c.quote}”</blockquote>
                <figcaption className="mt-6 font-bold">{c.name}<span className="block text-sm font-medium text-ink/50">{c.role}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHead title={b.faq.title} />
          <Faq items={t.help.businessFaq} />
        </div>
        <JsonLd data={[faqLd(t.help.businessFaq), breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.business, "/business"]])]} />
      </Section>

      <FinalCta title={b.cta.title} sub={b.cta.sub}>
        <Link href={href(locale, "/contact")} className="btn btn-light !h-14 !px-8">{t.ui.contactSales}</Link>
        <StoreButtons t={t} />
      </FinalCta>
    </>
  );
}
