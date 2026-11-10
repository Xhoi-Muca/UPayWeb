import path from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [path.join(__dirname, "src/**/*.{ts,tsx}")],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0C1E4A", 2: "#12285E", 3: "#1D3A7C" },
        brand: { DEFAULT: "#0D5DD0", bright: "#2B7BFF", deep: "#0A3E94", soft: "#E8F0FD" },
        coral: "#F5735A",
        sand: { DEFAULT: "#F4F5F7", 2: "#E8EAEE" },
        petal: { magenta: "#C8348F", green: "#12B050", orange: "#FFA619", navy: "#2B2A7E", sky: "#6EC6F0" },
      },
      fontFamily: { sans: ["var(--font-satoshi)", "ui-sans-serif", "system-ui", "sans-serif"] },
      fontSize: {
        display: ["clamp(2.75rem, 6.2vw, 5.75rem)", { lineHeight: "0.94", letterSpacing: "-0.05em" }],
        h1: ["clamp(2.5rem, 5.6vw, 4.75rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        h2: ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        h3: ["clamp(1.375rem, 2vw, 1.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      borderRadius: { "4xl": "1.5rem", "5xl": "2rem" },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,.06) inset, 0 30px 60px -20px rgba(5,10,24,.45)",
        soft: "none",
        glow: "0 0 80px -10px rgba(43,123,255,.55)",
      },
      transitionTimingFunction: { out: "cubic-bezier(.16,1,.3,1)" },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { float: "float 7s ease-in-out infinite", marquee: "marquee 38s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
