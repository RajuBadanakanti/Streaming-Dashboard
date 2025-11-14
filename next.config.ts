import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow external images from TMDB
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },

  // turbopack settings
  turbopack: {},
};

export default nextConfig;
