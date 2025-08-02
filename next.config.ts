import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['5771cdcdff69.ngrok-free.app', '*.ngrok-free.app'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
