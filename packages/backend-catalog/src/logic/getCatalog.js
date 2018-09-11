const Promise = require('bluebird')
const unionBy = require('lodash.unionby')
const omit = require('lodash.omit')
const pick = require('lodash.pick')
const find = require('lodash.find')

const getCatalog = ({act}) =>
  function(msg, done) {
    const actions = [
      {
        role: 'catalog-steam',
        cmd: 'list',
      },
      {
        role: 'catalog-xbox',
        cmd: 'list',
      },
      {
        role: 'catalog-psn',
        cmd: 'list',
      },
    ]

    const commands = actions.map(action => act(action))

    Promise.all(commands)
      .then(([steam, xbox, psn]) => {
        const games = [...steam, ...xbox, ...psn]

        const uniqGames = unionBy(games, 'title').map(game => {
          const brands = {}
          const findInSteam = find(steam, ['title', game.title])
          const findInXbox = find(xbox, ['title', game.title])
          const findInPsn = find(psn, ['title', game.title])

          brands['steam'] = findInSteam && pick(findInSteam, ['sku', 'price'])
          brands['xbox'] = findInXbox && pick(findInXbox, ['sku', 'price'])
          brands['psn'] = findInPsn && pick(findInPsn, ['sku', 'price'])

          return Object.assign({}, omit(game, ['sku', 'price']), {brands})
        })

        done(null, Object.values(uniqGames))
      })
      .catch(err => console.log(err))
  }

module.exports = getCatalog
