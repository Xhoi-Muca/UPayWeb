import Image from "next/image";
import Link from "next/link";
import { PetalMark } from "./PetalMark";
import { href, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content";
import type { Article } from "@/content/articles";

export function fmtDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "sq" ? "sq-AL" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

export function NewsCard({ article, locale, t }: { article: Article; locale: Locale; t: Dict }) {
  const title = locale === "en" ? article.titleEn : article.title;
  const excerpt = t.news.items[article.slug]?.excerpt ?? "";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-4xl bg-white shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(10,30,80,.3)]">
      <div className="relative aspect-[1024/536] overflow-hidden bg-gradient-to-br from-brand to-ink">
        {article.image ? (
          <Image src={article.image} alt="" fill sizes="(min-width:768px) 380px, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center"><PetalMark mono="rgba(255,255,255,.22)" className="h-24 w-24" /></div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <time dateTime={article.date} className="text-[0.8rem] font-bold uppercase tracking-wider text-brand">{fmtDate(article.date, locale)}</time>
        <h3 className="mt-3 text-balance text-[1.2rem] font-bold leading-snug tracking-tight">
          <Link href={href(locale, `/news/${article.slug}`)} className="after:absolute after:inset-0">{title}</Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem] text-ink/65">{excerpt}</p>
        <span className="mt-auto pt-6 text-[0.9rem] font-bold text-brand">{t.ui.readMore} →</span>
      </div>
    </article>
  );
}
