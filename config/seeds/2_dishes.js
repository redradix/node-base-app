
exports.seed = function(knex, Promise) {
  var dish = {
    id: 'a124c765-1731-4fc2-beb2-bab9cafbf3a0',
    name: 'Dish 1',
    price: 4.99
  };
  var ingredients = [
    {
      dishId: 'a124c765-1731-4fc2-beb2-bab9cafbf3a0',
      ingredientId: '0ff8ac08-65dc-4b99-b9b7-0c7a803aff41',
      amount: 5
    },
    {
      dishId: 'a124c765-1731-4fc2-beb2-bab9cafbf3a0',
      ingredientId: 'c131628b-3fff-4193-a1ad-e4d2dc41497f',
      amount: 3
    }
  ];
  return Promise.join(
    // Deletes ALL existing entries
    knex('dish').del(),
    knex('dish_ingredient').del(),
    // Inserts seed entries
    knex('dish').insert(dish),
    knex('dish_ingredient').insert(ingredients)
  );
};
