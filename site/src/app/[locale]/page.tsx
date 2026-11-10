import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { articles } from "@/content/articles";
import { href, type Locale } from "@/lib/i18n";
import { buildMetadata, faqLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { CreditCard } from "@/components/CreditCard";
import { QrArt } from "@/components/Phone";
import { HeroShowcase } from "@/components/HeroShowcase";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Icon, type IconName } from "@/components/Icon";
import { StoreButtons } from "@/components/StoreButtons";
import { Counter } from "@/components/Counter";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { NewsCard } from "@/components/NewsCard";
import { Check, FinalCta, Section, SectionHead } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/", title: t.meta.title, description: t.meta.description });
}

export default function HomePage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const h = t.home;
  const L = (p: string) => href(locale, p);
  const faqItems = [t.help.groups[0].items[0], t.help.groups[0].items[2], t.help.groups[1].items[0], t.help.groups[1].items[2], t.help.groups[2].items[0], t.help.groups[2].items[1]];

  return (
    <>
      {/* ───────── HERO ───────── */}
      <HeroCarousel
        prev={t.ui.prev}
        next={t.ui.next}
        slides={[
          {
            key: "app",
            title: (
              <>
                <span className="block">{h.hero.title[0]}</span>
                <span className="block text-white/60">{h.hero.title[1]}</span>
              </>
            ),
            sub: h.hero.sub,
            actions: (
              <>
                <Link href={L("/app")} className="btn btn-light">{t.ui.openAccount}</Link>
                <StoreButtons t={t} className="hidden sm:flex" />
              </>
            ),
            visual: (
              <HeroShowcase
                alt={h.hero.title[0]}
                note={t.ui.illustrative}
                items={[
                  { icon: "bolt", title: h.hero.phone.item1, amount: "-3.240" },
                  { icon: "gift", title: h.hero.phone.item2, amount: "+120", positive: true },
                  { icon: "coins", title: h.hero.phone.item3, amount: "+10.000", positive: true },
                ]}
              />
            ),
          },
          {
            key: "card",
            eyebrow: h.card.eyebrow,
            title: t.card.hero.title,
            sub: t.card.hero.sub,
            actions: <Link href={L("/card")} className="btn btn-light">{h.card.cta}<Icon name="arrow" className="h-4 w-4" /></Link>,
            visual: <CreditCard className="w-[88%] max-w-[440px] self-center" label={t.nav.card} />,
          },
          {
            key: "qr",
            eyebrow: h.qr.eyebrow,
            title: h.qr.title,
            sub: h.qr.text,
            actions: <Link href={L("/payments")} className="btn btn-light">{t.nav.payments}<Icon name="arrow" className="h-4 w-4" /></Link>,
            visual: <Image src="/img/Screen-3.png" alt={h.qr.title} width={656} height={1326} sizes="(min-width:1024px) 300px, 60vw" className="h-auto max-h-[440px] w-auto max-w-[62%] object-contain lg:max-h-[520px]" />,
          },
        ]}
      />

      {/* ───────── WALLET BENTO ───────── */}
      <Section id="wallet">
        <SectionHead eyebrow={h.wallet.eyebrow} title={h.wallet.title} sub={h.wallet.sub} />
        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Reveal className="overflow-hidden rounded-4xl bg-ink p-8 text-white md:col-span-4 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_.9fr]">
              <div>
                <Icon name="link" className="h-8 w-8 text-petal-sky" />
                <h3 className="mt-5 text-h3 font-bold">{h.wallet.tiles[0].title}</h3>
                <p className="mt-3 max-w-md text-white/65">{h.wallet.tiles[0].text}</p>
              </div>
              <div aria-hidden="true" className="mx-auto w-full max-w-[340px] md:mr-0">
                <div className="rounded-3xl bg-white p-5 text-ink">
                  <p className="text-sm font-medium text-ink/50">{h.wallet.tiles[0].title}</p>
                  <p className="mt-1 text-4xl font-bold tracking-tighter">5.000 <span className="text-lg font-medium text-ink/50">Lekë</span></p>
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-sand px-4 py-3 text-sm font-bold text-brand">
                    <span className="flex items-center gap-2"><Icon name="link" className="h-4 w-4" />https://…</span>
                    <Icon name="arrowUp" className="h-4 w-4" />
                  </div>
                  <div className="mt-4 rounded-full bg-brand py-3 text-center text-sm font-bold text-white">{h.hero.phone.pay}</div>
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-end">
                  {["E-mail", "SMS", "WhatsApp"].map((c) => (
                    <span key={c} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="relative overflow-hidden rounded-4xl bg-ink p-8 text-white md:col-span-2">
            <QrArt className="absolute -bottom-6 -right-6 h-44 w-44 text-white/15" />
            <Icon name="qr" className="h-8 w-8 text-petal-sky" />
            <h3 className="mt-5 text-h3 font-bold">{h.wallet.tiles[1].title}</h3>
            <p className="mt-3 text-white/65">{h.wallet.tiles[1].text}</p>
          </Reveal>
          <Reveal delay={0.04} className="rounded-4xl bg-brand p-8 text-white md:col-span-2">
            <Icon name="bolt" className="h-8 w-8" />
            <h3 className="mt-5 text-h3 font-bold">{h.wallet.tiles[2].title}</h3>
            <p className="mt-3 text-white/75">{h.wallet.tiles[2].text}</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-4xl bg-sand-2 p-8 md:col-span-2">
            <Icon name="bag" className="h-8 w-8 text-brand" />
            <h3 className="mt-5 text-h3 font-bold">{h.wallet.tiles[3].title}</h3>
            <p className="mt-3 text-ink/65">{h.wallet.tiles[3].text}</p>
          </Reveal>
          <Reveal delay={0.12} className="rounded-4xl bg-coral p-8 text-ink md:col-span-2">
            <Icon name="gift" className="h-8 w-8" />
            <h3 className="mt-5 text-h3 font-bold">{h.wallet.tiles[4].title}</h3>
            <p className="mt-3 text-ink/75">{h.wallet.tiles[4].text}</p>
          </Reveal>
        </div>
      </Section>

      {/* ───────── CARD ───────── */}
      <section className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Parallax speed={40}>
            <CreditCard className="mx-auto w-full max-w-[560px]" label={t.nav.card} />
          </Parallax>
          <div>
            <Reveal><p className="eyebrow text-petal-sky">{h.card.eyebrow}</p></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 text-balance text-h1 font-bold">{h.card.title}</h2></Reveal>
            <Reveal delay={0.1}><p className="mt-6 max-w-xl text-lg text-white/70">{h.card.text}</p></Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-4">
                {h.card.points.map((p) => <Check key={p} dark>{p}</Check>)}
              </ul>
              <Link href={L("/card")} className="btn btn-light mt-10">{h.card.cta}<Icon name="arrow" className="h-4 w-4" /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── QR ───────── */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_.8fr]">
          <div>
            <SectionHead eyebrow={h.qr.eyebrow} title={h.qr.title} sub={h.qr.text} />
            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-4">{h.qr.points.map((p) => <Check key={p}>{p}</Check>)}</ul>
            </Reveal>
          </div>
          <div className="relative mx-auto flex h-[520px] w-full max-w-[520px] items-end justify-center overflow-hidden rounded-5xl bg-brand px-10 pt-12 lg:h-[600px]">
            <Image src="/img/Screen-3.png" alt={h.qr.title} width={656} height={1326} sizes="320px" className="mb-[-22%] h-auto w-[62%] max-w-[320px]" />
          </div>
        </div>
      </Section>

      {/* ───────── UTILITIES (scroll-driven) ───────── */}
      <Section tone="sand">
        <SectionHead eyebrow={h.bills.eyebrow} title={h.bills.title} sub={h.bills.text} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {h.bills.steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={(i % 3) * 0.06} className="rounded-4xl bg-white p-7">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-base font-bold text-white">{i + 1}</span>
              <h3 className="mt-5 text-h3 font-bold">{s.t}</h3>
              <p className="mt-2 text-ink/65">{s.d}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {h.bills.list.map((x) => (
              <li key={x} className="rounded-full bg-white px-5 py-2.5 text-[0.95rem] font-medium text-ink/80">{x}</li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ───────── TRANSFERS (real app screenshot) ───────── */}
      <section className="relative isolate overflow-hidden bg-ink-2 py-24 text-white sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHead tone="dark" eyebrow={h.transfer.eyebrow} title={h.transfer.title} sub={h.transfer.text} />
            <Reveal delay={0.12}>
              <Link href={L("/transfers")} className="btn btn-light mt-9">{h.transfer.cta}<Icon name="arrow" className="h-4 w-4" /></Link>
            </Reveal>
          </div>
          <Parallax speed={30} className="order-1 mx-auto w-full max-w-[420px] lg:order-2">
            <Image src="/img/hand-iphone-homepage.png" alt={t.ui.illustrative} width={455} height={549} sizes="420px" className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,.5)]" />
          </Parallax>
        </div>
      </section>

      {/* ───────── BUSINESS ───────── */}
      <section className="relative isolate overflow-hidden bg-brand py-24 text-white sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_.9fr]">
          <div>
            <Reveal><p className="eyebrow text-white/80">{h.business.eyebrow}</p></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 text-balance text-h1 font-bold">{h.business.title}</h2></Reveal>
            <Reveal delay={0.1}><p className="mt-6 max-w-xl text-lg text-white/80">{h.business.text}</p></Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">{h.business.points.map((p) => <Check key={p} dark>{p}</Check>)}</ul>
              <Link href={L("/business")} className="btn btn-light mt-10">{h.business.cta}<Icon name="arrow" className="h-4 w-4" /></Link>
            </Reveal>
          </div>
          <Parallax speed={28}>
            <Image src="/img/UPay-Business-Mobile.png" alt={h.business.eyebrow} width={1593} height={1882} sizes="(min-width:1024px) 480px, 90vw" className="mx-auto h-auto w-full max-w-[480px] drop-shadow-[0_40px_60px_rgba(0,20,80,.5)]" />
          </Parallax>
        </div>
      </section>

      {/* ───────── REWARDS ───────── */}
      <Section>
        <Reveal className="overflow-hidden rounded-5xl bg-brand-soft text-ink">
          <div className="grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="eyebrow text-brand">{h.rewards.eyebrow}</p>
              <h2 className="mt-4 text-balance text-h1 font-bold">{h.rewards.title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">{h.rewards.text}</p>
              <dl className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-ink/15 pt-8">
                {h.rewards.facts.map((f) => (
                  <div key={f.l}>
                    <dd className="text-[clamp(3rem,6vw,4.75rem)] font-bold leading-none tracking-tighter text-brand">{f.v}<span className="ml-1.5 text-2xl font-bold tracking-normal text-ink/60">{f.u}</span></dd>
                    <dt className="mt-3 text-[0.95rem] text-ink/70">{f.l}</dt>
                  </div>
                ))}
              </dl>
              <Link href={L("/rewards")} className="btn btn-primary mt-10">{h.rewards.cta}<Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="relative min-h-[420px] bg-[#1f1d78]">
              <Image src="/img/app/app-5.png" alt="UPay bonus" fill sizes="(min-width:1024px) 520px, 100vw" className="object-cover object-top" />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ───────── TRUST ───────── */}
      <Section tone="dark">
        <SectionHead tone="dark" eyebrow={h.trust.eyebrow} title={h.trust.title} sub={h.trust.text} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {h.trust.items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.06} className="glass rounded-4xl p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white"><Icon name={(["shield", "lock", "globe", "phone"] as IconName[])[i]} /></span>
              <h3 className="mt-6 text-xl font-bold">{it.t}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">{it.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────── STATS ───────── */}
      <Section tone="sand">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead title={h.stats.title} />
          <p className="text-sm text-ink/50">{h.stats.note} · {t.ui.asOf}</p>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {h.stats.items.map((s) => (
            <Reveal key={s.l}>
              <dd className="text-[clamp(2.25rem,4.4vw,3.75rem)] font-bold leading-none tracking-tighter text-brand"><Counter value={s.v} suffix={s.suffix} locale={locale} /></dd>
              <dt className="mt-3 max-w-[16ch] text-[0.95rem] text-ink/65">{s.l}</dt>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* ───────── HOW IT WORKS ───────── */}
      <Section>
        <SectionHead eyebrow={h.how.eyebrow} title={h.how.title} />
        <ol className="mt-14 grid gap-5 lg:grid-cols-3">
          {h.how.steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 0.08} className="relative overflow-hidden rounded-4xl bg-white p-8 pt-24 shadow-soft">
              <span className="absolute left-7 top-3 text-[7rem] font-bold leading-none tracking-tighter text-brand/10" aria-hidden="true">{i + 1}</span>
              <h3 className="text-h3 font-bold">{s.t}</h3>
              <p className="mt-3 text-ink/65">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ───────── CASES ───────── */}
      <section className="bg-ink py-24 text-white sm:py-28">
        <div className="container-x"><SectionHead tone="dark" eyebrow={h.cases.eyebrow} title={h.cases.title} /></div>
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] [scrollbar-width:none]" tabIndex={0} role="region" aria-label={h.cases.title}>
          {t.cases.map((c) => (
            <figure key={c.name} className="glass flex w-[84vw] max-w-[420px] shrink-0 snap-start flex-col justify-between rounded-4xl p-8">
              <blockquote className="text-[1.05rem] leading-relaxed text-white/85">“{c.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-lg font-bold">{c.name[0]}</span>
                <span><span className="block font-bold">{c.name}</span><span className="text-sm text-white/55">{c.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────── NEWS ───────── */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow={h.news.eyebrow} title={h.news.title} />
          <Link href={L("/news")} className="btn btn-ghost-light">{t.ui.allNews}<Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => <Reveal key={a.slug} delay={i * 0.07}><NewsCard article={a} locale={locale} t={t} /></Reveal>)}
        </div>
      </Section>

      {/* ───────── FAQ ───────── */}
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHead eyebrow={h.faq.eyebrow} title={h.faq.title} />
            <Reveal delay={0.1}><Link href={L("/help")} className="btn btn-ghost-light mt-8">{t.nav.help}<Icon name="arrow" className="h-4 w-4" /></Link></Reveal>
          </div>
          <Faq items={faqItems} />
        </div>
        <JsonLd data={faqLd(faqItems)} />
      </Section>

      <FinalCta title={h.final.title} sub={h.final.sub}>
        <Link href={L("/app")} className="btn btn-light !h-14 !px-8 !text-base">{t.ui.openAccount}</Link>
        <StoreButtons t={t} />
      </FinalCta>
    </>
  );
}
