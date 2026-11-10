"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/site";

/** Sends Android and iOS visitors straight to the matching store listing (same behaviour as the old /App page). */
export function StoreRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (/windows phone/i.test(ua)) return;
    if (/android/i.test(ua)) window.location.replace(SITE.googlePlay);
    else if (/iPad|iPhone|iPod/.test(ua)) window.location.replace(SITE.appStore);
  }, []);
  return null;
}
