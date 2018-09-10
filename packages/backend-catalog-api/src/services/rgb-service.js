const Seneca = require('seneca')

const baseHost = process.env.BASE_MESH || '127.0.0.1'
const host = process.env.RGB_MESH || '127.0.0.1'

Seneca({tag: 'rgb', log: 'silent'})
  // .test('print')
  .use('../logic/rgb')
  .use('mesh', {
    isbase: false,
    auto: true,
    pin: 'role:color,format:rgb',
    host: host,
    bases: [baseHost],
  })
  .ready(function() {
    const seneca = this
    console.log('RGB Service Ready', seneca.id)
  })
