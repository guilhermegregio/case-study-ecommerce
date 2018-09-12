const Promise = require('bluebird')
const {subscribe} = require('./infrastructure/nsq')
const getCatalog = require('./logic/getCatalog')
const verifyIndices = require('./logic/verifyIndices')
const createIndeces = require('./logic/createIndeces')
const configStores = require('./logic/configStores')

module.exports = function handlers(options) {
  const act = Promise.promisify(this.act, {context: this})

  subscribe({
    topic: 'app_config_stores',
    onMessage: message => {
      act({
        role: 'catalog',
        cmd: 'configStores',
        payload: message,
      })
    },
  })

  this.add('role:catalog,cmd:list', getCatalog({act}))
  this.add('role:catalog,cmd:verifyIndices', verifyIndices({act}))
  this.add('role:catalog,cmd:getGamesAndCreateIndices', createIndeces({act}))
  this.add('role:catalog,cmd:configStores', configStores({act}))
}
