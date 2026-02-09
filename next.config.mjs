/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  // SEO: Proper site URL
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://budgetndiostory.org",

  // Enable experimental features for performance
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "gsap"],
  },

  // CDN Configuration for static assets
  // Using Vercel's edge network (default), but can configure additional CDN domains
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // CDN domains for images (if using external CDN)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "**.cdn.cloudflare.com",
      },
      {
        protocol: "https",
        hostname: "**.imgix.net",
      },
    ],
  },

  // Optimize fonts - prevents CLS and improves loading
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable compression
  compress: true,

  // Power by Vercel's Edge Network (CDN enabled by default)
  // Static files are automatically served from CDN

  // SEO: Security headers
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
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate",
          },
        ],
      },
    ];
  },

  // SEO: Redirects for canonical URLs
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
