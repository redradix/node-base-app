
exports.up = function(knex, Promise) {
  return knex.schema.table('order_dish', t => {
    t.integer('amount').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('order_dish', t => {
    t.dropColumn('amount');
  })
};
