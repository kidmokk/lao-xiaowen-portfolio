import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves static assets. vinext supports the Next.js static
  // export contract and emits HTML/JSON for every App Router route.
  output: "export",
};

export default nextConfig;
