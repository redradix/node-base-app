/**
 * Insert some ingredients
 */
exports.seed = function(knex, Promise) {
  var data = [
    {
      id: '60aad83d-ac68-4c3a-85c2-22879ff39c24',
      name: 'Olive oil',
      cost: 0.05,
      stock: 1000
    },
    {
      id: '0ff8ac08-65dc-4b99-b9b7-0c7a803aff41',
      name: 'Salt',
      cost: 0.10,
      stock: 400
    },
    {
      id: 'c131628b-3fff-4193-a1ad-e4d2dc41497f',
      name: 'Pepper',
      cost: 0.10,
      stock: 4000
    },
    {
      id: 'c0505276-a012-43ae-8919-9ae1806b1436',
      name: 'Bacon',
      cost: 0.40,
      stock: 200
    },
    {
      id: '324fd8c4-87fd-413a-908c-8c098f1ad273',
      name: 'Egg',
      cost: 0.10,
      stock: 100
    },
    {
      id: '3f750c0d-e273-4e88-956d-2b8389149c2f',
      name: 'Lettuce',
      cost: 0.15,
      stock: 50
    },
    {
      id: 'de3616e7-d486-4777-bd74-13a0b25833aa',
      name: 'Fresh tomato',
      cost: 0.15,
      stock: 50
    }
  ];
  return Promise.join(
    // Inserts seed entries
    knex('ingredient').insert(data)
  );
};
