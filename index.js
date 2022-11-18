/* eslint-disable n/no-deprecated-api */
/* eslint-disable sonarjs/no-duplicate-string */

import * as http from 'node:http'
import url from 'url'

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname

  if (req.method === 'GET') {
    switch (path) {
      case '/':
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('home')
        break
      case '/hello':
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'hello', method: 'GET' }))
        break
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
        break
    }
  } else if (req.method === 'POST') {
    switch (path) {
      case '/':
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('home POST')
        break
      case '/hello':
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'hello', method: 'POST' }))
        break
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
        break
    }
  }
})

server.listen(parseInt(process.env.PORT) || 3000)

process.on('SIGINT', async () => {
  process.exit(0)
})
