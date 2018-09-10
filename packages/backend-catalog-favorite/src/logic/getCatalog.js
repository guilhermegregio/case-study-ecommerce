const getCatalog = (msg, done) => {
  done(null, [{sku: 'xpto', name: 'God of War', brand: 'xbox'}])
}

module.exports = getCatalog
