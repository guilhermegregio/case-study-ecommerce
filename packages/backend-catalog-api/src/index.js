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

app.get('/rgb/:color', function(req, res) {
  seneca.act(
    {
      role: 'color',
      format: 'rgb',
      color: req.params.color,
    },
    function(err, out) {
      if (err) {
        res.status(500).send(err.message)
      }

      res.send(out.color)
    },
  )
})

app.get('/wft/:color', function(req, res) {
  const color = req.params.color
  const actions = [
    {
      role: 'color',
      format: 'rgb',
      color,
    },
    {
      role: 'color',
      format: 'hex',
      color,
    },
  ]

  const commands = actions.map(action => act(action))

  Promise.all(commands)
    .then(results => {
      res.send(results.map(r => r.color))
    })
    .catch(err => {
      res.send(err)
    })
})

app.listen(PORT, function() {
  console.log(`listening on http://localhost:${PORT}`)
})
