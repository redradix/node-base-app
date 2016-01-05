var container = require('./containerConfig');


process.name = 'foodapp';

container.get('userApi');
container.get('ingredientApi');

var express = container.get('webapp');
express.start();


