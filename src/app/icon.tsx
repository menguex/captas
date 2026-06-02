import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0c1220 0%, #070b12 100%)",
          borderRadius: 8,
          border: "1px solid rgba(0, 122, 255, 0.35)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#eef4fc",
            letterSpacing: "-0.04em",
          }}
        >
          C
          <span style={{ color: "#007aff" }}>.</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
