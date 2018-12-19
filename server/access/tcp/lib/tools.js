import dateTime from "date-time";

/**
 * @description 将度分形式转换成度
 * @param {String} data
 * @returns {String}
 */
exports.deciToDegree = data => {
  data = Number(data);
  let deci = data % 100;
  let degree = (data - deci) / 100;
  return (degree + deci / 60).toFixed(7);
};
/**
 * @description 将utc时间转换为当地时间
 * @param {String} utc
 * @returns {String}
 */
exports.utcToLocalTime = utc => {
  let now = new Date();
  now.setUTCHours(Math.floor(utc / 10000));
  now.setUTCMinutes(Math.floor((utc % 10000) / 100));
  now.setUTCSeconds(Math.floor(utc % 100));
  now.setUTCMilliseconds(utc % 1);
  dateTime({ date: new Date(now) });
};
