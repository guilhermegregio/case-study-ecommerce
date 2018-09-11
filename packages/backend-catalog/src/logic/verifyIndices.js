const esClient = require('../infrastructure/elasticsearch')

const verifyIndices = ({act}) =>
  async function(msg, done) {
    const result = await esClient.cat.indices()

    done(null, {hasIndices: !!result})
  }

module.exports = verifyIndices
