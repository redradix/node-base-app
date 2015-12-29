// Update with your config settings.
var path = require('path');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: '../__data/dev.sqlite3'
    },
    migrations: {
      directory: 'migrations',
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: '../__data/test.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

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
