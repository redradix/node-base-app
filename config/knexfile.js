// Update with your config settings.
var path = require('path');

module.exports = {

  development: {
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

  // test: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: '../__data/test.sqlite3'
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
