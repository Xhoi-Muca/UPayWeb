"use client";

import { useRef } from "react";
import { PetalMark } from "./PetalMark";

type Props = { className?: string; blocked?: boolean; interactive?: boolean; label?: string };

/**
 * Original CSS/SVG rendering of the UPay debit card (blue card, white petal mark, debit, Mastercard),
 * modelled on the card shown in UPay's own press imagery. Tilts toward the pointer.
 */
export function CreditCard({ className = "", blocked = false, interactive = true, label = "UPay debit card" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || !interactive || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 14).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 18).toFixed(2)}deg`);
    el.style.setProperty("--sx", `${(x + 0.5) * 100}%`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div className={`[perspective:1200px] ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={ref}
        role="img"
        aria-label={label}
        className="relative aspect-[1.586] w-full overflow-hidden rounded-[6.5%/10.3%] shadow-[0_40px_80px_-20px_rgba(10,60,160,.7)] transition-[transform,filter] duration-300 ease-out [container-type:inline-size] [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
        style={{
          background: blocked
            ? "linear-gradient(135deg,#6b7280,#374151)"
            : "linear-gradient(135deg,#2f86ff 0%,#0d5dd0 48%,#0a3e94 100%)",
          filter: blocked ? "saturate(.2)" : undefined,
        }}
      >
        <PetalMark mono="rgba(255,255,255,.13)" className="absolute -left-[6%] top-[4%] h-[110%] w-[62%]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_var(--sx,30%)_0%,rgba(255,255,255,.28),transparent_55%)] mix-blend-soft-light" />
        <div className="absolute inset-x-[6%] top-[9%] flex items-start justify-between text-white">
          <span className="text-[4.4cqw] font-bold italic tracking-tight">UPay</span>
          <span className="text-[3cqw] font-medium opacity-80">debit</span>
        </div>
        {/* chip */}
        <div className="absolute left-[8%] top-[38%] h-[17%] w-[14%] rounded-[18%] bg-gradient-to-br from-[#f2e2a7] via-[#d9bb6a] to-[#b8964a]">
          <div className="absolute inset-[18%] rounded-[12%] border border-black/20" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-black/20" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
        </div>
        <svg viewBox="0 0 24 24" className="absolute left-[25%] top-[39%] h-[13%] w-[8%] text-white/85" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M8 6c3 3.500 3 8.500 0 12M12.500 4c4.500 5 4.500 11 0 16M17 2c6 6.500 6 13.500 0 20" />
        </svg>
        {/* Mastercard-style circles */}
        <div className="absolute bottom-[9%] right-[7%] flex">
          <span className="h-[8.4cqw] w-[8.4cqw] rounded-full bg-[#eb001b]" />
          <span className="-ml-[3.4cqw] h-[8.4cqw] w-[8.4cqw] rounded-full bg-[#f79e1b]/90" />
        </div>
      </div>
    </div>
  );
}
