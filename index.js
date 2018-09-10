#! /usr/bin/env node

const {spawn, spawnSync} = require('child_process')

const [executor, ignoredBin, ...args] = process.argv

const execSpawn = script => {
  const exec = spawn(executor, [script], {})

  exec.stdout.on('data', data => {
    console.log(`${script}: ${data}`)
  })

  exec.stderr.on('data', data => {
    console.log(`${script} err: ${data}`)
  })

  exec.on('close', code => {
    console.log(`${script} exit with code ${code}`)
  })
}

execSpawn('packages/backend-base/src/index.js')
execSpawn('packages/backend-catalog/src/index.js')
execSpawn('packages/backend-catalog-favorite/src/index.js')
execSpawn('packages/backend-catalog-steam/src/index.js')
execSpawn('packages/backend-catalog-xbox/src/index.js')
execSpawn('packages/backend-catalog-psn/src/index.js')
execSpawn('packages/backend-catalog-api/src/index.js')
