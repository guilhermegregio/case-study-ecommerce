module.exports = {
  apps: [
    {
      name: 'backend-catalog',
      script: 'src/index.js',
      instances: -1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        BASE_MESH: 'api',
        RGB_MESH: 'rgb',
        HEX_MESH: 'hex',
      },
    },
  ],
}
