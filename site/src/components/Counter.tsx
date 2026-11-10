"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** Counts up once when scrolled into view. Server-renders the final value. */
export function Counter({ value, suffix = "", locale = "sq" }: { value: number; suffix?: string; locale?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!reduce) {
      setN(0);
      setArmed(true);
    }
  }, [reduce]);

  useEffect(() => {
    if (!inView || !armed) return;
    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, armed, value]);

  const fmt = new Intl.NumberFormat(locale === "sq" ? "de-DE" : "en-US").format(n);
  return (
    <span ref={ref}>
      {fmt}
      {suffix}
    </span>
  );
}
