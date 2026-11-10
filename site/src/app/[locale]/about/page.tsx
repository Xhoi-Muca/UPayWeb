import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { href, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { JsonLd } from "@/components/JsonLd";
import { FinalCta, PageHero, Section, SectionHead } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/about", ...t.about.meta });
}

export default function AboutPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const a = t.about;
  return (
    <>
      <PageHero eyebrow={a.hero.eyebrow} title={a.hero.title} sub={a.hero.sub} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-6 text-xl leading-relaxed text-ink/80">
            {a.story.map((p, i) => <Reveal key={i} delay={i * 0.06}><p>{p}</p></Reveal>)}
          </div>
          <Reveal className="self-start rounded-5xl bg-ink p-8 text-white sm:p-10">
            <h2 className="text-xl font-bold">{a.company.t}</h2>
            <dl className="mt-6 divide-y divide-white/10">
              {a.company.rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-4 text-[0.95rem]">
                  <dt className="text-white/50">{k}</dt>
                  <dd className="font-bold">{k === a.company.rows[3][0] ? <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{v}</a> : v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-4 md:grid-cols-2">
          {[a.mission, a.vision].map((m, i) => (
            <Reveal key={m.t} delay={i * 0.07} className={`rounded-5xl p-10 sm:p-12 ${i ? "bg-brand text-white" : "bg-white shadow-soft"}`}>
              <p className="eyebrow opacity-60">{m.t}</p>
              <p className="mt-5 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{m.d}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-[1fr_1fr]">
          <div>
            <ol className="relative space-y-8 border-l-2 border-ink/10 pl-8">
              {a.timeline.map((x) => (
                <Reveal as="li" key={x.y} className="relative">
                  <span className="absolute -left-[2.6rem] top-1.5 h-4 w-4 rounded-full border-4 border-sand-2 bg-brand" />
                  <p className="text-3xl font-bold tracking-tight text-brand">{x.y}</p>
                  <p className="mt-1 max-w-md text-ink/70">{x.t}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <dl className="grid grid-cols-2 gap-6">
            {t.home.stats.items.map((s) => (
              <div key={s.l}>
                <dd className="text-5xl font-bold tracking-tighter text-ink"><Counter value={s.v} suffix={s.suffix} locale={locale} /></dd>
                <dt className="mt-2 text-sm text-ink/60">{s.l}</dt>
              </div>
            ))}
            <p className="col-span-2 text-xs text-ink/45">{t.ui.asOf}</p>
          </dl>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead tone="dark" title={t.home.trust.title} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06} className="glass rounded-4xl p-7">
              <h3 className="text-xl font-bold">{p.t}</h3>
              <p className="mt-2 text-white/65">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta title={t.home.final.title} sub={t.home.final.sub}>
        <Link href={href(locale, "/contact")} className="btn btn-light !h-14 !px-8">{t.ui.contactUs}</Link>
      </FinalCta>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.about, "/about"]])} />
    </>
  );
}
