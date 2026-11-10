import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { href, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { Icon, type IconName } from "@/components/Icon";
import { StoreButtons } from "@/components/StoreButtons";
import { JsonLd } from "@/components/JsonLd";
import { FinalCta, PageHero, Section, SectionHead } from "@/components/ui";

type P = { params: { locale: Locale } };
const ic: IconName[] = ["bolt", "check", "shield"];

export function generateMetadata({ params }: P): Metadata {
  const t = getDict(params.locale);
  return buildMetadata({ locale: params.locale, path: "/transfers", ...t.transfers.meta });
}

export default function TransfersPage({ params }: P) {
  const locale = params.locale;
  const t = getDict(locale);
  const x = t.transfers;
  return (
    <>
      <PageHero
        eyebrow={x.hero.eyebrow}
        title={x.hero.title}
        sub={x.hero.sub}
        actions={<><a href={SITE.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><Icon name="play" className="h-4 w-4" />{x.video}</a><Link href={href(locale, "/fees#wu")} className="btn btn-ghost-dark">{x.fees}</Link></>}
        aside={
          <Parallax speed={24}>
            <Image src="/img/hand-iphone-homepage.png" alt={t.ui.illustrative} width={455} height={549} priority sizes="420px" className="mx-auto h-auto w-full max-w-[400px] drop-shadow-[0_30px_60px_rgba(0,0,0,.5)]" />
          </Parallax>
        }
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {x.pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.07} className="rounded-4xl bg-white p-8 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ffc700] text-ink"><Icon name={ic[i]} /></span>
              <h2 className="mt-6 text-h3 font-bold">{p.t}</h2>
              <p className="mt-2 text-ink/65">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead title={x.send.title} />
            <ol className="mt-10 space-y-5">
              {x.send.steps.map((s, i) => (
                <Reveal as="li" key={s} delay={i * 0.06} className="flex items-center gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink font-bold text-white">{i + 1}</span>
                  <span className="text-lg font-bold">{s}</span>
                </Reveal>
              ))}
            </ol>
            <p className="mt-8 max-w-lg text-ink/65">{x.send.note}</p>
          </div>
          <Reveal className="self-center rounded-5xl bg-ink p-10 text-white">
            <Icon name="send" className="h-10 w-10 text-[#ffc700]" />
            <h2 className="mt-6 text-h2 font-bold">{x.receive.title}</h2>
            <p className="mt-4 text-white/70">{x.receive.text}</p>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm text-white/50">{x.agent}</p>
          </Reveal>
        </div>
      </Section>

      <FinalCta title={t.home.final.title} sub={t.home.final.sub}><StoreButtons t={t} /></FinalCta>
      <JsonLd data={breadcrumbLd(locale, [[t.ui.home, "/"], [t.nav.transfers, "/transfers"]])} />
    </>
  );
}
