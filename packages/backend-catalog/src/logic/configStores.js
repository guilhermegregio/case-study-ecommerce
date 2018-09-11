const stores = require('../config')

const configStores = ({act}) =>
  async function(msg, done) {
    stores.steam = msg.payload.steam
    stores.xbox = msg.payload.xbox
    stores.psn = msg.payload.psn

    done(null, stores)
  }

module.exports = configStores
