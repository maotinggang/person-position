const fs = require('fs')

/**
 * @description 同步读取文件,错误时记录log
 * @param {String} filename
 * @param {String} type
 * @returns {Object}
 */
exports.readFileSync = (filename, type) => {
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
