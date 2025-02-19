import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["api.nelsonoliveraviajes.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nelsonoliveraviajes.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
