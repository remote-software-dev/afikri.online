import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Afikri - Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#2563eb",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 80,
            fontWeight: 700,
            fontFamily: "sans-serif",
            lineHeight: 1.2,
          }}
        >
          Afikri
        </div>
        <div
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: 400,
            fontFamily: "sans-serif",
            marginTop: 16,
            opacity: 0.9,
          }}
        >
          Full-Stack Developer
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
