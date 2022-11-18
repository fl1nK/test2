import http from 'node:http'

const PORT = 3000

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Homepage')
  } else {
    res.end(
      res.writeHead(404, { 'Content-Type': 'application/json' }),
      JSON.stringify({
        message: 'Route Not Found',
      })
    )
  }
})

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

process.on('SIGINT', async () => {
  process.exit(0)
})
