/**
 * Insert two orders
 */
exports.seed = function(knex, Promise) {
  var breakfastOrder = {
    id: '849f6108-dbda-4ef7-8a77-f6f76a9d8976',
    //admin user
    createdBy: '640a88b4-5225-4cd0-a6b1-44f6d9db3c2f',
    createdAt: new Date()
  };
  var lunchOrder = {
    id: '14566ce9-f4e3-452b-9f72-539bd1aeee9f',
    createdBy: '640a88b4-5225-4cd0-a6b1-44f6d9db3c2f',
    createdAt: new Date()
  };

  var breakfastDishes = [
    {
      //eggs
      orderId: breakfastOrder.id,
      dishId:'d596c852-c83a-4f63-a0d3-7bdbd7940923',
      amount: 2
    }
  ];
  var lunchDishes = [
    {
      //salad
      orderId: lunchOrder.id,
      dishId: 'a124c765-1731-4fc2-beb2-bab9cafbf3a0',
      amount: 1
    }
  ];
  return Promise.join(
    // Inserts seed entries
    knex('order').insert([breakfastOrder, lunchOrder]),
    knex('order_dish').insert(breakfastDishes),
    knex('order_dish').insert(lunchDishes)
  );
};
