import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { Dict } from "@/content";

/** Generic phone frame. Contents scale with the frame width through container-query units (cqw). */
export function PhoneFrame({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`relative aspect-[9/19] w-full rounded-[13%/6.2%] bg-[#0b0f1a] p-[2.6%] shadow-[0_0_0_1.5px_#2a3350_inset,0_50px_90px_-25px_rgba(0,0,0,.7)] [container-type:inline-size] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[11%/5.2%] bg-[#f4f6fb] text-ink">
        {children}
        <div className="absolute left-1/2 top-[1.6%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-[#0b0f1a]" />
      </div>
    </div>
  );
}

/** Illustrative recreation of the UPay wallet home screen. All amounts are examples. */
export function HomeScreen({ t }: { t: Dict }) {
  const p = t.home.hero.phone;
  const rows = [
    { n: p.item1, v: "-3.240", c: "#0d5dd0", i: "bolt" as const },
    { n: p.item2, v: "+120", c: "#12b050", i: "gift" as const },
    { n: p.item3, v: "+10.000", c: "#ffa619", i: "coins" as const },
  ];
  return (
    <div className="flex h-full flex-col px-[6%] pb-[3%] pt-[9%] text-[3.7cqw]">
      <div className="flex items-center justify-between text-[3cqw] font-bold">
        <span>9:41</span>
        <span className="opacity-60">UPay</span>
      </div>
      <p className="mt-[5%] text-[3.2cqw] font-medium text-ink/50">{p.greeting}</p>
      <div className="mt-[2%] rounded-[6cqw] bg-gradient-to-br from-[#2b7bff] to-[#0a3e94] p-[5%] text-white shadow-lg">
        <p className="text-[3cqw] opacity-75">{p.balance}</p>
        <p className="mt-[1%] text-[8.2cqw] font-bold leading-none tracking-tight">24.500<span className="ml-1 text-[3.6cqw] font-medium opacity-80">Lekë</span></p>
        <div className="mt-[7%] grid grid-cols-3 gap-[3%] text-[2.9cqw] font-bold">
          {[p.topUp, p.transfer, p.pay].map((b) => (
            <span key={b} className="rounded-full bg-white/18 py-[7%] text-center backdrop-blur">{b}</span>
          ))}
        </div>
      </div>
      <div className="mt-[4%] flex items-center gap-[4%] rounded-[5cqw] bg-white p-[4%] shadow-sm">
        <span className="grid h-[10cqw] w-[10cqw] place-items-center rounded-full bg-[#12b050]/15 text-[#12b050]"><Icon name="gift" className="h-[5.5cqw] w-[5.5cqw]" /></span>
        <div className="flex-1">
          <p className="text-[3.4cqw] font-bold">{p.bonus}</p>
          <div className="mt-[3%] h-[1.4cqw] overflow-hidden rounded-full bg-ink/10"><div className="h-full w-[60%] rounded-full bg-[#12b050]" /></div>
        </div>
        <span className="text-[3.2cqw] font-bold">300<span className="font-medium text-ink/45"> / 500</span></span>
      </div>
      <p className="mt-[4%] text-[3cqw] font-bold text-ink/45">{p.recent}</p>
      <ul className="mt-[2%] space-y-[2.4%]">
        {rows.map((r) => (
          <li key={r.n} className="flex items-center gap-[3.5%] rounded-[4cqw] bg-white px-[4%] py-[3%] shadow-sm">
            <span className="grid h-[8cqw] w-[8cqw] place-items-center rounded-full text-white" style={{ background: r.c }}><Icon name={r.i} className="h-[4.4cqw] w-[4.4cqw]" /></span>
            <span className="flex-1 text-[3.2cqw] font-bold">{r.n}</span>
            <span className="text-[3.2cqw] font-bold" style={{ color: r.v.startsWith("+") ? "#0f9d58" : "#0b1226" }}>{r.v}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex justify-around rounded-full bg-white py-[3.4%] text-ink/40 shadow-sm">
        <Icon name="card" className="h-[5.6cqw] w-[5.6cqw] text-brand" />
        <Icon name="qr" className="h-[5.6cqw] w-[5.6cqw]" />
        <Icon name="list" className="h-[5.6cqw] w-[5.6cqw]" />
        <Icon name="users" className="h-[5.6cqw] w-[5.6cqw]" />
      </div>
    </div>
  );
}

/** Deterministic QR-style pattern. Decorative only, not scannable. */
export function QrArt({ className = "" }: { className?: string }) {
  const n = 25;
  const cells: boolean[] = [];
  let s = 7;
  for (let i = 0; i < n * n; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    cells.push((s >> 8) % 100 < 48);
  }
  const finder = (x: number, y: number) => (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
  const rects: React.ReactNode[] = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) if (!finder(x, y) && cells[y * n + x]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" rx=".18" />);
  const fp = (x: number, y: number) => (
    <g key={`f${x}${y}`} transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" rx="1.4" />
      <rect x="1" y="1" width="5" height="5" rx="1" fill="#fff" />
      <rect x="2" y="2" width="3" height="3" rx=".6" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className={className} fill="currentColor" aria-hidden="true">
      {rects}
      {fp(0, 0)}
      {fp(n - 7, 0)}
      {fp(0, n - 7)}
    </svg>
  );
}

export function QrScreen({ t }: { t: Dict }) {
  return (
    <div className="flex h-full flex-col items-center bg-gradient-to-b from-brand-bright via-brand to-[#0a3e94] px-[7%] pt-[11%] text-white">
      <Icon name="qr" className="h-[11cqw] w-[11cqw]" />
      <p className="mt-[3%] text-[4.4cqw] font-bold">{t.home.qr.title}</p>
      <div className="mt-[7%] w-full rounded-[7cqw] bg-white p-[8%] text-ink shadow-xl">
        <QrArt className="w-full" />
      </div>
      <p className="mt-[8%] text-[9cqw] font-bold leading-none">20<span className="text-[5cqw]"> Lekë</span></p>
    </div>
  );
}
