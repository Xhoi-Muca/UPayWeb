import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Dark page hero with ambient light. `aside` is the visual column. */
export function PageHero({ eyebrow, title, sub, actions, aside, tall }: { eyebrow: string; title: ReactNode; sub?: string; actions?: ReactNode; aside?: ReactNode; tall?: boolean }) {
  return (
    <section className={`relative isolate overflow-hidden bg-ink text-white ${tall ? "min-h-[100svh]" : ""}`}>
      <div className={`container-x grid items-center gap-12 pb-20 pt-36 sm:pt-44 ${aside ? "lg:grid-cols-[1.1fr_.9fr]" : ""} ${tall ? "min-h-[100svh]" : ""}`}>
        <div>
          <Reveal>
            <p className="eyebrow text-petal-sky"><span className="h-1.5 w-1.5 rounded-full bg-petal-sky" />{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance text-h1 font-bold sm:text-[length:clamp(2.6rem,5.6vw,5rem)]">{title}</h1>
          </Reveal>
          {sub && (
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">{sub}</p>
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>
            </Reveal>
          )}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, tone = "light", center }: { eyebrow?: string; title: string; sub?: string; tone?: "light" | "dark"; center?: boolean }) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow ${center ? "justify-center" : ""} ${dark ? "text-petal-sky" : "text-brand"}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={`mt-4 text-balance text-h2 font-bold ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className={`mt-5 text-pretty text-lg leading-relaxed ${dark ? "text-white/65" : "text-ink/65"}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({ children, tone = "light", className = "", id }: { children: ReactNode; tone?: "light" | "sand" | "dark" | "brand"; className?: string; id?: string }) {
  const bg = tone === "dark" ? "bg-ink text-white" : tone === "brand" ? "bg-brand text-white" : tone === "sand" ? "bg-sand-2" : "bg-sand";
  return (
    <section id={id} className={`relative overflow-hidden py-20 sm:py-28 ${bg} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Check({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${dark ? "bg-white/15 text-white" : "bg-brand/10 text-brand"}`}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.500l4.500 4.500L19 7.500" /></svg>
      </span>
      <span className={dark ? "text-white/85" : "text-ink/80"}>{children}</span>
    </li>
  );
}

export function FinalCta({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand py-24 text-center text-white sm:py-32">
      <div className="container-x">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance text-h1 font-bold">{title}</h2>
        </Reveal>
        {sub && (
          <Reveal delay={0.08}>
            <p className="mt-5 text-xl text-white/80">{sub}</p>
          </Reveal>
        )}
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
