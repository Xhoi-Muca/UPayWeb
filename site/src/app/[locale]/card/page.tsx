import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { href, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { CreditCard } from "@/components/CreditCard";
import { CardControl } from "@/components/CardControl";
import { Parallax } from "@/components/Parallax";
import { Icon } from "@/components/Icon";
import { StoreButtons } from "@/components/StoreButtons";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { Check, FinalCta, PageHero, Section, SectionHead } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/card", ...t.card.meta, image: undefined });
}

export default function CardPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const c = t.card;
  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        sub={c.hero.sub}
        actions={<><Link href={href(locale, "/app")} className="btn btn-primary">{t.ui.openAccount}</Link><Link href={href(locale, "/fees")} className="btn btn-ghost-dark">{t.ui.viewFees}</Link></>}
        aside={<Parallax speed={20}><CreditCard className="mx-auto w-full max-w-[560px] rotate-[-6deg]" label={t.nav.card} /></Parallax>}
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead title={c.how.title} sub={c.how.text} />
            <Reveal delay={0.1}><ul className="mt-8 space-y-4">{c.how.points.map((p) => <Check key={p}>{p}</Check>)}</ul></Reveal>
          </div>
          <Reveal className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-4xl bg-brand p-8 text-white sm:col-span-2">
              <p className="text-[clamp(4rem,10vw,7rem)] font-bold leading-none tracking-tighter">{c.zero.v}</p>
              <h3 className="mt-3 text-h3 font-bold">{c.zero.t}</h3>
              <p className="mt-2 text-white/80">{c.zero.d}</p>
            </div>
            <div className="rounded-4xl bg-white p-8 shadow-soft">
              <Icon name="phone" className="h-8 w-8 text-brand" />
              <h3 className="mt-4 text-xl font-bold">{c.wallet.title}</h3>
              <p className="mt-2 text-[0.95rem] text-ink/65">{c.wallet.text}</p>
            </div>
            <div className="rounded-4xl bg-coral p-8">
              <Icon name="gift" className="h-8 w-8" />
              <h3 className="mt-4 text-xl font-bold">{c.bonus.title}</h3>
              <p className="mt-2 text-[0.95rem] text-ink/75">{c.bonus.text}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <CardControl labels={{ open: c.control.open, blocked: c.control.blocked, card: t.nav.card }} />
          <div>
            <SectionHead tone="dark" title={c.control.title} />
            <Reveal delay={0.1}><ul className="mt-8 space-y-4">{c.control.points.map((p) => <Check key={p} dark>{p}</Check>)}</ul></Reveal>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead title={c.order.title} />
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {c.order.steps.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 0.07} className="rounded-4xl bg-white p-7 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-lg font-bold text-white">{i + 1}</span>
              <p className="mt-5 text-lg font-bold leading-snug">{s}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-h3 font-bold">{c.topup.title}</h3>
            <p className="mt-3 max-w-xl text-ink/70">{c.topup.text}</p>
            <p className="mt-4 text-sm text-ink/55">{c.partners}</p>
          </div>
          <div className="rounded-4xl bg-ink p-8 text-white">
            <p className="text-lg">{c.feesNote}</p>
            <Link href={href(locale, "/fees#card")} className="btn btn-light mt-6">{t.ui.viewFees}<Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title={t.help.groups[2].title} />
        <div className="mt-10"><Faq items={t.help.groups[2].items} /></div>
        <JsonLd data={[breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.card, "/card"]])]} />
      </Section>

      <FinalCta title={t.home.final.title} sub={t.home.final.sub}><StoreButtons t={t} /></FinalCta>
    </>
  );
}
