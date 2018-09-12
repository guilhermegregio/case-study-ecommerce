module.exports = {
  apps: [
    {
      name: 'backend-catalog-api',
      script: 'src/index.js',
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: 'backend-catalog-api',
        BASES1: 'backend-base:39999', 
      },
    },
  ],
}
