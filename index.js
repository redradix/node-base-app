var container = require('./containerConfig');

process.name = 'foodapp';

//get controller modules so they attach to the express instance
container.get('sessionController');
container.get('ingredientController');
container.get('dishController');
container.get('orderController');

//and now start express
var express = container.get('webapp');
express.start();


