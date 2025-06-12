/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de segurança
  async headers() {
    return [
      {
        // Aplicar headers de segurança a todas as rotas
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

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
        hostname: 'your-strapi-domain.com',
        pathname: '/uploads/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Configurações de build
  experimental: {
    optimizeCss: true,
  },

  // Configurações de performance
  compress: true,
  poweredByHeader: false,

  // Configurações de ambiente
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL || 'http://localhost:1337',
  },

  // Redirects de segurança
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/.env',
        destination: '/404',
        permanent: false,
      }
    ];
  }
};

module.exports = nextConfig;
