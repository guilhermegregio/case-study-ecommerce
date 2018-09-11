const Promise = require('bluebird')
const {subscribe, publish} = require('./infrastructure/nsq')
const getCatalog = require('./logic/getCatalog')

module.exports = function handlers(options) {
  const act = Promise.promisify(this.act, {context: this})

  subscribe({
    topic: 'app_reindices',
    onMessage: message => {
      console.log('aki', message, message.status)
    },
  })

  publish({topic: 'app_reindices', message: {status: 'ok1'}})

  this.add('role:catalog,cmd:list', getCatalog({act}))
}
