var container = require('./containerConfig');


process.name = 'foodapp';

container.get('userApi');
container.get('ingredientApi');
var express = container.get('webapp');
express.start();


// process.on('exit', function(){
//   console.log('Process exit');
//   container.stop('webapp');
// });
// // process.on('uncaughtException', function(err){
// //   console.log(err);
// //   //container.stop('webapp');
// // });
// process.on('SIGINT', function(){
//   console.log('Process SIGINT');
//   container.stop('webapp');
// })

