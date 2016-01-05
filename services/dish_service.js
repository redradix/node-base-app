function DishServiceFactory(db, validation){

  function getAll(){
    return db('dish').select('*');
  }

  function getById(id){
    return db('dish').where({id}).first();
  }

  function create(dish){
    var newDish = Object.assign({}, { id: uuid.v4() }, dish);
    return validation.validate('Dish', dish)
      .then(db('dish').insert)
      .then(() => newDish);
  }

  function update(id, dish){
    return validation.validate('Dish', dish)
      .then(db('dish').where({id}).update(dish))
      .then(() => dish);
  }

  function deleteById(id){
    return db('dish').where({id}).delete();
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