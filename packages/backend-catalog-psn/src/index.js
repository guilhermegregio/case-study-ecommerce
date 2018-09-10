const Seneca = require('seneca')

const HOST = process.env.HOST || '127.0.0.1'
const BASES1 = process.env.BASES1 || '127.0.0.1:39999'

Seneca({tag: 'catalog-psn', log: 'silent'})
  // .test('print')
  .use('./handlers')
  .use('mesh', {
    pin: 'role:catalog-psn,cmd:*',
    host: HOST,
    bases: [BASES1],
  })
  .ready(function() {
    const seneca = this
    console.log('Catalog PSN Service Ready', seneca.id)
  })
