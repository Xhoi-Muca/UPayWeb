"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PetalMark } from "./PetalMark";

export type HeroSlide = { key: string; disc?: string; eyebrow?: string; title: ReactNode; sub: string; actions: ReactNode; visual: ReactNode };

const DURATION = 7000;

/** Full-bleed product hero: each slide pairs a short message with one product visual. Auto-advances, pauses on hover/focus, and is fully keyboard operable. */
export function HeroCarousel({ slides, prev, next }: { slides: HeroSlide[]; prev: string; next: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(id);
  }, [i, paused, reduce, go]);

  const s = slides[i];
  const fade = reduce ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      className="relative isolate overflow-hidden bg-ink text-white"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container-x relative min-h-[min(100svh,54rem)] pb-24 pt-28 sm:pt-32">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${n}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={fade}
            className="grid items-center gap-8 lg:min-h-[calc(min(100svh,54rem)-13rem)] lg:grid-cols-2 lg:gap-6"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              {s.eyebrow && <p className="eyebrow mb-5 text-petal-sky">{s.eyebrow}</p>}
              <h1 className="text-balance text-[clamp(2.3rem,4.5vw,4rem)] font-bold leading-[1.03] tracking-tight">{s.title}</h1>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-white/70">{s.sub}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">{s.actions}</div>
            </motion.div>

            <div className="relative flex min-h-[340px] items-center justify-center lg:min-h-[520px]">
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(540px,96%)] -translate-x-1/2 -translate-y-1/2">
                <motion.div className="h-full w-full" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 120, ease: "linear", repeat: Infinity }}>
                  <PetalMark className="h-full w-full scale-90 overflow-visible" />
                </motion.div>
              </div>
              <div className="relative flex w-full items-end justify-center self-end">{s.visual}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-7 z-20">
          <div className="container-x flex items-center justify-between !px-0">
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Hero">
              {slides.map((x, k) => (
                <button
                  key={x.key}
                  type="button"
                  role="tab"
                  aria-selected={k === i}
                  aria-label={`${k + 1} / ${n}`}
                  onClick={() => setI(k)}
                  className="group grid h-6 place-items-center"
                >
                  <span className={`relative block h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-300 ${k === i ? "w-14" : "w-6 group-hover:bg-white/40"}`}>
                    {k === i && (
                      <motion.span
                        key={`${i}-${paused}`}
                        className="absolute inset-y-0 left-0 block rounded-full bg-white"
                        initial={{ width: reduce ? "100%" : "0%" }}
                        animate={{ width: "100%" }}
                        transition={reduce || paused ? { duration: 0 } : { duration: DURATION / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label={prev} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <button type="button" onClick={() => go(1)} aria-label={next} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
