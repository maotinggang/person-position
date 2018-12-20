const mariadb = require('mariadb')
const config = require('./config')
const log = require('./log')

const pool = mariadb.createPool(config.readConfig('mariadb'))

exports.asyncFunction = async data => {
  let conn
  try {
    conn = await pool.getConnection()
    const res = await conn.query(
      'INSERT INTO position value (?,?,?,?,?,?,?,?)',
      [
        data.id,
        data.time,
        data.lat,
        data.lng,
        data.qf,
        data.alt,
        data.speed,
        data.track_true
      ]
    )
  } catch (err) {
    log.set('error', {
      code: 'maria.insert',
      call: 'tcp.src.maria.asyncFunction',
      info: err
    })
  } finally {
    if (conn) return conn.end()
  }
}
