import * as http from 'node:http'

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    switch (res.url) {
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
