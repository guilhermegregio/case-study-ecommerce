const Promise = require('bluebird')
const elasticsearch = require('elasticsearch')
const getCatalog = require('./logic/getCatalog')

module.exports = function handlers(options) {
  const act = Promise.promisify(this.act, {context: this})

  const esClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error',
  })

  this.add('role:catalog,cmd:list', getCatalog({act, esClient}))
}
