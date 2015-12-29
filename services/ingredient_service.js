var uuid = require('uuid');

function IngredientServiceFactory(db){
  var I = db('ingredient');

  function getAll(){
    //I.select().orderBY doesn't work!!
    return db.select('*').from('ingredient').orderBy('name');
  }

  function getById(id){
    return I.where({ id }).first();
  }

  function create(ingredient){
    ingredient.id = uuid.v1();
    return I.insert(ingredient).then(rows => {
      if(rows[0] === 1){
        return ingredient;
      }
      throw new Error('Ingredient insert failed');
    });
  }

  function update(ingredient){
    return I.where({ id: ingredient.id }).update(ingredient)
      .then(affectedRows => {
        if(affectedRows === 1){
          return ingredient;
        }
        throw new Error('Ingredient update failed');
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