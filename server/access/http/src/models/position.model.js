/* eslint-disable no-console */

// position-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function(app) {
  const db = app.get('knexClient');
  const tableName = 'position';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema
        .createTable(tableName, table => {
          table.string('id');
          table.string('time');
          table.float('lat');
          table.float('long');
          table.integer('qf');
          table.integer('sat_no');
          table.float('hdop');
          table.float('alt');
          table.integer('age');
          table.float('speed');
          table.float('track_true');
          table.float('mag_var');
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
