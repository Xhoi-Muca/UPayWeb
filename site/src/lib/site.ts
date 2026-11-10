export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://upay.al").replace(/\/$/, "");

/** All values below were taken from the live upay.al site (see UPAY_WEBSITE_AUDIT.md). */
export const SITE = {
  name: "UPay Albania",
  operator: "Union Financiar Tiranë sh.a.",
  nipt: "J62424002G",
  email: "sherbimiklientit@uft.al",
  phoneMobile: "+355689000200",
  phoneMobileLabel: "+355 68 9000 200",
  phoneLandline: "+35542234979",
  phoneLandlineLabel: "+355 4 2234 979",
  address: "Rr. “Ismail Qemali”, Nr. 32, Kati 3, Njësia Bashkiake Nr. 5, Tiranë, Shqipëri",
  parentUrl: "https://uft.al",
  appStore: "https://apps.apple.com/us/app/upay-albania/id1518207112",
  googlePlay: "https://play.google.com/store/apps/details?id=com.uft.emoney",
  videoUrl: "https://youtu.be/1n2WCHNeTFY",
  termsPdf: "/docs/TermatKushtet.pdf",
  /** Not found on the public site – left empty on purpose until confirmed by UPay. */
  webAppUrl: "",
  social: [] as { name: string; url: string }[],
} as const;
