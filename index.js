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
      case '/api/hello':
        res.end('hello')
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
