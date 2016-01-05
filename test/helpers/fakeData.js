var uuid = require('uuid');
var _ = require('lodash');

var fakeIngredients = [
  {
    id: uuid.v4(),
    name: 'bacon',
    cost: 1,
    stock: 10
  },
  {
    id: uuid.v4(),
    name: 'egg',
    cost: 0.6,
    stock: 5
  }
];

var fakeDishes = [
  {
    id: uuid.v4(),
    name: 'Scrambled Eggs with bacon',
    price: 14.99,
    ingredients: [
      { id: fakeIngredients[0].id, amount: 4 },
      { id: fakeIngredients[1].id, amount: 2 }
    ]
  },
  {
    id: uuid.v4(),
    name: 'Scrambled eggs',
    price: 9.99,
    ingredients: [
      {
        id: fakeIngredients[1].id, amount: 2
      }
    ]
  }
];

function seedIngredients(db){
  return Promise.all(fakeIngredients.map(ing => db('ingredient').insert(ing)))
    .then(stuff => {
      return true;
    });
}

function seedDishes(db){
  return Promise.all(fakeDishes.map(d => {
    return db('dish').insert(_.omit(d, 'ingredients'))
      .then(() => {
        //create individual ingredients
        return Promise.all(d.ingredients.map(i => {
          return db('dish_ingredient').insert({
            dishId: d.id,
            ingredientId: i.id,
            amount: i.amount
          })
        }));
      })
  }));
}

module.exports = {
  fakeIngredients,
  fakeDishes,
  seedIngredients,
  seedDishes
}