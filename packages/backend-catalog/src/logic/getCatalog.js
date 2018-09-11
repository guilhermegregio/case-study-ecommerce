const Promise = require('bluebird')
const unionBy = require('lodash.unionby')
const omit = require('lodash.omit')
const pick = require('lodash.pick')
const find = require('lodash.find')
const esClient = require('../infrastructure/elasticsearch')

const getCatalog = ({act}) =>
  async function(msg, done) {
    const enablesStores = ['steam', 'xbox', 'psn']

    const filterStores = enablesStores.map(store => ({
      term: {'brands.stores': store},
    }))

    const actions = enablesStores.map(store => ({
      role: `catalog-${store}`,
      cmd: 'list',
    }))

    const result = await esClient.cat.indices()

    if (!result) {
      const pickFields = ['sku', 'price']
      const commands = actions.map(action => act(action))

      const [steam, xbox, psn] = await Promise.all(commands)

      const games = [...steam, ...xbox, ...psn]

      const uniqGames = unionBy(games, 'title').map(game => {
        const brands = {stores: []}
        const findInSteam = find(steam, ['title', game.title])
        const findInXbox = find(xbox, ['title', game.title])
        const findInPsn = find(psn, ['title', game.title])

        if (findInSteam) {
          brands.stores.push('steam')
          brands['steam'] = pick(findInSteam, pickFields)
        }

        if (findInXbox) {
          brands.stores.push('xbox')
          brands['xbox'] = pick(findInXbox, pickFields)
        }

        if (findInPsn) {
          brands.stores.push('psn')
          brands['psn'] = pick(findInPsn, pickFields)
        }

        return Object.assign({}, omit(game, pickFields), {brands})
      })

      done(null, Object.values(uniqGames))

      uniqGames.forEach(game => {
        esClient.create({
          index: 'catalog',
          type: 'catalog',
          id: game.title,
          body: game,
        })
      })
    } else {
      const result = await esClient.search({
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
    }
  }

module.exports = getCatalog
