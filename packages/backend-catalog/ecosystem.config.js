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
        HOST: 'backend-catalog',
        BASES1: 'backend-base:39999',
        ELASTIC_HOST: 'elasticsearch',
        ELASTIC_PORT: '9200',
        LOOKUPD: 'nsqlookupd:4161',
      },
    },
  ],
}
