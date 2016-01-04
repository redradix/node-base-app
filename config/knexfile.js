// Update with your config settings.
var path = require('path');

module.exports = {

  development: {
    debug: false,
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'food',
      password: 'food',
      database: 'food',
      charset: 'utf8'
    },
    migrations: {
      directory: 'migrations',
      tableName: 'knex_migrations'
    }
  },

  //MySQL
  test:{
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'food',
      password: 'food',
      database: 'food_test',
      charset: 'utf8'
    }
  }

};
