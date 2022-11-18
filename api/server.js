import * as http from 'node:http'
import * as url from 'url'
import { VercelRequest, VercelResponse } from '@vercel/node'

const server = http.createServer((req, res) => {
  const urlParts = url.parse(req.url)
  console.log(urlParts.pathname)

  if (req.method === 'GET') {
    switch (urlParts.pathname) {
      case '/':
        res.end('home')
        break
      case '/api':
        res.end(JSON.stringify({ name: `hello` }))
        break
      case '/api/hello':
        res.end(JSON.stringify({ name: `hello` }))
        break
      case '/hello':
        res.end(JSON.stringify({ name: `hello` }))
        break
      default:
        res.end('404')
        break
    }
  }
})

server.listen(parseInt(process.env.PORT) || 3000)

server.on('clientError', (_err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

process.on('SIGINT', () => {
  server.close((error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
  })
})
