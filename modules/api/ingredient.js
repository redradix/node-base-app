/**
 * Returns the Ingredient API controller
 * @param {Object} webapp            Express module
 * @param {Object} ingredientService DB access for ingredients
 * @param {Object} httpSecurity      Express security middleware
 */
function IngredientControllerFactory(webapp, ingredientService, httpSecurity){
  var app = webapp.app,
      router = webapp.apiRouter;

  function getIngredient(req, res, next, ingredientId){
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

  function getAll(req, res){
    ingredientService.getAll().then(ingredients => {
      res.send({
        type: 'ingredients',
        success: true,
        data: ingredients
      });
    })
    .catch(err => {
      console.log('Ingredient API error', err);
      res.status(500).end();
    })
  }

  function getById(req, res){
    res.send({
      type: 'ingredient',
      success: true,
      data: req.ingredient
    });
  }

  function create(req, res){
    var postData = {
      name: req.body.name,
      cost: req.body.cost,
      stock: req.body.stock
    }

    ingredientService.create(postData)
      .then(ing => {
        res.send({
          type: 'ingredient',
          success: true,
          data: ing
        })
      })
      .catch(err => {
        console.log('Ingredient API create failed', err);
        res.status(406).send({
          type: 'ingredient',
          success: false,
          errors: err
        });
      });
  }

  function update(req, res){
    var postedIngredient = Object.assign({}, req.ingredient, req.body);
    ingredientService.update(req.params.ingredientId, postedIngredient)
      .then(ing => {
        res.send({
          type: 'ingredient',
          success: true,
          data: ing
        })
      })
      .catch(err => {
        res.status(406).send({
          type: 'ingredient',
          success: false,
          errors: err
        });
      })
  }

  function deleteById(req, res){
    ingredientService.deleteById(req.ingredient.id)
      .then(() => {
        res.status(200).end();
      })
      .catch(err => {
        console.log('Error DELETE ingredient', err);
        res.status(500).end();
      })
  }


  //all routes are secure
  router.all('/ingredients/*', httpSecurity.requireToken);
  router.param('ingredientId', getIngredient);
  router.get('/ingredients', getAll);
  router.get('/ingredients/:ingredientId', getById);
  router.post('/ingredients', create);
  router.put('/ingredients/:ingredientId', update);
  router.delete('/ingredients/:ingredientId', deleteById);

  return {}

}

module.exports = IngredientControllerFactory;