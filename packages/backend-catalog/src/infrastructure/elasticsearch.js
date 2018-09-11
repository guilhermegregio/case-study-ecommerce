const elasticsearch = require('elasticsearch')

const HOST = process.env.ELASTIC_HOST || 'localhost'
const PORT = process.env.ELASTIC_PORT || 9200

const client = new elasticsearch.Client({
  host: `${HOST}:${PORT}`,
  log: 'error',
})

module.exports = client
