/*

  Creates initial DB schema

  Tables: User, Ingredient, Dish, Dish<->Ingredient, Order, Order<->Dish

*/
exports.up = function(knex, Promise) {
  return Promise.all([
    //User
    knex.schema.createTable('user', t => {
      t.uuid('id').notNullable().primary().unique();
      t.string('username',60).notNullable().unique();
      t.string('password',60).notNullable();
    }),
    //Ingredient
    knex.schema.createTable('ingredient', t => {
      t.uuid('id').notNullable().primary().unique();
      t.string('name', 50).notNullable().unique();
      t.decimal('cost').notNullable();
      t.integer('stock').notNullable();
    }),
    //Dish
    knex.schema.createTable('dish', t => {
      t.uuid('id').notNullable().primary().unique();
      t.string('name', 150).notNullable().unique();
      t.decimal('price').notNullable();
    }),
    //Dish_Ingredient
    knex.schema.createTable('dish_ingredient', t => {
      t.uuid('dishId').notNullable().references('id').inTable('dish');
      t.uuid('ingredientId').notNullable().references('id').inTable('ingredient');
      t.decimal('amount').notNullable().defaultTo(1);
      //t.primary(['dishId', 'ingredientId']);
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
      t.integer('amount').notNullable();
      //t.primary(['orderId', 'dishId']);
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
