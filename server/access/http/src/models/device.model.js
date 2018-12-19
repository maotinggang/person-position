/* eslint-disable no-console */

// device-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function(app) {
  const db = app.get('knexClient');
  const tableName = 'device';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema
        .createTable(tableName, table => {
          table.string('id');
          table.string('name');
          table.string('section');
          table.string('setup');
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
