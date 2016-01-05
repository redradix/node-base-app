var uuid = require('uuid');

function IngredientServiceFactory(db, validator){
  //WARNING: Don't do this!!! Causes the query params to be cached
  //var I = db('ingredient');

  function validateIngredient(ing){
    var res = validator.validate('Ingredient', ing);
    return res.valid ? Promise.resolve(ing) : Promise.reject(res.errors);
  }

  function getAll(){
    //I.select().orderBY doesn't work!!
    return db.select('*').from('ingredient').orderBy('name');
  }

  function getById(id){
    //console.log('IngSERVICE getById(' + id + ')');
    return db('ingredient').where({id: id});
  }

  function create(ingredient){
    var newIngredient = Object.assign({}, { id: uuid.v4() }, ingredient);
    return validateIngredient(newIngredient).then(newIngredient => {
      return db('ingredient').insert(newIngredient).then(rows => {
        return newIngredient;
      });
    });
  }

  function update(id, ingredient){
    console.log('ingService update', id, ingredient);
    return validateIngredient(ingredient).then(() => {
      return db('ingredient').where('id', id).update(ingredient)
      .then(ing => {
          console.log('Updated OK', ing);
          return Object.assign({}, ingredient);
      });
    });
  }

  function deleteById(id){
    return db('ingredient').where('id', id).delete();
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