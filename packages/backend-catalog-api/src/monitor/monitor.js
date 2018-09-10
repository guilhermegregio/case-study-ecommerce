const Seneca = require('seneca')

Seneca({tag: 'rgb', log: 'silent'}).use('mesh', {
  bases: ['127.0.0.1'],
  monitor: true,
})
