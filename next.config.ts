import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['http://127.0.0.1:3000', '127.0.0.1:8000'],
  },
};

export default nextConfig;
