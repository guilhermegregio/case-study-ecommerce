const nsq = require('nsqjs')

function subscribe(options) {
  const defaultOptions = Object.assign(
    {
      onMessage: function() {},
      topic: 'sample_topic',
      channel: 'test_channel',
      lookupd: '127.0.0.1:4161',
    },
    options,
  )

  const {topic, channel, lookupd, onMessage} = defaultOptions

  const reader = new nsq.Reader(topic, channel, {
    lookupdHTTPAddresses: lookupd,
  })

  reader.connect()

  reader.on('message', msg => {
    let message = msg.body.toString()
    try {
      message = JSON.parse(message)
    } catch (err) {}

    onMessage && onMessage(message)
    msg.finish()
  })
}

function publish(options) {
  const defaultOptions = Object.assign(
    {
      host: '127.0.0.1',
      port: 4150,
      topic: 'sample_topic',
      message: '',
    },
    options,
  )

  const {host, port, topic, message} = defaultOptions

  const writer = new nsq.Writer(host, port)

  writer.connect()

  writer.on('ready', () => {
    writer.publish(topic, message, () => {
      writer.close()
    })
  })

  writer.on('closed', () => {
    console.log('Writer closed')
  })
}

module.exports = {
  subscribe: subscribe,
  publish: publish,
}
