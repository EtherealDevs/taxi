import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nelsonoliveraviajes.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
