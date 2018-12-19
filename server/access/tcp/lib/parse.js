const tools = require("./tools");
/**
 * @description 接收消息后进行解析
 * @param {String} data
 * @returns {Object} err
 * @returns {Object} results
 */
exports.receive = (data, callback) => {
  let length = data.length;
  let results = { id: "" };
  if (length < 80) {
    return callback({
      code: "length",
      call: "tcp.lib.parse.receive",
      info: length
    });
  } else {
    try {
      let datas = data.split("/n");
      let sn = datas[0].split(",");
      if (sn[0] == "$SN") {
        let temp = sn[1].split("*");
        results.id = temp[0];
      } else {
        return callback({
          code: "SN",
          call: "tcp.lib.parse.receive",
          info: sn[0]
        });
      }
      let gngga = datas[1].split(",");
      if (gngga[0] == "$GNGGA") {
        results.time = tools.utcToLocalTime(gngga[1]);
        results.lat = tools.deciToDegree(gngga[2]);
        results.lng = tools.deciToDegree(gngga[4]);
      } else {
        return callback({
          code: "GNGGA",
          call: "tcp.lib.parse.receive",
          info: gngga[0]
        });
      }
      let gnrmc = datas[2].split(",");
      if (gnrmc[0] == "$GNRMC") {
      } else {
        return callback({
          code: "GNRMC",
          call: "tcp.lib.parse.receive",
          info: gnrmc[0]
        });
      }
      return callback(null, results);
    } catch (error) {
      return callback({
        code: "unknown",
        call: "tcp.lib.parse.receive",
        info: error
      });
    }
  }
};
