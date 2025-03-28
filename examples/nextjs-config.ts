import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Prevent source map issues with external libraries
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Add any specific aliases if needed
      };
    }

    // Fix source map loading
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
    });

    return config;
  },
  // Disable source maps in production to avoid this issue entirely
  productionBrowserSourceMaps: false,
};

export default nextConfig;