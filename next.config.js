/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: false, // Disabled for now because of framer motion not working on react 18 with strict mode enabled
  webpack: (config) => {
    config.experiments = { topLevelAwait: true, layers: true };
    return config;
  },
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
