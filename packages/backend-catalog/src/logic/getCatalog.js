const Promise = require('bluebird')

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
        done(null, [].concat(steam, xbox, psn))
      })
      .catch(err => console.log(err))
  }

module.exports = getCatalog
