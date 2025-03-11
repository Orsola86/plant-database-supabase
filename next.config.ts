import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "placehold.co",
        protocol: "https",
      },
      {
        hostname: "picsum.photos",
        protocol: "https",
      },
      {
        hostname: "whadivgijksxiaqqmnle.supabase.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
