import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict Mode double-mounts in dev, which breaks the rapier physics joints
  // in the Lanyard (badge drops off-screen). Disable it.
  reactStrictMode: false,
};

export default nextConfig;
