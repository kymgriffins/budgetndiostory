/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/_next/static/media/.*',
        search: '^\\?.*',
      },
      {
        pathname: '/.*',
      },
    ],
  },
};

export default nextConfig;
