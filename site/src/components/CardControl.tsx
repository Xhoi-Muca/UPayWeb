"use client";

import { useState } from "react";
import { CreditCard } from "./CreditCard";

/** Interactive illustration of blocking/activating the card in the app. Purely visual: no real card is affected. */
export function CardControl({ labels }: { labels: { open: string; blocked: string; card: string } }) {
  const [blocked, setBlocked] = useState(false);
  return (
    <div className="flex flex-col items-center gap-8">
      <CreditCard blocked={blocked} label={labels.card} className="w-full max-w-[460px]" />
      <button
        type="button"
        role="switch"
        aria-checked={blocked}
        onClick={() => setBlocked((b) => !b)}
        className="glass flex items-center gap-4 rounded-full py-2 pl-5 pr-2 text-white transition hover:bg-white/10"
      >
        <span className="min-w-20 text-left text-sm font-bold">{blocked ? labels.blocked : labels.open}</span>
        <span className={`relative h-9 w-16 rounded-full transition duration-300 ${blocked ? "bg-coral" : "bg-petal-green"}`}>
          <span className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow transition-all duration-300 ${blocked ? "left-1" : "left-[2.15rem]"}`} />
        </span>
      </button>
    </div>
  );
}
