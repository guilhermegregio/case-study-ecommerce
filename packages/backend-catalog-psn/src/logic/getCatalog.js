const db = require('../db/mockDb')

const getCatalog = (msg, done) => {
  done(null, db)
}

module.exports = getCatalog
