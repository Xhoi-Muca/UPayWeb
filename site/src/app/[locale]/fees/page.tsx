import type { Metadata } from "next";
import { getDict } from "@/content";
import { cardFees, upayFees, wuReceiveFee, wuTables, type FeeRow } from "@/content/tariffs";
import { type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/fees", ...t.fees.meta });
}

function Rows({ rows, locale }: { rows: FeeRow[]; locale: Locale }) {
  return (
    <dl className="divide-y divide-ink/10">
      {rows.map((r) => (
        <div key={r[0]} className="flex items-start justify-between gap-6 py-4">
          <dt className="font-medium">{locale === "sq" ? r[0] : r[1]}</dt>
          <dd className="max-w-[48%] text-right font-bold text-brand">{locale === "sq" ? r[2] : (r[3] ?? r[2])}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function FeesPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const f = t.fees;
  const tabs = [["upay", f.tabs.upay], ["card", f.tabs.card], ["wu", f.tabs.wu]];
  return (
    <>
      <PageHero eyebrow={f.hero.eyebrow} title={f.hero.title} sub={f.hero.sub} />
      <Section>
        <nav aria-label={f.hero.eyebrow} className="sticky top-24 z-30 -mt-4 mb-10 flex flex-wrap gap-2">
          {tabs.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full bg-white px-5 py-3 text-[0.95rem] font-bold shadow-soft transition hover:bg-brand hover:text-white">{label}</a>)}
        </nav>

        <section id="upay" className="scroll-mt-32">
          <h2 className="text-h2 font-bold">{f.tabs.upay}</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {upayFees.map((g) => (
              <Reveal key={g.sq} className="rounded-4xl bg-white p-8 shadow-soft">
                <h3 className="border-b-2 border-brand pb-3 text-xl font-bold">{locale === "sq" ? g.sq : g.en}</h3>
                <Rows rows={g.rows} locale={locale} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="card" className="mt-20 scroll-mt-32">
          <h2 className="text-h2 font-bold">{f.tabs.card}</h2>
          <Reveal className="mt-8 rounded-4xl bg-white p-8 shadow-soft"><Rows rows={cardFees} locale={locale} /></Reveal>
        </section>

        <section id="wu" className="mt-20 scroll-mt-32">
          <h2 className="text-h2 font-bold">{f.tabs.wu}</h2>
          <Reveal className="mt-8 rounded-4xl bg-[#ffc700] p-8">
            <div className="flex items-center justify-between gap-6 font-bold"><span>{f.wuTitles.receive}</span><span>{wuReceiveFee[locale]}</span></div>
          </Reveal>
          <h3 className="mt-10 text-xl font-bold">{f.wuTitles.send}</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {wuTables.map((tb) => (
              <Reveal key={tb.sq} className="rounded-4xl bg-white p-8 shadow-soft">
                <h4 className="border-b-2 border-[#ffc700] pb-3 text-lg font-bold">{locale === "sq" ? tb.sq : tb.en}</h4>
                <table className="mt-2 w-full text-[0.95rem]">
                  <thead>
                    <tr className="text-left text-ink/50">
                      <th scope="col" className="py-3 font-medium">{f.wuTitles.amount} ({tb.unit === "EUR" ? "€" : "Lekë"})</th>
                      <th scope="col" className="py-3 text-right font-medium">{f.wuTitles.fee} ({tb.unit === "EUR" ? "€" : "Lekë"})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {tb.rows.map(([range, fee]) => (
                      <tr key={range}><td className="py-3">{range}</td><td className="py-3 text-right font-bold">{fee}</td></tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink/60">*{f.note}</p>
        </section>
        <p className="mt-12 text-sm text-ink/45">{f.source}</p>
      </Section>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.fees, "/fees"]])} />
    </>
  );
}
