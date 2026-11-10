import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { href, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { StoreButtons } from "@/components/StoreButtons";
import { Check, FinalCta, PageHero, Section, SectionHead } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/rewards", ...t.rewards.meta });
}

export default function RewardsPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const r = t.rewards;
  return (
    <>
      <PageHero
        eyebrow={r.hero.eyebrow}
        title={r.hero.title}
        sub={r.hero.sub}
        actions={<Link href={href(locale, "/app")} className="btn btn-primary">{t.ui.openAccount}</Link>}
        aside={
          <div className="relative mx-auto flex aspect-square max-w-[380px] items-center justify-center">
            <div className="absolute inset-0  rounded-full bg-coral opacity-90" />
            <div className="relative text-center text-ink">
              <p className="text-[clamp(5rem,13vw,8rem)] font-bold leading-none tracking-tighter">300</p>
              <p className="text-2xl font-bold">lekë · bonus</p>
            </div>
          </div>
        }
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {r.facts.map((f, i) => (
            <Reveal key={f.v} delay={i * 0.07} className={`rounded-4xl p-8 ${["bg-coral", "bg-brand text-white", "bg-ink text-white"][i]}`}>
              <p className="text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-none tracking-tighter">{f.v}</p>
              <h2 className="mt-4 text-xl font-bold">{f.t}</h2>
              <p className="mt-2 opacity-80">{f.d}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead title={r.earnTitle} />
            <Reveal delay={0.1}><ul className="mt-8 space-y-4">{r.earn.map((e) => <Check key={e}>{e}</Check>)}</ul></Reveal>
          </div>
          <Reveal className="rounded-5xl bg-white p-8 shadow-soft sm:p-10">
            <ol className="space-y-6">
              {r.steps.map((s, i) => (
                <li key={s.t} className="flex gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
                  <span><span className="block text-lg font-bold">{s.t}</span><span className="text-ink/65">{s.d}</span></span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead tone="dark" title={r.partnersTitle} sub={r.partnersNote} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.cases.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05} className="glass rounded-4xl p-7">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-xl font-bold">{c.name[0]}</span>
              <h3 className="mt-5 text-xl font-bold">{c.name}</h3>
              <p className="text-sm text-white/55">{c.role}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/50">{r.ecosystem.title}</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {r.ecosystem.items.map((e) => (
              <li key={e} className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-bold"><Icon name="check" className="h-4 w-4 text-petal-green" strokeWidth={2.6} />{e}</li>
            ))}
          </ul>
        </div>
      </Section>

      <FinalCta title={t.home.final.title} sub={t.home.final.sub}><StoreButtons t={t} /></FinalCta>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.rewards, "/rewards"]])} />
    </>
  );
}
