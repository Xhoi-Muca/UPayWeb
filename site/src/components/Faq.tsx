"use client";

import { useId, useState } from "react";
import { Icon } from "./Icon";

export type FaqItem = { q: string; a: string };

export function Faq({ items, tone = "light" }: { items: FaqItem[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const dark = tone === "dark";
  return (
    <div className={`divide-y ${dark ? "divide-white/10 border-y border-white/10" : "divide-ink/10 border-y border-ink/10"}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
                id={`${base}-b${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.1rem] font-bold tracking-tight sm:text-[1.2rem]"
              >
                <span>{it.q}</span>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${dark ? "bg-white/10 group-hover:bg-white/20" : "bg-ink/5 group-hover:bg-ink/10"} ${isOpen ? "rotate-45" : ""}`}>
                  <Icon name="plus" className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </button>
            </h3>
            <div id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-b${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className={`max-w-3xl pb-7 leading-relaxed ${dark ? "text-white/70" : "text-ink/70"}`}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
