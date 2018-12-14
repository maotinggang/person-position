const constant = require('./constant')
/**
 * @description 将utc时间转换成本地时间，并加上年月日
 * @param {String} utc
 * @returns {String}
 */
exports.utcToTime = utc => {
  let now = new Date()
  utc = Number(utc) * 1000
  now.setHours(utc / 10000000 + 8)
  now.setMinutes((utc % 10000000) / 100000)
  now.setSeconds((utc % 100000) / 1000)
  return now.toLocaleString() + '.' + (utc % 1000)
}

/**
 * @description 获取带毫秒的系统时间
 * @returns {String}
 */
exports.getTime = () => {
  let now = new Date()
  return now.toLocaleString() + '.' + now.getMilliseconds()
}
/**
 * @description 根据时间获取sn
 * @returns {String}
 */
exports.getSN = () => {
  let now = new Date()
  return (now.getTime() % 600000) / 10
}
/**
 * @description 将度分形式转换成度
 * @param {Number} data
 * @returns {String}
 */
exports.deciToDegree = data => {
  let deci = data % 100
  let degree = (data - deci) / 100
  return (degree + deci / 60).toFixed(8)
}

/**
 * @description BLH 转换成 XYZ
 * @param {Array} BLH
 * @returns {Array} XYZ
 */
exports.BLHToXYZ = BLH => {
  let [x, y, z] = [0, 0, 0]
  let a = (BLH[0] * Math.PI) / 180
  let b = (BLH[1] * Math.PI) / 180
  let N =
    constant.ellipsoid.majorAxis /
    Math.sqrt(
      1 -
        Math.pow(constant.ellipsoid.eccentricity, 2) * Math.pow(Math.sin(a), 2)
    )
  x = (N + BLH[2]) * Math.cos(a) * Math.cos(b)
  y = (N + BLH[2]) * Math.cos(a) * Math.sin(b)
  z =
    (N * (1 - Math.pow(constant.ellipsoid.eccentricity, 2)) + BLH[2]) *
    Math.sin(a)
  return [x, y, z]
}
