var uuid = require('uuid');
var _ = require('lodash');

function DishServiceFactory(db, validator){

  function getAll(){
    return db('dish').select('*');
  }

  function getById(id){
    var res;
    //first select the dish itself
    return db('dish').where({id}).first()
      .then(dish => {
        //then fetch its ingredients
        res = dish;
        return db('dish_ingredient')
          .join('ingredient', 'ingredientId', 'id')
          .select('id', 'name', 'amount')
          .where('dishId', id);
      })
      .then(ingredients => {
        res.ingredients = ingredients;
        return res;
      });
  }

  function create(dish){
    var newDish = Object.assign({}, { id: uuid.v4() }, dish);
    return _validateDish(newDish)
      .then(dish => db('dish').insert(_.omit(dish, 'ingredients')))
      .then(res => _saveIngredients(newDish.id, newDish.ingredients))
      .then(() => newDish);
  }

  function update(id, dish){
    return _validateDish(dish)
      .then(dish => db('dish').where({id}).update(_.omit(dish, 'ingredients')))
      .then(() => _clearIngredients(id))
      .then(() => _saveIngredients(id, dish.ingredients))
      .then(() => dish);
  }

  function deleteById(id){
    return _clearIngredients(id)
      .then(() => db('dish').where({id}).delete());
  }


  function _clearIngredients(dishId){
    return db('dish_ingredient').where('dishId', dishId).delete();
  }

  function _saveIngredients(dishId, ingredients){
    //create each ingredient
    var dishIngredients = ingredients.map(i => {
      return {
        dishId: dishId,
        ingredientId: i.id,
        amount: i.amount
      }
    });
    return db('dish_ingredient').insert(dishIngredients);
  }

  function _validateDish(dish){
    var res = validator.validate('Dish', dish);
    return res.valid ? Promise.resolve(dish) : Promise.reject(res.errors);
  }


  return {
    getAll,
    getById,
    create,
    update,
    deleteById
  }
}

module.exports = DishServiceFactory;