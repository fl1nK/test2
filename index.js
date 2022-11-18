import http from 'node:http'

const PORT = process.env.PORT || 8000
const SHUTDOWN_TIMEOUT = 5000
const HTTP_REFRESH = {
  'Content-Type': 'text/html',
  Refresh: 5,
}

const connections = new Map()

const timeout = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

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

server.on('connection', (connection) => {
  console.log('New connection')
  connection.on('close', () => {
    console.log('close')
    connections.delete(connection)
  })
})

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

const showConnections = () => {
  console.log('Connections:', [...connections.values()].length)
  for (const connection of connections.keys()) {
    const { remoteAddress, remotePort } = connection
    console.log(`  ${remoteAddress}:${remotePort}`)
  }
}

const closeConnections = async () => {
  for (const [connection, res] of connections.entries()) {
    connections.delete(connection)
    res.writeHead(503, HTTP_REFRESH)
    res.end('Server stopped')
    connection.destroy()
  }
}

const freeResources = async () => {
  console.log('Free resources')
}

const gracefulShutdown = async () => {
  server.close((error) => {
    if (error) {
      console.log(error)
      process.exit(1)
    }
  })
  await timeout(SHUTDOWN_TIMEOUT)
  await freeResources()
  await closeConnections()
}

process.on('SIGINT', async () => {
  console.log()
  console.log('Gracefull shutdown')
  showConnections()
  await gracefulShutdown()
  showConnections()
  console.log('End')
  process.exit(0)
})
