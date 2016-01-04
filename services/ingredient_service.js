var uuid = require('uuid');

function IngredientServiceFactory(db, validator){
  var I = db('ingredient');

  function validateIngredient(ing){
    var res = validator.validate('Ingredient', ing);
    return res.valid ? Promise.resolve(ing) : Promise.reject(res.errors);
  }

  function getAll(){
    //I.select().orderBY doesn't work!!
    return db.select('*').from('ingredient').orderBy('name');
  }

  function getById(id){
    return I.where({ id }).first();
  }

  function create(ingredient){
    var newIngredient = Object.assign({}, { id: uuid.v4() }, ingredient);
    return validateIngredient(newIngredient).then(newIngredient => {
      return I.insert(newIngredient).then(rows => {
        return newIngredient;
      });
    });
  }

  function update(id, ingredient){
    return validateIngredient(ingredient).then(() => {
      return I.where({ id: id}).update(ingredient)
      .then(affectedRows => {
        if(affectedRows === 1){
          return Object.assign({}, ingredient);
        }
        throw new Error('Ingredient update failed');
      });
    });
  }

  function deleteById(id){
    return I.where({ id }).delete();
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