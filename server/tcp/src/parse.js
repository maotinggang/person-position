const tools = require('./tools')
/**
 * @description 接收消息后进行解析
 * @param {String} data
 * @returns {Object} err
 * @returns {Object} results
 */
exports.receive = (data, callback) => {
  let length = data.length
  let results = {
    id: '',
    time: '',
    lat: '',
    lng: '',
    qf: '',
    alt: '',
    speed: '',
    track_true: ''
  }
  if (length < 80) {
    return callback({
      code: 'length',
      call: 'tcp.src.parse.receive',
      info: length
    })
  } else {
    try {
      let datas = data.split('$')
      let sn = datas[1].split(',')
      if (sn[0] == 'SN') {
        let temp = sn[1].split('*')
        results.id = temp[0]
      } else {
        return callback({
          code: 'SN',
          call: 'tcp.src.parse.receive',
          info: sn[0]
        })
      }
      let gngga = datas[2].split(',')
      if (gngga[0] == 'GNGGA' || gngga[0] == 'GPGGA') {
        results.time = tools.utcToLocalTime(gngga[1])
        results.lat = gngga[2]
        results.lng = gngga[4]
        results.qf = gngga[6]
        results.alt = gngga[9]
      } else {
        return callback({
          code: 'GNGGA',
          call: 'tcp.src.parse.receive',
          info: gngga[0]
        })
      }
      let gnrmc = datas[3].split(',')
      if (gnrmc[0] == 'GNRMC' || gnrmc[0] == 'GPRMC') {
        results.speed = tools.knotsTokph(gnrmc[7])
        results.track_true = gnrmc[8]
      } else {
        return callback({
          code: 'GNRMC',
          call: 'tcp.src.parse.receive',
          info: gnrmc[0]
        })
      }
      return callback(null, results)
    } catch (error) {
      return callback({
        code: 'unknown',
        call: 'tcp.src.parse.receive',
        info: error
      })
    }
  }
}
