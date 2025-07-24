/**@type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Disable server components if not needed
  reactStrictMode: true,
};

module.exports = nextConfig;