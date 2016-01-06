var uuid = require('uuid');
/**
 * Ingredient service - handles CRUD of ingredients
 *
 */
function IngredientServiceFactory(db, validator){
  //WARNING: Don't do this!!! Causes the query params to be cached
  //var I = db('ingredient');

  /* Returns every ingredient */
  function getAll(){
    return db.select('*').from('ingredient').orderBy('name');
  }

  /* Returns a single ingredient */
  function getById(id){
    return db('ingredient').where({id: id}).first();
  }

  /* Inserts a new ingredient */
  function create(ingredient){
    var newIngredient = Object.assign({}, { id: uuid.v4() }, ingredient);
    return _validateIngredient(newIngredient).then(newIngredient => {
      return db('ingredient').insert(newIngredient).then(rows => {
        return newIngredient;
      });
    });
  }

  /* Updates an existing ingredient */
  function update(id, ingredient){
    return _validateIngredient(ingredient).then(() => {
      return db('ingredient').where('id', id).update(ingredient)
      .then(ing => {
          return Object.assign({}, ingredient);
      });
    });
  }

  /* Removes an ingredient by its id */
  function deleteById(id){
    return db('ingredient').where('id', id).delete();
  }


  /* Validates an ingredient using JSON Schema */
  function _validateIngredient(ing){
    var res = validator.validate('Ingredient', ing);
    return res.valid ? Promise.resolve(ing) : Promise.reject(res.errors);
  }

  return {
    getAll,
    getById,
    create,
    update,
    deleteById
  }
}

module.exports = IngredientServiceFactory;