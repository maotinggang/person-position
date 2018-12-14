const defaultConfig = require('../config/default.json')
const file = require('./file')
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
    case 'server.compute.msgParser':
      filename = 'server.compute.msgParser.json'
      userConfig = defaultConfig.server.compute.msgParser
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
  let ret = file.readFileSync(
    path.resolve(__dirname, '../config/', filename),
    'json'
  )
  if (!ret.err) userConfig = ret.data
  return userConfig
}
