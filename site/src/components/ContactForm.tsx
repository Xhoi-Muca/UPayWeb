"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { href, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * There is no backend for this marketing site (and none was invented). The form validates input
 * and prepares an email to UPay Customer Care, the verified contact destination from upay.al.
 */
export function ContactForm({ t, locale }: { t: Dict; locale: Locale }) {
  const f = t.contact.form;
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = f.required;
    if (!email) next.email = f.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = f.invalidEmail;
    if (!message) next.message = f.required;
    else if (message.length < 10) next.message = f.tooShort;
    setErrors(next);
    if (Object.keys(next).length) return;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject || "UPay")}&body=${encodeURIComponent(body)}`;
    setDone(true);
  }

  const field = "w-full rounded-2xl border bg-white px-4 py-3.5 text-[1rem] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";
  const err = (k: keyof Errors) => (errors[k] ? "border-coral" : "border-ink/12");

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="form-note">
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-2 block text-sm font-bold">{f.name}</label>
          <input id="c-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} className={`${field} ${err("name")}`} />
          {errors.name && <p id="e-name" role="alert" className="mt-1.5 text-sm text-coral">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="mb-2 block text-sm font-bold">{f.email}</label>
          <input id="c-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} className={`${field} ${err("email")}`} />
          {errors.email && <p id="e-email" role="alert" className="mt-1.5 text-sm text-coral">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="c-subject" className="mb-2 block text-sm font-bold">{f.subject}</label>
        <input id="c-subject" name="subject" className={`${field} border-ink/12`} />
      </div>
      <div>
        <label htmlFor="c-message" className="mb-2 block text-sm font-bold">{f.message}</label>
        <textarea id="c-message" name="message" rows={6} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} className={`${field} ${err("message")} resize-y`} />
        {errors.message && <p id="e-message" role="alert" className="mt-1.5 text-sm text-coral">{errors.message}</p>}
      </div>
      <p id="form-note" className="text-[0.85rem] text-ink/55">
        {f.consent} <Link href={href(locale, "/legal/privacy")} className="underline underline-offset-2">{t.nav.privacy}</Link>. {f.mailNote}
      </p>
      <button type="submit" className="btn btn-primary">{f.send}</button>
      {done && <p role="status" className="rounded-2xl bg-brand-soft p-4 text-[0.95rem] text-brand-deep">{f.success}</p>}
    </form>
  );
}
