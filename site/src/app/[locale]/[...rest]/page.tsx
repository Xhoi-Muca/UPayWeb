import { notFound } from "next/navigation";

/** Any unmatched URL under a locale renders the localized 404 page. */
export default function CatchAll() {
  notFound();
}
