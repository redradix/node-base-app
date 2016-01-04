var express = require('express');
/**
 * Returns the Ingredient API module
 * @param {Object} webapp            Express module
 * @param {Object} ingredientService DB access for ingredients
 * @param {Object} httpSecurity      Express security middleware
 * @param {Object} config            Configuration
 */
function IngredientAPIFactory(webapp, ingredientService, httpSecurity, config){
  var app = webapp.app;

  function getIngredient(ingredientId, req, res, next){
    if(!ingredientId){
      res.status(404).end();
    }
    else {
      ingredientService.getById(ingredientId).then(ingredient => {
        req.ingredient = ingredient;
        next();
      });
    }
  }

  function validateIngredient(data){
    var errors = [];
    if(!data.name || data.name.toString().trim().length === 0){
      errors.push({ field: 'name', message: 'Ingredient must have a name'});
    }
    if(!data.cost || isNaN(parseFloat(data.cost))){
      errors.push({ field: 'cost', message: 'Ingredient must have a valid floating-point cost'});
    }
    if(!data.stock || isNaN(parseInt(data.stock))){
      errors.push({ field: 'stock', message: 'Ingredient must have a valid integer stock'});
    }

    return errors;
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
    //expects name, cost, stock
  }

  function update(req, res){

  }

  function deleteById(req, res){

  }

  var router = express.Router();
  //all routes are secure
  router.all(httpSecurity.requireToken);
  router.param('id', getIngredient);
  router.get('/ingredients', getAll);
  router.get('/ingredients/:id', getById);
  router.post('/ingredients', create);
  router.put('/ingredients/:id', update);
  router.delete('/ingredients/:id', deleteById);

}

module.exports = IngredientAPIFactory;