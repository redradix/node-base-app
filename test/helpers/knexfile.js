// Update with your config settings.

module.exports = {
  //MySQL
  test:{
    client: 'mysql',
    debug: false,
    connection: {
      host: '127.0.0.1',
      user: 'food',
      password: 'food',
      database: 'food_test',
      charset: 'utf8'
    },
    //debug: true
  }
  //SQLITE
  // test: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './__data/test.sqlite3'
  //   }
  // }
}
