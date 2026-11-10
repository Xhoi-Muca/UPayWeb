import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { href, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbLd, faqLd } from "@/lib/seo";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/help", ...t.help.meta });
}

export default function HelpPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const h = t.help;
  const all = [...h.groups.flatMap((g) => g.items), ...h.businessFaq];
  return (
    <>
      <PageHero eyebrow={h.hero.eyebrow} title={h.hero.title} sub={h.hero.sub} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label={h.hero.eyebrow} className="top-28 self-start lg:sticky">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {[...h.groups.map((g) => [g.id, g.title]), ["business", t.nav.business]].map(([id, label]) => (
                <li key={id}><a href={`#${id}`} className="block rounded-full bg-white px-5 py-3 text-[0.95rem] font-bold shadow-soft transition hover:bg-brand hover:text-white">{label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16">
            {h.groups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28">
                <Reveal><h2 className="mb-6 text-h2 font-bold">{g.title}</h2></Reveal>
                <Faq items={g.items} />
              </section>
            ))}
            <section id="business" className="scroll-mt-28">
              <Reveal><h2 className="mb-6 text-h2 font-bold">{t.nav.business}</h2></Reveal>
              <Faq items={h.businessFaq} />
            </section>
            <Reveal className="rounded-5xl bg-ink p-8 text-white sm:p-10">
              <h2 className="text-h3 font-bold">{h.still.t}</h2>
              <p className="mt-2 text-white/70">{h.still.d}</p>
              <Link href={href(locale, "/contact")} className="btn btn-light mt-6">{t.ui.contactUs}</Link>
            </Reveal>
          </div>
        </div>
      </Section>
      <JsonLd data={[faqLd(all), breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.help, "/help"]])]} />
    </>
  );
}
