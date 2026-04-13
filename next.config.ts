import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reqres.in",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // เผื่ออนาคต
      },
      {
        protocol: "https",
        hostname: "**", // ❗ ถ้าจะเปิดทุกโดเมน (dev เท่านั้น)
      },
    ],
  },
};

export default nextConfig;