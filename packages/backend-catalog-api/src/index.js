const Promise = require('bluebird')
const express = require('express')
const bodyParser = require('body-parser')
const Seneca = require('seneca')
const app = express()

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || '127.0.0.1'
const BASES = process.env.BASES || '127.0.0.1:39999'

const seneca = Seneca({tag: 'api', log: 'silent'})
  // .test('print')
  .use('mesh', {
    host: HOST,
    bases: [BASES],
  })

const act = Promise.promisify(seneca.act, {context: seneca})

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.send({status: 'ok'})
})

app.get('/catalog', function(req, res) {
  seneca.act(
    {
      role: 'catalog',
      cmd: 'getGamesAndCreateIndices',
    },
    function(err, out) {
      if (err) {
        res.status(500).send(err.message)
      }

      res.send(out)
    },
  )
})

app.listen(PORT, function() {
  console.log(`listening on http://localhost:${PORT}`)
})
