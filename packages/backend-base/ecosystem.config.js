module.exports = {
  apps: [
    {
      name: 'backend-base',
      script: 'src/index.js',
      instances: -1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '39999',
        HOST: 'backend-base',
        BASES1: `backend-base:39999`,
      },
    },
  ],
}
