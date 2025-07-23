import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    backendHost: process.env.BACKEND_HOST
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  }
};

export default nextConfig;
