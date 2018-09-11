module.exports = {
  apps: [
    {
      name: 'backend-catalog-favorite',
      script: 'src/index.js',
      instances: -1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: 'backend-catalog-favorite',
        BASES1: 'backend-base:39999', 
      },
    },
  ],
}
