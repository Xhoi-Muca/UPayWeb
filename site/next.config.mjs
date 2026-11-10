/** Old upay.al (WordPress) URLs -> new structure. Albanian is the default locale (no prefix). */
const redirects = [
  ["/karta", "/card"],
  ["/blerje-online-me-te-sigurta", "/card"],
  ["/pagesa-utilitare", "/payments#utilities"],
  ["/upay-bonus", "/rewards"],
  ["/dergo-dhe-terhiq-para-me-western-union-direkt-nga-telefoni", "/transfers"],
  ["/upay-business", "/business"],
  ["/contact", "/contact"],
  ["/privacy-policy", "/legal/privacy"],
  ["/tarifa.html", "/fees"],
  ["/category/media", "/news"],
  ["/per-here-te-pare-ne-shqiperi-transferta-nderkombetare-parash-direkt-nga-celulari-permes-upay", "/news/per-here-te-pare-ne-shqiperi-transferta-nderkombetare-parash-direkt-nga-celulari-permes-upay"],
  ["/union-financiar-tirane-kryen-transaksionet-e-para-nepermjet-open-banking-2", "/news/union-financiar-tirane-kryen-transaksionet-e-para-nepermjet-open-banking-2"],
  ["/union-financiar-tirane-prezanton-karten-upay-nje-epoke-e-re-per-financat-personale", "/news/union-financiar-tirane-prezanton-karten-upay-nje-epoke-e-re-per-financat-personale"],
  ["/TermatKushtet.pdf", "/docs/TermatKushtet.pdf"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return redirects
      .filter(([from, to]) => from !== to)
      .flatMap(([from, to]) => [
        { source: from, destination: to, permanent: true },
        { source: `${from}/`, destination: to, permanent: true },
      ]);
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};
export default nextConfig;
