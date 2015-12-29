function IngredientServiceFactory(db){
  var I = db('ingredient');

  function getAll(){
    return I.select();
  }

  function getById(id){
    return I.where({ id }).first();
  }

  function create(ingredient){
    return I.insert(ingredient);
  }

  function update(ingredient){
    return I.where({ id: ingredient.id })
      .update(ingredient);
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