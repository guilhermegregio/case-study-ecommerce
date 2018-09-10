const Seneca = require('seneca')

const baseHost = process.env.BASE_MESH || '127.0.0.1'
const host = process.env.HEX_MESH || '127.0.0.1'

Seneca({tag: 'hex', log: 'silent'})
  // .test('print')
  .use('../logic/hex')
  .use('mesh', {
    isbase: false,
    auto: true,
    pin: 'role:color,format:hex',
    host: host,
    bases: [baseHost],
  })
  .ready(function() {
    const seneca = this
    console.log('HEX Service Ready', seneca.id)
  })
