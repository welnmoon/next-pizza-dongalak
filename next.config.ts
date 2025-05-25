import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dodostatic.net",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["cdn.dodostatic.net"],
  },
};

export default nextConfig;
