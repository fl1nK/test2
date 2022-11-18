import http from 'node:http'

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Homepage')
  }
})

server.on('clientError', (_err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})
server.listen(parseInt(process.env.PORT) || 3000)

process.on('SIGINT', () => {
  server.close((error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
  })
})
