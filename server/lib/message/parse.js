const header = require('./header')

/**
 * @description 接收消息后实时应答，只解析到消息序号以前消息头
 * @param {String} data
 * @returns {Object} err
 * @returns {Object} results
 */
exports.receiveRes = (data, callback) => {
  header.getFixed(data, (err, results) => {
    if (err) {
      return callback(err)
    } else {
      results.raw = data
      if (results.state) {
        header.getUnfixedMin(results, (err, results) => {
          if (err) {
            return callback(err)
          } else {
            return callback(null, results)
          }
        })
      } else {
        return callback(null, results)
      }
    }
  })
}
