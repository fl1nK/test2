import http from 'http'

const PORT = 3000

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.end('Homepage')
  } else {
    res.end(
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
  console.log()
  console.log('Gracefull shutdown')
  console.log('End')
  process.exit(0)
})
