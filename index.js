import * as http from 'node:http'

const server = http.createServer((req, res) => {
  // eslint-disable-next-line eqeqeq
  if (req.method == 'GET') {
    switch (res.url) {
      case '/':
        res.end('home')
        break
      case '/hello':
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
