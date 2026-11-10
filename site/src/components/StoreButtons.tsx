import Image from "next/image";
import { SITE } from "@/lib/site";
import type { Dict } from "@/content";

export function StoreButtons({ t, className = "" }: { t: Dict; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={SITE.appStore} target="_blank" rel="noopener noreferrer" aria-label={t.ui.storeApple} className="transition hover:-translate-y-0.5 hover:opacity-90">
        <Image src="/img/App-store.png" alt="" width={179} height={74} className="h-[52px] w-auto" />
      </a>
      <a href={SITE.googlePlay} target="_blank" rel="noopener noreferrer" aria-label={t.ui.storeGoogle} className="transition hover:-translate-y-0.5 hover:opacity-90">
        <Image src="/img/google-play.png" alt="" width={179} height={74} className="h-[52px] w-auto" />
      </a>
    </div>
  );
}
