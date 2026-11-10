const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowUp: "M7 17L17 7M8 7h9v9",
  check: "M5 12.5l4.5 4.5L19 7.5",
  plus: "M12 5v14M5 12h14",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  qr: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6l1-7z",
  bag: "M6 8h12l1 12H5L6 8zM9 8a3 3 0 0 1 6 0",
  gift: "M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7C10 7 7 6 8 4.5S11.500 5 12 7zM12 7c2 0 5-1 4-2.500S12.500 5 12 7z",
  list: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
  card: "M3 6h18v12H3zM3 10h18M6 15h4",
  send: "M4 12l16-8-6 16-3-7-7-1z",
  shield: "M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
  lock: "M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3",
  phone: "M7 3h10v18H7zM11 18h2",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  pin: "M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  menu: "M4 8h16M4 16h16",
  x: "M6 6l12 12M18 6L6 18",
  bell: "M6 16v-5a6 6 0 0 1 12 0v5l2 2H4l2-2zM10 21h4",
  store: "M4 9l1.500-5h13L20 9M4 9v11h16V9M4 9c0 2 3 2 4 0 1 2 3 2 4 0 1 2 3 2 4 0 1 2 4 2 4 0",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M21 20a6 6 0 0 0-4-5.600",
  coins: "M12 8c4.400 0 8-1.300 8-3s-3.600-3-8-3-8 1.300-8 3 3.600 3 8 3zM4 5v6c0 1.700 3.600 3 8 3s8-1.300 8-3V5M4 11v6c0 1.700 3.600 3 8 3s8-1.300 8-3v-6",
  play: "M8 5v14l11-7z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6", strokeWidth = 1.7 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
