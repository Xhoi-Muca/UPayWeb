// Turns this project into a static demo that GitHub Pages can host.
// Run ONLY in CI (or on a throw-away copy): it edits and deletes files in the current folder.
//
// Why: GitHub Pages serves plain files and cannot run Node. The real site uses middleware (language
// rewrite + old-URL redirects) and an image-generating API route, which a static host cannot run.
// In the demo, Albanian lives at /sq/ and English at /en/, the old-URL redirects are not active,
// and search engines are told not to index it.
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const edit = (file, fn) => {
  if (!existsSync(file)) throw new Error(`Missing ${file}`);
  const before = readFileSync(file, "utf8");
  const after = fn(before);
  if (after === before) throw new Error(`No change made to ${file} (the code it patches has moved)`);
  writeFileSync(file, after);
};

// 1. Things a static host cannot run.
for (const p of ["src/middleware.ts", "src/app/api", "src/app/robots.ts", "src/app/sitemap.ts", "src/app/[locale]/[...rest]"]) {
  rmSync(p, { recursive: true, force: true });
}

// 2. Links: always include the language prefix (there is no rewrite from / to /sq).
edit("src/lib/i18n.ts", (s) =>
  s.replace(/return locale === defaultLocale \? clean \|\| "\/" : `\/en\$\{clean\}`;/, "return `/${locale}${clean}`;"),
);

// 3. No generated social image; ask search engines not to index the demo.
edit("src/lib/seo.ts", (s) =>
  s.replace(/const og = image \? SITE_URL \+ image : `[^`]*`;/, 'const og = SITE_URL + (image ?? "/brand/cropped-LOGO-UPAY.png");'),
);
edit("src/app/[locale]/layout.tsx", (s) => s.replace("robots: { index: true, follow: true }", "robots: { index: false, follow: false }"));

// 4. The terms PDF link is a plain <a>, so it needs the base path by hand.
edit("src/lib/site.ts", (s) =>
  s.replace('termsPdf: "/docs/TermatKushtet.pdf"', 'termsPdf: (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/docs/TermatKushtet.pdf"'),
);

// 5. Static export config. Images use a custom loader so the base path (/UPayWeb) is added.
writeFileSync(
  "next.config.mjs",
  `const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export default {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  images: { loader: "custom", loaderFile: "./image-loader.js" },
};
`,
);
writeFileSync("image-loader.js", `export default function loader({ src }) {\n  return (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + src;\n}\n`);

console.log("Static demo prepared.");
