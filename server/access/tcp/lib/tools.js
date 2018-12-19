/**
 * @description 将度分形式转换成度
 * @param {Number} data
 * @returns {String}
 */
exports.deciToDegree = data => {
  let deci = data % 100
  let degree = (data - deci) / 100
  return (degree + deci / 60).toFixed(7)
}
