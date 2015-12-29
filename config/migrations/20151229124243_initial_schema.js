/*

  Creates initial DB schema

  Tables: User, Ingredient, Dish, Dish<->Ingredient, Order, Order<->Dish

*/
exports.up = function(knex, Promise) {
  return Promise.all([
    //User
    knex.schema.createTable('user', t => {
      t.uuid('id').notNullable().primary().unique();
      t.string('username',50).notNullable().unique();
      t.string('password',50).notNullable();
    }),
    //Ingredient
    knex.schema.createTable('ingredient', t => {
      t.uuid('id').notNullable().primary().unique();
      t.string('name', 50).notNullable();
      t.decimal('cost').notNullable();
      t.integer('stock').notNullable();
    }),
    //Dish
    knex.schema.createTable('dish', t => {
      t.uuid('id').notNullable().primary().unique();
      t.string('name', 150).notNullable();
      t.decimal('price').notNullable();
    }),
    //Dish_Ingredient
    knex.schema.createTable('dish_ingredient', t => {
      t.uuid('dishId').notNullable().references('id').inTable('dish');
      t.uuid('ingredientId').notNullable().references('id').inTable('dish');
      t.decimal('amount').notNullable().defaultTo(1);
    }),
    //Order
    knex.schema.createTable('order', t => {
      t.uuid('id').notNullable().primary().unique();
      t.dateTime('createdAt').notNullable();
      t.uuid('createdBy').notNullable().references('id').inTable('user');
    }),
    //Order_Dish
    knex.schema.createTable('order_dish', t => {
      t.uuid('orderId').references('id').inTable('order');
      t.uuid('dishId').references('id').inTable('dish');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user'),
    knex.schema.dropTable('ingredient'),
    knex.schema.dropTable('dish'),
    knex.schema.dropTable('dish_ingredient'),
    knex.schema.dropTable('order'),
    knex.schema.dropTable('order_dish')
  ]);
};
