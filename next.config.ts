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
        hostname: "mksnyxrqseeyxxfxcgnx.supabase.co",
        protocol: "https",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
