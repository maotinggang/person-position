const net = require('net')
const parse = require('./lib/parse')

const server = net.createServer(socket => {
  //接收数据
  socket.on('data', data => {
    parse.receiveRes(data, (err, results) => {
      let send = ''
      if (err) {
        log.set('access', {
          code: 'receive',
          call: 'server.tcp.socket.on',
          info: {
            id: devId ? devId : socket.remoteAddress + ':' + socket.remotePort,
            data: data
          }
        })
        log.set('access', {
          code: 'send',
          call: 'server.tcp.socket.on',
          info: {
            id: devId ? devId : socket.remoteAddress + ':' + socket.remotePort,
            data: send
          }
        })
      } else {
        log.set('access', {
          code: 'receive',
          call: 'server.tcp.socket.on',
          info: { id: devId, data: results }
        })
        log.set('access', {
          code: 'send',
          call: 'server.tcp.socket.on',
          info: { id: devId, data: send }
        })
      }
    })
  })

  socket.on('error', err => {
    log.set('error', {
      code: 'error',
      call: 'server.tcp.socket.on',
      info: { id: devId, data: err }
    })
  })
  //连接断开
  socket.on('close', had_error => {
    log.set('run', {
      code: 'close',
      call: 'server.tcp.socket.on',
      info: { id: devId, data: had_error }
    })
  })
  //连接超时
  socket.setTimeout(tcpConfig.timeout)
  socket.on('timeout', () => {
    log.set('access', {
      code: 'timeout',
      call: 'server.tcp.socket.on',
      info: devId
    })
    socket.end() //超时后关闭
  })
})

server.on('error', err => {
  log.set('error', { code: 'error', call: 'server.tcp.server.on', info: err })
})
server.on('connection', socket => {
  log.set('access', {
    code: 'connection',
    call: 'server.tcp.server.on',
    info: socket.remoteAddress + ':' + socket.remotePort
  })
})
server.listen(tcpConfig.port, () => {
  let now = new Date()
  log.set('run', {
    code: 'start',
    call: 'server.tcp.server.listen',
    info: 'server start;time:' + now + ';port:' + tcpConfig.port
  })
  console.log('server start;time:' + now + ';port:' + tcpConfig.port)
})
