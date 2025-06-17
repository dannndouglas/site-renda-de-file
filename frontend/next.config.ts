import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // Configurações de imagem
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.herokuapp.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.render.com',
        pathname: '/uploads/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Configurações de ambiente
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },

  // Configurações de performance
  compress: true,
  poweredByHeader: false,

  // Configurações experimentais
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
