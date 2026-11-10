"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { href, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content";

const NAV = [
  ["personal", "/personal"],
  ["card", "/card"],
  ["payments", "/payments"],
  ["business", "/business"],
  ["rewards", "/rewards"],
  ["about", "/about"],
] as const;

const MORE = [
  ["transfers", "/transfers"],
  ["news", "/news"],
  ["help", "/help"],
  ["fees", "/fees"],
  ["contact", "/contact"],
] as const;

/** Removes any locale prefix so the same page can be linked in the other language. */
function stripLocale(p: string) {
  const s = p.replace(/^\/(sq|en)(?=\/|$)/, "");
  return s === "" ? "/" : s;
}

export function Header({ locale, t }: { locale: Locale; t: Dict }) {
  const pathname = stripLocale(usePathname() ?? "/");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const other: Locale = locale === "sq" ? "en" : "sq";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname, locale]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full border px-3 pl-5 text-white transition-all duration-500 sm:h-16 ${
          scrolled || open ? "border-transparent bg-ink" : "border-transparent bg-ink/90"
        }`}
      >
        <Link href={href(locale, "/")} aria-label={`UPay – ${t.ui.home}`} className="flex items-center">
          <Logo className="h-8 sm:h-9" />
        </Link>

        <nav aria-label={t.ui.mainNav} className="hidden items-center gap-1 xl:flex">
          {NAV.map(([k, p]) => (
            <Link
              key={k}
              href={href(locale, p)}
              aria-current={isActive(p) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-[0.9rem] font-medium transition hover:bg-white/10 ${isActive(p) ? "bg-white/10 text-white" : "text-white/75 hover:text-white"}`}
            >
              {t.nav[k]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={href(other, pathname)}
            hrefLang={other}
            lang={other}
            aria-label={`${t.ui.language}: ${other === "en" ? "English" : "Shqip"}`}
            className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-[0.85rem] font-bold uppercase tracking-wider text-white/80 transition hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            <Icon name="globe" className="h-4 w-4" />
            {other}
          </Link>
          <Link href={href(locale, "/app")} className="btn btn-light hidden !h-10 !px-5 !text-[0.875rem] sm:inline-flex">
            {t.ui.download}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.ui.close : t.ui.menu}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 xl:hidden"
          >
            <Icon name={open ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-[4.75rem] bottom-3 z-40 overflow-y-auto rounded-4xl border border-white/10 bg-ink/95 p-6 text-white shadow-card backdrop-blur-2xl sm:inset-x-5 sm:top-24"
          >
            <nav aria-label={t.ui.mainNav} className="flex flex-col">
              {[...NAV, ...MORE].map(([k, p], i) => (
                <motion.div
                  key={k}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href(locale, p)}
                    aria-current={isActive(p) ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-white/10 py-4 text-[1.65rem] font-bold tracking-tight ${i >= NAV.length ? "text-white/60" : ""}`}
                  >
                    {t.nav[k]}
                    <Icon name="arrow" className="h-5 w-5 text-white/40" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <Link href={href(locale, "/app")} className="btn btn-primary w-full">
                {t.ui.openAccount}
              </Link>
              <Link href={href(other, pathname)} hrefLang={other} lang={other} className="btn btn-ghost-dark w-full">
                <Icon name="globe" className="h-4 w-4" />
                {other === "en" ? "English" : "Shqip"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
