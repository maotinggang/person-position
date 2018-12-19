const mariadb = require("mariadb");
const config = require("./config");

const pool = mariadb.createPool(config.readConfig("mariadb"));

exports.asyncFunction = async data => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "INSERT INTO position value (?, ?,?, ?,?,?,?, ?,?)",
      [data.id, data.time, data.lng, data.lat, data.speed, data.track_true]
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};
