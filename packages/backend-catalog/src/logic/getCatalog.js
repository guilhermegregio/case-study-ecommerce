const Promise = require('bluebird')
const unionBy = require('lodash.unionby')
const omit = require('lodash.omit')
const pick = require('lodash.pick')
const find = require('lodash.find')

const getCatalog = ({act}) =>
  async function(msg, done) {
    const enablesStores = ['steam', 'xbox', 'psn']
    const pickFields = ['sku', 'price']

    const actions = enablesStores.map(store => ({
      role: `catalog-${store}`,
      cmd: 'list',
    }))

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
  }

module.exports = getCatalog
