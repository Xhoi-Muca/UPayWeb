import { ImageResponse } from "next/og";

export const runtime = "edge";

/** Generates a branded Open Graph card. Title text comes from the query string and is only rendered as text. */
export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("t") ?? "UPay Albania").slice(0, 90);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "white", background: "linear-gradient(135deg,#050A18 0%,#0A3E94 60%,#0D5DD0 100%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 44, fontWeight: 800 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#C8348F", "#12B050", "#FFA619", "#6EC6F0", "#2B2A7E"].map((c) => (
              <div key={c} style={{ width: 16, height: 36, borderRadius: 10, background: c }} />
            ))}
          </div>
          UPay Albania
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        <div style={{ fontSize: 28, opacity: 0.7 }}>upay.al · Union Financiar Tiranë</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
