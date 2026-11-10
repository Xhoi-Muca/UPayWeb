import raw from "./generated/articles.sq.json";

export type Article = { slug: string; date: string; title: string; html: string; image?: string; titleEn: string };

const images: Record<string, string> = {
  "union-financiar-tirane-prezanton-karten-upay-nje-epoke-e-re-per-financat-personale": "/img/upay-artikull-2-2-1024x536-1.jpg",
  "per-here-te-pare-ne-shqiperi-transferta-nderkombetare-parash-direkt-nga-celulari-permes-upay": "/img/transferta-upay-1024x536-1.jpg",
};
const titlesEn: Record<string, string> = {
  "union-financiar-tirane-prezanton-karten-upay-nje-epoke-e-re-per-financat-personale": "Union Financiar Tiranë introduces the UPay Card – a new era for personal finance",
  "union-financiar-tirane-kryen-transaksionet-e-para-nepermjet-open-banking-2": "Union Financiar Tiranë completes its first Open Banking transactions",
  "per-here-te-pare-ne-shqiperi-transferta-nderkombetare-parash-direkt-nga-celulari-permes-upay": "A first for Albania – international money transfers straight from your phone, through UPay",
};

export const articles: Article[] = (raw as { slug: string; date: string; title: string; html: string }[])
  .map((a) => ({ ...a, image: images[a.slug], titleEn: titlesEn[a.slug] ?? a.title }))
  .sort((a, b) => b.date.localeCompare(a.date));
