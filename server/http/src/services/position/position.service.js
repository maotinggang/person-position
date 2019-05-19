// Initializes the `position` service on path `/position`
const createService = require('feathers-knex');
const createModel = require('../../models/position.model');
const hooks = require('./position.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'position',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/position', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('position');

  service.hooks(hooks);
};
  