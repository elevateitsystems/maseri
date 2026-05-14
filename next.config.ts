import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "back.testwebapp.space",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
