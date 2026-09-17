import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only. All current routes are static,
  // so export them as HTML during the production build.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // The repository is deployed as a project page at /CHUNG-UEN/.
  // Keep local development at / and set NEXT_PUBLIC_BASE_PATH in CI.
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};

export default nextConfig;
