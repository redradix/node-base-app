/**
 * Returns the Ingredient API controller
 * @param {Object} webapp            Express module
 * @param {Object} ingredientService DB access for ingredients
 * @param {Object} httpSecurity      Express security middleware
 */
function IngredientControllerFactory(webapp, ingredientService, httpSecurity){
  var app = webapp.app,
      router = webapp.apiRouter;

  // Express.param handler, loads ingredient into request object
  function loadIngredient(req, res, next, ingredientId){
    if(!ingredientId){
      res.status(404).end();
    }
    else {
      ingredientService.getById(ingredientId).then(ingredient => {
        if(!ingredient){
          return res.status(404).end();
        }
        req.ingredient = ingredient;
        next();
      });
    }
  }

  // Returns all ingredients
  function getAll(req, res){
    ingredientService.getAll().then(ingredients => {
      res.send({
        type: 'ingredients',
        data: ingredients
      });
    })
    .catch(err => {
      console.log('Ingredient API error', err);
      res.status(500).end();
    })
  }

  // Returns a single ingredient
  function getById(req, res){
    res.send({
      type: 'ingredients',
      data: req.ingredient
    });
  }

  // Creates a new ingredient, returns the new object
  function create(req, res){
    var postData = {
      name: req.body.name,
      cost: req.body.cost,
      stock: req.body.stock
    }

    ingredientService.create(postData)
      .then(ing => {
        res.send({
          type: 'ingredients',
          data: ing
        })
      })
      .catch(err => {
        var apiError = err;
        console.log('Ingredient API create failed', err.code);
        if(err.code === 'ER_DUP_ENTRY') {
          apiError = {
            code: 'INVALID_INGREDIENT',
            message: 'Ingredient name must be unique'
          }
          //err.message = 'Ingredient name exists'
        };
        res.status(406).send({
          type: 'ingredients',
          errors: [].concat(apiError)
        });
      });
  }

  // Updates an existing ingredient
  function update(req, res){
    var postedIngredient = Object.assign({}, req.ingredient, req.body);
    ingredientService.update(req.params.ingredientId, postedIngredient)
      .then(ing => {
        res.send({
          type: 'ingredients',
          data: ing
        })
      })
      .catch(err => {
        if(err.code === 'ER_DUP_ENTRY') {
          err.message = 'Ingredient name exists'
        };
        res.status(406).send({
          type: 'ingredients',
          errors: [].concat(err)
        });
      })
  }

  // Deletes an ingredient
  function deleteById(req, res){
    ingredientService.deleteById(req.ingredient.id)
      .then(() => {
        res.status(200).end();
      })
      .catch(err => {
        console.log('Error DELETE ingredient', err);
        if(err.code.indexOf('ROW_IS_REFEREBCED') !== 0){
          res.status(400).send({
            errors: [].concat({ code: 'INGREDIENT_IN_USE', message: 'Ingredient is part of one or more dishes'})
          });
        }
        else
          res.status(400).send({
            errors: [].concat(err)
          })
      })
  }


  //all routes are secure
  router.all('/ingredients/*', httpSecurity.requireToken);
  router.param('ingredientId', loadIngredient);
  router.get('/ingredients', getAll);
  router.get('/ingredients/:ingredientId', getById);
  router.post('/ingredients', create);
  router.put('/ingredients/:ingredientId', update);
  router.delete('/ingredients/:ingredientId', deleteById);

  return {}

}

module.exports = IngredientControllerFactory;