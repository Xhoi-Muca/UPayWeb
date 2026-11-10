import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getDict } from "@/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { organizationLd } from "@/lib/seo";

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Medium.ttf", weight: "400 500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.ttf", weight: "600 900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#050A18", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "sq") as Locale;
  const t = getDict(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: "%s" },
    description: t.meta.description,
    applicationName: "UPay Albania",
    robots: { index: true, follow: true },
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = getDict(locale);
  return (
    <html lang={locale} className={satoshi.variable}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-bold focus:text-ink">
          {t.ui.skip}
        </a>
        <Header locale={locale} t={t} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
        <JsonLd data={organizationLd()} />
      </body>
    </html>
  );
}
