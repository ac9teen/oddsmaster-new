/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/newsletter',
        destination: 'https://oddsmaster-newsletter.vercel.app/newsletter',
      },
      {
        source: '/newsletter/:path*',
        destination: 'https://oddsmaster-newsletter.vercel.app/newsletter/:path*',
      },
    ]
  },
};

module.exports = nextConfig;
