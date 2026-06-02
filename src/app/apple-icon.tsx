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
          background: "linear-gradient(160deg, #171c24 0%, #0f1218 55%, #283d4f 100%)",
          borderRadius: 36,
          border: "2px solid rgba(61, 85, 108, 0.45)",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.18)",
        }}
      >
        <span
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#eae8e4",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          C
          <span style={{ color: "#3d556c" }}>.</span>
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
