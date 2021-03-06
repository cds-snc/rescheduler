import app from './server'
import http from 'http'

const server = http.createServer(app)

let currentApp = app

/* eslint-disable no-console */

/*
  This gets around the Razzle default port setting, which doesn't play nice with our container deploys.
  Source: https://github.com/jaredpalmer/razzle/issues/356#issuecomment-366275253
*/

const port = () => 8080

const _port = port()

server.listen(_port, error => {
  if (error) {
    console.log(error)
  }

  console.log(`🚀 started on port ${_port}`)
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!')

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    server.removeListener('request', currentApp)
    const newApp = require('./server').default
    server.on('request', newApp)
    currentApp = newApp
  })
}

/* eslint-enable no-console */
