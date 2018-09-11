module.exports = {
  apps: [
    {
      name: 'backend-catalog-psn',
      script: 'src/index.js',
      instances: -1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: 'backend-catalog-psn',
        BASES1: 'backend-base:39999', 
      },
    },
  ],
}
