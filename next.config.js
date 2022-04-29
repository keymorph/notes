/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true, // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  webpack: (config) => {
    config.experiments = {topLevelAwait: true, layers: true};
    return config;
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
