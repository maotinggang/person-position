import dateTime from "date-time";

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
