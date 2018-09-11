const client = require('../infrastructure/elasticsearch')

const createIndeces = ({act}) =>
  async function(msg, done) {
    const enablesStores = ['steam', 'xbox', 'psn']

    const filterStores = enablesStores.map(store => ({
      term: {'brands.stores': store},
    }))

    const {hasIndices} = await act({role: 'catalog', cmd: 'verifyIndices'})

    if (hasIndices) {
      const result = await client.search({
        index: 'catalog',
        body: {
          query: {
            bool: {
              should: filterStores,
            },
          },
        },
      })

      const games = result.hits.hits.map(r => r._source)
      done(null, Object.values(games))
      return
    }

    const list = await act({
      role: 'catalog',
      cmd: 'list',
    })

    list.forEach(game => {
      client.create({
        index: 'catalog',
        type: 'catalog',
        id: game.title,
        body: game,
      })
    })

    done(null, list)
  }

module.exports = createIndeces
