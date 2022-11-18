import http from 'node:http'

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    switch (req.url) {
      case '/':
        homepage(req, res)
        break
      case '/hello':
        hello(req, res)
        break
      case '/hello2':
        homepage(req, res)
        break
    }
  }
})

function homepage(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('homepage')
}

function hello(req, res) {
  res.end('hello')
}
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
