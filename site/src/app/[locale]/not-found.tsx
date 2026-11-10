"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import sq from "@/content/sq";
import en from "@/content/en";

export default function NotFound() {
  const en_ = (usePathname() ?? "").startsWith("/en");
  const t = (en_ ? en : sq).notFound;
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-ink text-white">
      <div className="container-x relative py-40 text-center">
        <p className="text-[clamp(6rem,22vw,14rem)] font-bold leading-none tracking-tighter text-white/10">404</p>
        <h1 className="-mt-10 text-h1 font-bold">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">{t.text}</p>
        <Link href={en_ ? "/en" : "/"} className="btn btn-primary mt-8">{t.cta}</Link>
      </div>
    </section>
  );
}
