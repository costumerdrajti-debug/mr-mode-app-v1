import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile sanity packages for proper builds
  transpilePackages: ['sanity', '@sanity/vision', 'next-sanity'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
    qualities: [75, 90], // Add quality 90 support
  },
  // Fix for @sanity/client rxjs module resolution issue
  serverExternalPackages: ['@sanity/client'],

  async headers() {
    return [
      {
        // Apply X-Frame-Options to all routes EXCEPT studio
        source: '/((?!studio).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
