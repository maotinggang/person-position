const net = require('net')
const log = require('../../../lib/log')
const pack = require('../../../lib/message/pack')
const tools = require('../../../lib/tools')
const parse = require('../../../lib/message/parse')
const config = require('../../../lib/config')
const tcpConfig = config.readConfig('server.access.tcp')

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
        send = pack.error(err)
        socket.write(send)
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
        send = pack.response(results)
        socket.write(send)
        log.set('access', {
          code: 'send',
          call: 'server.tcp.socket.on',
          info: { id: devId, data: send }
        })
        redis1.set('raw', results, () => {})
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
    clearInterval(interval) //清除指令发送操作
  })
  //连接超时
  socket.setTimeout(tcpConfig.timeout)
  socket.on('timeout', () => {
    log.set('access', {
      code: 'timeout',
      call: 'server.tcp.socket.on',
      info: devId
    })
    socket.end(
      pack.error({
        code: 'timeout'
      })
    ) //发送超时包后关闭
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
