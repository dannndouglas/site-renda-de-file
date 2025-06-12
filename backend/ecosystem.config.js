module.exports = {
  apps: [
    {
      name: 'strapi-renda-de-file',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        DATABASE_CLIENT: 'postgres',
        DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
        DATABASE_PORT: process.env.DATABASE_PORT || 5432,
        DATABASE_NAME: process.env.DATABASE_NAME || 'strapi',
        DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'strapi',
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
        JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret',
        ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET || 'your-admin-jwt-secret',
        APP_KEYS: process.env.APP_KEYS || 'your-app-keys',
        API_TOKEN_SALT: process.env.API_TOKEN_SALT || 'your-api-token-salt',
        TRANSFER_TOKEN_SALT: process.env.TRANSFER_TOKEN_SALT || 'your-transfer-token-salt',
        HOST: process.env.HOST || '0.0.0.0',
        PORT: process.env.PORT || 1337,
      }
    }
  ]
};
