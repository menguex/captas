import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0c1220 0%, #070b12 55%, #001a40 100%)",
          borderRadius: 36,
          border: "2px solid rgba(0, 122, 255, 0.4)",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.18)",
        }}
      >
        <span
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#eef4fc",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          C
          <span style={{ color: "#007aff" }}>.</span>
        </span>
        <span
          style={{
            marginTop: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#64d2ff",
            letterSpacing: "0.22em",
          }}
        >
          CAPTAS
        </span>
      </div>
    ),
    { ...size }
  );
}
