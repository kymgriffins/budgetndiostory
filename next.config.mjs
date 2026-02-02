/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year for static assets
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      {
        pathname: "/_next/static/media/.*",
        search: "^\\?.*",
      },
      {
        pathname: "/.*",
      },
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  experimental: {
    // Optimize package imports for better tree shaking
    optimizePackageImports: [
      "framer-motion",
      "gsap",
      "lucide-react",
      "lodash-es",
      "@radix-ui/react-icons",
    ],
    // CSS optimization is disabled due to critters dependency issues in Next.js canary
  },
  // Compression
  compress: true,
  // Power JIT compiler
  poweredByHeader: false,
  // Disable x-powered-by header for security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
