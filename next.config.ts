import type { NextConfig } from "next";
 
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'back.testwebapp.space',
      },
    ],
  },
};

module.exports = nextConfig;