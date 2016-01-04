var knex = require('knex');

function DBFactory(dbConfig){
  var env = process.env.NODE_ENV || 'development';
  return knex(dbConfig[env]);
}

module.exports = DBFactory;