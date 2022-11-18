import * as http from 'node:http'
import * as url from 'url'
//import { VercelRequest, VercelResponse } from '@vercel/node'
import pkg from '@vercel/node'
const { VercelRequest, VercelResponse } = pkg

const server = http.createServer((VercelRequest, VercelResponse) => {
  const urlParts = url.parse(VercelRequest.url)
  console.log(urlParts.pathname)

  if (VercelRequest.method === 'GET') {
    switch (urlParts.pathname) {
      case '/':
        VercelResponse.end('home')
        break
      case '/api':
        VercelResponse.end(JSON.stringify({ name: `hello` }))
        break
      case '/api/hello':
        VercelResponse.end(JSON.stringify({ name: `hello` }))
        break
      case '/hello':
        VercelResponse.end(JSON.stringify({ name: `hello` }))
        break
      default:
        VercelResponse.end('404')
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
