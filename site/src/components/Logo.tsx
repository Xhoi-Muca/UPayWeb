import Image from "next/image";

/** Official UPay logo asset (petal mark + white wordmark). Designed for dark backgrounds. */
export function Logo({ className = "h-9" }: { className?: string }) {
  return <Image src="/brand/LOGO-UPAY.png" alt="UPay" width={170} height={63} priority className={`w-auto ${className}`} />;
}
