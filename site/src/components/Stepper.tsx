"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Step = { t: string; d: string };

/**
 * Step list. Uncontrolled: auto-advances (unless reduced motion / user clicked).
 * Controlled: pass `active` (e.g. driven by scroll) and the list simply reflects it.
 */
export function Stepper({ steps, tone = "light", active }: { steps: Step[]; tone?: "light" | "dark"; active?: number }) {
  const [i, setI] = useState(0);
  const [manual, setManual] = useState(false);
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  const controlled = active !== undefined;
  const cur = controlled ? active : i;

  useEffect(() => {
    if (controlled || reduce || manual) return;
    const id = setInterval(() => setI((v) => (v + 1) % steps.length), 3400);
    return () => clearInterval(id);
  }, [controlled, reduce, manual, steps.length]);

  return (
    <ol className="relative space-y-2">
      {steps.map((s, k) => {
        const on = k === cur;
        return (
          <li key={s.t}>
            <button
              type="button"
              aria-current={on ? "step" : undefined}
              onClick={() => {
                if (controlled) return;
                setManual(true);
                setI(k);
              }}
              className={`flex w-full items-start gap-4 rounded-3xl p-4 text-left transition duration-500 ${
                on ? (dark ? "bg-white/10" : "bg-white shadow-soft") : "opacity-50 hover:opacity-100"
              } ${controlled ? "cursor-default" : ""}`}
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition duration-500 ${on ? "scale-110 bg-brand text-white" : dark ? "bg-white/10" : "bg-ink/10"}`}>{k + 1}</span>
              <span>
                <span className="block text-[1.05rem] font-bold">{s.t}</span>
                <span className={`grid transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <span className={`overflow-hidden text-[0.95rem] ${dark ? "text-white/70" : "text-ink/65"}`}>
                    <span className="block pt-1">{s.d}</span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
