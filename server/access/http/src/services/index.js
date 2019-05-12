const device = require('./device/device.service.js');
const position = require('./position/position.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(device);
  app.configure(position);
  app.configure(users);
};
