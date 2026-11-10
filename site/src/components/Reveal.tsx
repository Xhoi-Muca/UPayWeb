"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" };

/** Fade-and-rise on scroll. Renders static content when the user prefers reduced motion. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}
