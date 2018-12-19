const defaultConfig = require('../config/default.json')
const fs = require('fs')
const path = require('path')
const log = require('./log')
/**
 * @description  读取配置文件
 * @param {String} type
 * @returns {Object}
 * */
exports.readConfig = type => {
  let filename = ''
  let userConfig = ''
  switch (type) {
    case 'server.access.tcp':
      filename = 'server.access.tcp.json'
      userConfig = defaultConfig.server.access.tcp
      break
    case 'log':
      filename = 'log.json'
      userConfig = defaultConfig.log
      break
    default:
      log.set('error', {
        code: 'type',
        call: 'lib.config.readConfig',
        info: type
      })
      break
  }
  let ret = readFileSync(
    path.resolve(__dirname, '../config/', filename),
    'json'
  )
  if (!ret.err) userConfig = ret.data
  return userConfig
}

/**
 * @description 同步读取文件,错误时记录log
 * @param {String} filename
 * @param {String} type
 * @returns {Object}
 */
readFileSync = (filename, type) => {
  let data = '',
    results = { err: '', data: '' }
  try {
    data = fs.readFileSync(filename, 'utf8')
    switch (type) {
      case 'json':
        data = JSON.parse(data)
        break
      default:
        results.err = {
          type: 'read.file',
          code: 'type',
          call: 'lib.file.readFileSync',
          info: type
        }
        break
    }
    results.data = data
  } catch (error) {
    results.err = {
      type: 'read.file',
      code: 'read',
      call: 'lib.file.readFileSync',
      info: error
    }
  }
  return results
}
