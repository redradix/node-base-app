var knex = require('knex');

function DBFactory(dbConfig){
  return knex(dbConfig);
}

module.exports = DBFactory;