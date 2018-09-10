const getCatalog = require('./logic/getCatalog')

module.exports = function hex(options) {
  this.add('role:catalog-steam,cmd:list', getCatalog)
}
