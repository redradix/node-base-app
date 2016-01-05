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

  app.param('ingredientId', getIngredient);
  app.get('/api/ingredients', httpSecurity.requireToken, getAll);
  app.get('/api/ingredients/:ingredientId', httpSecurity.requireToken, getById);
  app.post('/api/ingredients', httpSecurity.requireToken, create);
  app.put('/api/ingredients/:ingredientId', httpSecurity.requireToken, update);
  app.delete('/api/ingredients/:ingredientId', httpSecurity.requireToken, deleteById);
  //app.use('/api', router);

  console.log('Ingredient API attached');

  return {}

}

module.exports = IngredientAPIFactory;