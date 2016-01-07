/**
 * Clears all tables and creates default user (admin/admin)
 */
exports.seed = function(knex, Promise) {

  //admin / admin
  var defaultUser = {
    id: '640a88b4-5225-4cd0-a6b1-44f6d9db3c2f',
    username: 'admin',
    password: '$2a$10$S7GyvftGqA7DtLscYUn/veCjSwqd79XATnys3ISIOh2QlQYxj3i1u'
  };

  return Promise.join(
    // Deletes ALL existing entries
    knex('order_dish').del(),
    knex('dish_ingredient').del(),
    knex('order').del(),
    knex('dish').del(),
    knex('ingredient').del(),
    knex('user').del(),
    knex('user').insert(defaultUser)
  );
};
