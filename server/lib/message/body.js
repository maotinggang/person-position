/**
 * @description 获取消息体
 *
 */
exports.set = (data, callback) => {}
/**
 * @description 解析消息体
 * @param {Object} data
 * @returns {Object} err
 * @returns {Object} results
 */
exports.get = (data, callback) => {
  let [err, results] = [{ code: '', call: 'lib.message.body.get' }, data]
  switch (data.msgId) {
    case 0x00: //错误通用
      break
    case 0x01: //正确通用
      break
    case 0x2a: //gpgga
      ;[err, results.gpgga] = gpgga(data.body)
      break
    case 0x2b:
      break
    case 0x2e: //rtcm32
      err = null
      results.rtcm32 = data.body
      break
    case 0x2f: //mix
      break
    default:
      err.code = 'unknown'
      err.info = data.msgId
      break
  }
  return callback(err, results)
}

/**
 * @description 解析透传消息体gpgga
 * @param {String} gpgga
 * @returns {Object} results
 */
const gpgga = gpgga => {
  let err = null,
    results = ''
  try {
    let dataArray = gpgga.split(',')
    if (
      dataArray[0] != '$GNGGA' &&
      dataArray[0] != '$GPGGA' &&
      dataArray[0] != '$BDGGA'
    ) {
      err = {
        code: 'nmea',
        call: 'lib.message.body.gpgga',
        info: dataArray[0]
      }
    }
    results.time = tools.utcToTime(dataArray[1])
    results.lat = tools.deciToDegree(Number(dataArray[2]))
    if (dataArray[3] == 'S') results.lat *= -1
    results.lon = tools.deciToDegree(Number(dataArray[4]))
    if (dataArray[5] == 'W') results.lon *= -1
    results.qual = dataArray[6]
    results.sats = dataArray[7]
    results.hdop = dataArray[8]
    results.alt = dataArray[9]
    results.undulation = dataArray[11]
    results.age = dataArray[13]
    results.stnId = dataArray[14]
  } catch (error) {
    err = { code: 'gpgga', call: 'lib.message.body.gpgga' }
  }
  return [err, results]
}
