/*

Knex db helper

Clears data, applies migrations, returns knex instance

*/

var tablesToClear = ['user', 'dish_ingredient', 'order_dish', 'order','ingredient', 'dish'];
var testDbConfig = require('./knexfile').test,
    knex = require('knex')(testDbConfig);

console.log(testDbConfig);

function clearTables(){
  return Promise.all(tablesToClear.map(t => knex(t).delete()))
    .then(() => {
      console.log('Test db tables cleared');
    });
}

before(done => {
  clearTables().then(() => done());
});

module.exports = {
  knex,
  clearTables
}