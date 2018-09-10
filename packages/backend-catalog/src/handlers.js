const Promise = require('bluebird')
const getCatalog = require('./logic/getCatalog')

module.exports = function handlers(options) {
  const act = Promise.promisify(this.act, {context: this})

  this.add('role:catalog,cmd:list', getCatalog({act}))
}
