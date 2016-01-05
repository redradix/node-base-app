var container = require('./containerConfig');


process.name = 'foodapp';

container.get('userApi');
container.get('ingredientApi');
container.get('dishApi');
container.get('orderApi');

var express = container.get('webapp');
express.start();


