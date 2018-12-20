const collection = require('lodash/collection');
const coords = require('../lib/coords');

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    let data = context.result.data;
    if (data[0]) {
      context.result.data = posProcess(data);
    }
    return context;
  };
};

const posProcess = data => {
  collection.forEach(data, value => {
    let bd = coords.wgs2bd(value.lat, value.lng);
    value.lat = bd[0].toFixed(7);
    value.lng = bd[1].toFixed(7);
    switch (value.qf) {
    case '0':
      value.qf = '无效';
      break;
    case '1':
      value.qf = '单点';
      break;
    case '2':
      value.qf = '伪距';
      break;
    case '4':
      value.qf = '固定';
      break;
    case '5':
      value.qf = '浮点';
      break;
    case '7':
      value.qf = '设定';
      break;
    default:
      value.qf = '未知';
      break;
    }
  });
  return data;
};
