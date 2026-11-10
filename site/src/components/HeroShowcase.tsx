"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Icon, type IconName } from "./Icon";

type Item = { icon: IconName; title: string; amount: string; positive?: boolean };

/**
 * Hero visual: a real photo of the app in hand, with in-app style notifications that arrive one after another.
 * The notifications are illustrative (amounts are examples). With reduced motion they stay as a static stack.
 */
export function HeroShowcase({ items, alt, note }: { items: Item[]; alt: string; note: string }) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const { scrollY } = useScroll();
  const lift = useTransform(scrollY, [0, 700], [0, -48]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((n) => n + 1), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  // newest notification on top; keep the last three visible
  const visible = reduce
    ? items.map((it, i) => ({ it, key: i }))
    : [tick, tick - 1, tick - 2].filter((n) => n >= 0).map((n) => ({ it: items[n % items.length], key: n }));

  return (
    <div className="relative mx-auto w-full max-w-[460px] self-end">
      <motion.div style={{ ...(reduce ? {} : { y: lift }), WebkitMaskImage: "linear-gradient(to bottom,#000 78%,transparent)", maskImage: "linear-gradient(to bottom,#000 78%,transparent)" }} initial={reduce ? false : { opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>
        <Image src="/img/hand-iphone-homepage.png" alt={alt} width={455} height={549} sizes="(min-width:1024px) 440px, 80vw" priority className="h-auto w-full" />
      </motion.div>

      <div className="pointer-events-none absolute -left-2 bottom-[16%] z-10 w-[min(290px,84%)] sm:-left-10 lg:-left-16" aria-hidden="true">
        <ul className="flex flex-col gap-2.5">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map(({ it, key }, i) => (
              <motion.li
                key={key}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: -24, scale: 0.96 }}
                animate={{ opacity: 1 - i * 0.18, y: 0, scale: 1 - i * 0.03 }}
                exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 text-ink sm:gap-3 sm:px-3.5 sm:py-3"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${it.positive ? "bg-petal-green/15 text-petal-green" : "bg-brand/10 text-brand"}`}>
                  <Icon name={it.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.92rem] font-bold">{it.title}</span>
                <span className={`text-[0.92rem] font-bold ${it.positive ? "text-emerald-600" : ""}`}>{it.amount}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <p className="mt-3 pl-1 text-[0.7rem] text-white/60">{note}</p>
      </div>
    </div>
  );
}
