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
        hostname: "i.pravatar.cc", 
      },
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
};

export default nextConfig;
