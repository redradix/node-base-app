/** Seed some ingredients */
exports.seed = function(knex, Promise) {
  var data = [
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
    }
  ];
  return Promise.join(
    // Deletes ALL existing entries
    knex('ingredient').del(),
    // Inserts seed entries
    knex('ingredient').insert(data)
  );
};
