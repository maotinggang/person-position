const net = require('net')
const parse = require('./src/parse')
const mariadb = require('./src/maria')
const config = require('./src/config')
const log = require('./src/log')

const tcpConfig = config.readConfig('access.tcp')

const server = net.createServer(socket => {
  //接收数据
  let devId,
    no = 0,
    allData = ''
  socket.on('data', data => {
    no++
    allData += data
    if (no == 3) {
      no = 0
      log.set('access', {
        code: 'receive.data',
        call: 'server.tcp.socket.on',
        info: allData
      })
      parse.receive(allData, (err, results) => {
        if (err) {
          log.set('error', {
            code: 'receive.data.parse',
            call: 'server.tcp.socket.on',
            info: {
              id: devId
                ? devId
                : socket.remoteAddress + ':' + socket.remotePort,
              data: err
            }
          })
        } else {
          devId = results.id
          //保存到数据库
          mariadb.asyncFunction(results)
        }
      })
      allData = ''
    }
  })

  socket.on('error', err => {
    log.set('error', {
      code: 'error',
      call: 'server.tcp.socket.on',
      info: {
        id: devId ? devId : socket.remoteAddress + ':' + socket.remotePort,
        data: err
      }
    })
  })
  //连接断开
  socket.on('close', had_error => {
    log.set('run', {
      code: 'close',
      call: 'server.tcp.socket.on',
      info: {
        id: devId ? devId : socket.remoteAddress + ':' + socket.remotePort,
        data: had_error
      }
    })
  })
  //连接超时
  socket.setTimeout(tcpConfig.timeout)
  socket.on('timeout', () => {
    log.set('access', {
      code: 'timeout',
      call: 'server.tcp.socket.on',
      info: devId ? devId : socket.remoteAddress + ':' + socket.remotePort
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
