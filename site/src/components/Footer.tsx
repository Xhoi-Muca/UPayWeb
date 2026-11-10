import Link from "next/link";
import { Logo } from "./Logo";
import { StoreButtons } from "./StoreButtons";
import { href, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import type { Dict } from "@/content";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const cols: { title: string; links: [string, string, boolean?][] }[] = [
    {
      title: t.footer.products,
      links: [
        [t.nav.personal, "/personal"],
        [t.nav.card, "/card"],
        [t.nav.payments, "/payments"],
        [t.nav.transfers, "/transfers"],
        [t.nav.business, "/business"],
        [t.nav.rewards, "/rewards"],
      ],
    },
    {
      title: t.footer.company,
      links: [
        [t.nav.about, "/about"],
        [t.nav.news, "/news"],
        [t.nav.contact, "/contact"],
      ],
    },
    {
      title: t.footer.support,
      links: [
        [t.nav.help, "/help"],
        [t.nav.fees, "/fees"],
        [t.nav.privacy, "/legal/privacy"],
        [t.nav.terms, "/legal/terms"],
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo className="h-12" />
            <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-white/65">{t.footer.tagline}</p>
            <StoreButtons t={t} className="mt-8" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <h2 className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-white/45">{c.title}</h2>
                <ul className="mt-5 space-y-3">
                  {c.links.map(([label, p]) => (
                    <li key={p}>
                      <Link href={href(locale, p)} className="text-[0.95rem] text-white/80 transition hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 text-[0.875rem] text-white/60 md:grid-cols-3">
          <address className="not-italic leading-relaxed">
            {SITE.address}
            <br />
            {t.footer.hours}
          </address>
          <div className="leading-relaxed">
            <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
            <br />
            <a href={`tel:${SITE.phoneMobile}`} className="hover:text-white">{SITE.phoneMobileLabel}</a>
            {" · "}
            <a href={`tel:${SITE.phoneLandline}`} className="hover:text-white">{SITE.phoneLandlineLabel}</a>
          </div>
          <div className="md:text-right">
            <Link href={href(locale === "sq" ? "en" : "sq", "/")} hrefLang={locale === "sq" ? "en" : "sq"} className="font-bold uppercase tracking-wider text-white/80 hover:text-white">
              {locale === "sq" ? "English" : "Shqip"}
            </Link>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-[0.78rem] leading-relaxed text-white/40">{t.footer.disclaimer}</p>
        <p className="mt-3 text-[0.78rem] text-white/40">
          © {new Date().getFullYear()} {t.footer.operator} {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
