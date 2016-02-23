/**

Dish REST API

*/
function DishControllerFactory(webapp, dishService, httpSecurity){

  // Express param handler, enhances request with dish object
  function loadDish(req, res, next, dishId){
    dishService.getById(dishId)
      .then(dish => {
        if(!dish) return res.status(404).end();

        req.dish = dish;
        next();
      })
      .catch(err => {
        res.status(404).end();
      })
  }

  // Returns a single Dish
  function getById(req,res){
    res.send({
      type: 'dish',
      data: req.dish
    });
  }

  // Returns all dishes
  function getAll(req, res){
    dishService.getAll().then(dishes => {
      res.send({
        type: 'dishes',
        data: dishes
      });
    })
  }

  // Creates a new Dish
  function create(req, res){
    var postedDish = req.body;
    dishService.create(postedDish)
      .then(dish => {
        res.send({
          type: 'dish',
          data: dish
        })
      })
      .catch(err => {
        res.status(400).send({
          type: 'dish',
          errors: [].concat(err)
        })
      });
  }

  // Updates an existing dish
  function update(req, res){
    var updatedDish = Object.assign({}, req.dish, req.body);
    dishService.update(req.dish.id, updatedDish)
      .then(dish => {
        res.send({
          type: 'dish',
          data: dish
        })
      })
      .catch(err => {
        res.status(400).send({
          type: 'dish',
          errors: [].concat(err)
        })
      })
  }

  // Deletes a Dish
  function deleteById(req, res){
    dishService.deleteById(req.dish.id)
      .then(() => {
        res.status(200)
      })
      .catch(err => {
        console.log('Error deleting dish', err);
        res.status(400).send({
          type: 'dish',
          errors: [].concat(err)
        })
      })
  }

  var router = webapp.apiRouter;
  //Route handlers
  router.all('/dishes*', httpSecurity.requireToken);
  router.get('/dishes', getAll);
  router.get('/dishes/:dishId', getById);
  router.post('/dishes', create);
  router.put('/dishes/:dishId', update);
  router.delete('/dishes/:dishId', deleteById);
  router.param('dishId', loadDish);

  return {};

  console.log('Dish API attached');

}

module.exports = DishControllerFactory;