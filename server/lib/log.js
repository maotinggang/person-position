const config = require('./config')
const logConfig = config.readConfig('log')
const logTime = require('./tools')
/**
 * @description 保存log信息到redis3
 * @param {String} type error,access,run
 * @param {Object} log code,call,info
 */
exports.set = (type, data) => {
  if (logConfig.leval == 0) {
    return
  } else {
    if (!logConfig.code && data.code) {
      delete data.code
    }
    if (!logConfig.call && data.call) {
      delete data.call
    }
    if (!logConfig.info && data.info) {
      delete data.info
    }
    if (!data) {
      return
    } else {
      data.time = logTime.getTime()
    }
  }
  data = JSON.stringify(data)
  if (logConfig.print) {
    console.log(data)
  }
  if (logConfig.leval == 1) {
    if (type == 'error') {
    }
  } else if (logConfig.leval == 2) {
    if (type == 'error') {
    } else if (type == 'run') {
    }
  } else {
    if (type == 'error') {
    } else if (type == 'run') {
    } else if (type == 'access') {
    }
  }
}
