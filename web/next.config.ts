import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server (and its hot-reload websocket) accept requests from your
  // phone when testing over the LAN via `npm run dev -- -H 0.0.0.0`. Update this
  // if your machine's IP changes (check with `ipconfig`).
  allowedDevOrigins: ["192.168.1.167"],
  // Strict Mode double-mounts in dev, which breaks the rapier physics joints
  // in the Lanyard (badge drops off-screen). Disable it.
  reactStrictMode: false,
};

export default nextConfig;
