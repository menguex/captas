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
          background: "linear-gradient(145deg, #171c24 0%, #0f1218 100%)",
          borderRadius: 8,
          border: "1px solid rgba(61, 85, 108, 0.4)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#eae8e4",
            letterSpacing: "-0.04em",
          }}
        >
          C
          <span style={{ color: "#3d556c" }}>.</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
