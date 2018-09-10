const getCatalog = require('./logic/getCatalog')

module.exports = function hex(options) {
  this.add('role:catalog-xbox,cmd:list', getCatalog)
}
