var express = require('express');
/**

Dish REST API

*/
function DishAPIFactory(webapp, dishService, httpSecurity){

  function getDishById(req, res, next, dishId){
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

  function getById(req,res){
    res.send({
      type: 'dish',
      data: req.dish
    });
  }

  function getAll(req, res){
    dishService.getAll().then(dishes => {
      res.send({
        type: 'dishes',
        data: dishes
      });
    })
  }

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
        res.status(406).send({
          type: 'dish',
          errors: err
        })
      });
  }

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
        res.status(406).send({
          type: 'dish',
          errors: [].concat(err)
        })
      })
  }

  function deleteById(req, res){
    dishService.deleteById(req.dish.id)
      .then(() => {
        res.send(200)
      })
      .catch(err => {
        console.log('Error deleting dish', err);
        res.status(406).send({
          type: 'dish',
          errors: [].concat(err)
        })
      })
  }

  var app = webapp.app;

  app.get('/api/dishes', httpSecurity.requireToken, getAll);
  app.get('/api/dishes/:dishId', httpSecurity.requireToken, getById);
  app.post('/api/dishes', httpSecurity.requireToken, create);
  app.put('/api/dishes/:dishId', httpSecurity.requireToken, update);
  app.delete('/api/dishes/:dishId', httpSecurity.requireToken, deleteById);
  app.param('dishId', getDishById);


  console.log('Dish API attached');

}

module.exports = DishAPIFactory;