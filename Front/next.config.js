/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  experimental: {
    scrollRestoration: true,
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};
module.exports = nextConfig;
