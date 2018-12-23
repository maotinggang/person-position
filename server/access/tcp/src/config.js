const defaultConfig = require('./config/default.json')
const fs = require('fs')
const path = require('path')
/**
 * @description  读取配置文件
 * @param {String} type
 * @returns {Object}
 * */
exports.readConfig = type => {
  let filename = ''
  let userConfig = ''
  switch (type) {
    case 'access.tcp':
      filename = 'access.tcp.json'
      userConfig = defaultConfig.server.access.tcp
      break
    case 'log':
      filename = 'log.json'
      userConfig = defaultConfig.log
      break
    case 'mariadb':
      filename = 'mariadb.json'
      userConfig = defaultConfig.mariadb
      break
    default:
      console.log({
        code: 'type',
        call: 'src.config.readConfig',
        info: type
      })
      break
  }
  // let ret = readFileSync(path.resolve(__dirname, './config', filename), 'json')
  let ret = readFileSync(
    path.resolve(__dirname, './person-position/tcp/config', filename),
    'json'
  ) //production
  if (!ret.err) userConfig = ret.data
  else console.log(ret.err)
  return userConfig
}

/**
 * @description 同步读取文件
 * @param {String} filename
 * @param {String} type
 * @returns {Object}
 */
const readFileSync = (filename, type) => {
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
          code: 'type',
          call: 'src.config.readFileSync',
          info: type
        }
        break
    }
    results.data = data
  } catch (error) {
    results.err = {
      type: 'read.file',
      code: 'read',
      call: 'src.config.readFileSync',
      info: error
    }
  }
  return results
}
