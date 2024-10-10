/**
 * Next.js Configuration File for Fitness Tracker MVP

 * This file is responsible for configuring Next.js for optimal
 * performance, build processes, and runtime environment. 
 * 
 * It includes configurations for:
 *  - Server-side rendering (SSR)
 *  - Image optimization
 *  - Build-time optimizations
 *  - Environment variables
 *  - Static asset handling
 *  - API routes
 *  - Deployment configurations
 * 
 * This configuration is designed for a fast-paced MVP development
 * cycle, emphasizing speed and efficiency without compromising
 * quality and maintainability.
 */

const { withSentryConfig } = require('@sentry/nextjs');
const { withAuth } = require('next-auth/middleware');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['res.cloudinary.com', 'media.graphcms.com'],
    unoptimized: true
  },
  experimental: {
    appDir: true,
    serverActions: true,
    typedRoutes: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      }
    ];
  }
};

// Integrate Sentry for error tracking
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin.
  silent: true // Suppresses all logs
};

module.exports = withSentryConfig(withAuth(nextConfig), sentryWebpackPluginOptions);