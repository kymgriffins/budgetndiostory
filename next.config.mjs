/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
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
    optimizePackageImports: ["framer-motion", "gsap", "lucide-react"],
  },
};

export default nextConfig;
