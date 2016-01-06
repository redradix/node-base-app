var knex = require('knex');
/**
  Just a knex.js wrapper for reuse
**/
function DBFactory(dbConfig){
  var env = process.env.NODE_ENV || 'development';
  return knex(dbConfig[env]);
}

module.exports = DBFactory;