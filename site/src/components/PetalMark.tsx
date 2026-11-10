/** Original vector recreation of the five-petal UPay mark (colours from the live brand assets). */
export function PetalMark({ className = "h-10 w-10", mono }: { className?: string; mono?: string }) {
  const c = (hex: string) => mono ?? hex;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <ellipse cx="62" cy="22" rx="11" ry="17" transform="rotate(28 62 22)" fill={c("#12B050")} />
      <ellipse cx="25" cy="40" rx="20" ry="9.500" transform="rotate(8 25 40)" fill={c("#C8348F")} />
      <ellipse cx="82" cy="45" rx="19" ry="8.500" transform="rotate(-10 82 45)" fill={c("#FFA619")} />
      <path d="M33 56c11-4 17 3 14 16-3 12-13 22-22 22-10 0-9-13-3-24 3-6 6-11 11-14z" fill={c("#2B2A7E")} />
      <path d="M57 56c9 1 13 12 12 24-1 9-8 15-13 12-6-3-6-13-4-22 1-8 2-14 5-14z" fill={c("#6EC6F0")} />
    </svg>
  );
}
