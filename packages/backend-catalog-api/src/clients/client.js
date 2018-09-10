const Seneca = require('seneca')

Seneca({tag: 'client'})
  .test('print')
  .use('mesh', {
    bases: ['127.0.0.1'],
  })
  .act(
    {
      role: 'color',
      format: 'rgb',
      color: 'red',
    },
    function(err, out) {
      console.log('AKI: ', (err && err.message) || out.color)
      this.close()
    },
  )
