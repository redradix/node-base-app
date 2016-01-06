var uuid = require('uuid');
var _ = require('lodash');
/**
  Dish Service - handles CRUD operation on Dish entity

  Dish has a relation with Ingredient so save and update methods
  must handle inserting its children
**/
function DishServiceFactory(db, validator){

  /* Returns all dishes */
  function getAll(){
    return db('dish').select('*');
  }

  /* Returns a single Dish by its id, with related ingredients */
  function getById(id){
    var res;
    //first select the dish itself
    return db('dish').where({id}).first()
      .then(dish => {
        if(!dish) return null;
        //then fetch its ingredients
        res = dish;
        return db('dish_ingredient')
          .join('ingredient', 'ingredientId', 'id')
          .select('id', 'name', 'amount')
          .where('dishId', id);
      })
      .then(ingredients => {
        if(res)
          res.ingredients = ingredients || [];
        return res;
      });
  }

  /* Inserts a new Dish, as well  as its ingredients */
  function create(dish){
    var newDish = Object.assign({}, { id: uuid.v4() }, dish);
    return _validateDish(newDish)
      .then(dish => db('dish').insert(_.omit(dish, 'ingredients')))
      .then(res => _saveDishIgrendients(newDish.id, newDish.ingredients))
      .then(() => newDish);
  }

  /* Updates a Dish, replacing its ingredients */
  function update(id, dish){
    return _validateDish(dish)
      .then(dish => db('dish').where({id}).update(_.omit(dish, 'ingredients')))
      .then(() => _clearIngredients(id))
      .then(() => _saveDishIgrendients(id, dish.ingredients))
      .then(() => dish);
  }

  /* Deletes a Dish identified by its id */
  function deleteById(id){
    return _clearIngredients(id)
      .then(() => db('dish').where({id}).delete());
  }


  /* Deletes every Dish_Ingredient for a given dish id */
  function _clearIngredients(dishId){
    return db('dish_ingredient').where('dishId', dishId).delete();
  }

  /* Inserts the related ingredients for a given dishId */
  function _saveDishIgrendients(dishId, ingredients){
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

  /** Validates a Dish using JSON Schema **/
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