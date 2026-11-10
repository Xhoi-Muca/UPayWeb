import type { Metadata } from "next";
import { getDict } from "@/content";
import { type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { PageHero, Section, SectionHead } from "@/components/ui";

type P = { params: { locale: Locale } };

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/contact", ...t.contact.meta });
}

export default function ContactPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const c = t.contact;
  const lb = c.labels;
  const rows: { icon: "mail" | "phone" | "pin" | "clock"; label: string; body: React.ReactNode }[] = [
    { icon: "mail", label: lb.email, body: <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a> },
    { icon: "phone", label: lb.phone, body: <><a href={`tel:${SITE.phoneMobile}`} className="hover:text-brand">{lb.mobile}: {SITE.phoneMobileLabel}</a><br /><a href={`tel:${SITE.phoneLandline}`} className="hover:text-brand">{lb.landline}: {SITE.phoneLandlineLabel}</a></> },
    { icon: "pin", label: lb.address, body: <>{lb.meet}<br />{SITE.address}</> },
    { icon: "clock", label: lb.hours, body: t.footer.hours },
  ];
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} sub={c.hero.sub} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal className="rounded-5xl bg-white p-8 shadow-soft sm:p-10"><ContactForm t={t} locale={locale} /></Reveal>
          <div className="space-y-4">
            {rows.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.05} className="flex gap-5 rounded-4xl bg-sand-2 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-white"><Icon name={r.icon} /></span>
                <div><h2 className="text-sm font-bold uppercase tracking-wider text-ink/50">{r.label}</h2><p className="mt-1 leading-relaxed">{r.body}</p></div>
              </Reveal>
            ))}
            <Reveal className="rounded-4xl bg-brand p-6 text-white">
              <h2 className="text-lg font-bold">{c.sales.t}</h2>
              <p className="mt-1 text-white/80">{c.sales.d}</p>
              <a href={`mailto:${SITE.email}?subject=UPay%20Business`} className="btn btn-light mt-5">{SITE.email}</a>
            </Reveal>
          </div>
        </div>
      </Section>
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHead title={t.home.faq.title} />
          <Faq items={t.help.groups[0].items.concat(t.help.groups[1].items.slice(0, 2))} />
        </div>
      </Section>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.contact, "/contact"]])} />
    </>
  );
}
