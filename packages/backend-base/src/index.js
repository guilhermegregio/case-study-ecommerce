const Seneca = require('seneca')

const PORT = process.env.PORT || 39999
const HOST = process.env.HOST || '127.0.0.1'
const BASES1 = process.env.BASES1 || '127.0.0.1:39999'

Seneca({tag: 'base', log: 'silent'})
  // .test('print')
  .use('mesh', {
    isbase: true,
    port: PORT,
    host: HOST,
    bases: [BASES1],
    pin: 'role:mesh',
  })
  .ready(function() {
    const seneca = this
    console.log('Base Service Ready', seneca.id)
  })
