/**
 * @description 将utc时间转换为当地时间,加上毫秒
 * @param {String} utc
 * @returns {String}
 */
exports.utcToLocalTime = utc => {
  utc = Number(utc)
  let now = new Date()
  now.setUTCHours(Math.floor(utc / 10000))
  now.setUTCMinutes(Math.floor((utc % 10000) / 100))
  now.setUTCSeconds(Math.floor(utc % 100))
  return now.toLocaleString() + '.' + Math.round((utc % 1) * 1000)
}

/**
 * @description 将节转为km/h
 * @param {String} knots
 * @returns {String}
 */
exports.knotsTokph = knots => {
  knots = Number(knots) * 1.852
  return knots.toFixed(2)
}
