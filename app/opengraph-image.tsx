import { ImageResponse } from "next/og";

export const alt = "Daffa Bagus Maulana - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          position: "relative",
          overflow: "hidden",
          color: "#f8fafc",
          background:
            "linear-gradient(135deg, #0b1220 0%, #111c30 60%, #102b3b 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-110px",
            top: "-190px",
            width: "570px",
            height: "570px",
            borderRadius: "50%",
            border: "1px solid rgba(103, 232, 249, 0.24)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "-60px",
            width: "330px",
            height: "330px",
            borderRadius: "50%",
            background: "rgba(34, 211, 238, 0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#67e8f9",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "4px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#67e8f9",
              display: "flex",
            }}
          />
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "66px",
              fontWeight: 700,
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            Daffa Bagus Maulana
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "28px", lineHeight: 1.4 }}>
            Experience, projects &amp; ideas
          </div>
        </div>
        <div
          style={{
            width: "92px",
            height: "5px",
            borderRadius: "4px",
            background: "#67e8f9",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
