const getCatalog = require('./logic/getCatalog')

module.exports = function hex(options) {
  this.add('role:catalog-favorite,cmd:list', getCatalog)
}
