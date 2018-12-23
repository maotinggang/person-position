const net = require('net')
const parse = require('./parse')
const mariadb = require('./maria')
const config = require('./config')
const log = require('./log')

const tcpConfig = config.readConfig('access.tcp')

const server = net.createServer(socket => {
  //接收数据
  let devId
  socket.on('data', data => {
    data = data.toString()
    log.set('access', {
      code: 'receive.data',
      call: 'server.tcp.socket.on',
      info: data
    })
    parse.receive(data, (err, results) => {
      if (err) {
        log.set('error', {
          code: 'receive.data.parse',
          call: 'server.tcp.socket.on',
          info: {
            id: devId ? devId : socket.remoteAddress + ':' + socket.remotePort,
            data: err
          }
        })
      } else {
        devId = results.id
        //保存到数据库
        mariadb.asyncFunction(results)
      }
    })
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
    let now = new Date()
    console.log(
      'device close;time:' + now + ';id:' + devId
        ? devId
        : socket.remoteAddress + ':' + socket.remotePort
    )
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
  let now = new Date()
  console.log(
    'device connection;time:' +
      now +
      ';ip:' +
      socket.remoteAddress +
      ':' +
      socket.remotePort
  )
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
