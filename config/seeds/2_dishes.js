/**
 * Seeds two dishes
 */
exports.seed = function(knex, Promise) {
  var salad = {
    id: 'a124c765-1731-4fc2-beb2-bab9cafbf3a0',
    name: 'Salad',
    price: 4.99
  };
  var saladIngredients = [
    {
      //salt
      dishId: salad.id,
      ingredientId: '0ff8ac08-65dc-4b99-b9b7-0c7a803aff41',
      amount: 5
    },
    {
      //tomato
      dishId: salad.id,
      ingredientId: 'de3616e7-d486-4777-bd74-13a0b25833aa',
      amount: 1
    },
    {
      //lettuce
      dishId: salad.id,
      ingredientId: '3f750c0d-e273-4e88-956d-2b8389149c2f',
      amount: 1
    },
    {
      //olive oil
      dishId: salad.id,
      ingredientId: '60aad83d-ac68-4c3a-85c2-22879ff39c24',
      amount: 30
    }
  ];
  var eggs = {
    id: 'd596c852-c83a-4f63-a0d3-7bdbd7940923',
    name: 'Scrambled Eggs',
    price: 9.99
  };
  var eggsIngredients = [
    {
      //eggs
      dishId: eggs.id,
      ingredientId: '324fd8c4-87fd-413a-908c-8c098f1ad273',
      amount: 2
    },
    {
      //bacon
      dishId: eggs.id,
      ingredientId: 'c0505276-a012-43ae-8919-9ae1806b1436',
      amount: 4
    },
    {
      //salt
      dishId: eggs.id,
      ingredientId: '0ff8ac08-65dc-4b99-b9b7-0c7a803aff41',
      amount: 5
    }
  ];

  return Promise.join(
    // Inserts seed entries
    knex('dish').insert([salad, eggs]),
    knex('dish_ingredient').insert(saladIngredients),
    knex('dish_ingredient').insert(eggsIngredients)
  );
};
