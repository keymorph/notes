/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 120,
  webpack: (config) => {
    config.experiments = { topLevelAwait: true, layers: true };
    return config;
  },
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
