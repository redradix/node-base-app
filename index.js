var container = require('./containerConfig');


process.name = 'foodapp';

container.get('userApi');
container.start('webapp');


process.on('exit', function(){
  console.log('Process exit');
  container.stop('webapp');
});
// process.on('uncaughtException', function(err){
//   console.log(err);
//   //container.stop('webapp');
// });
process.on('SIGINT', function(){
  console.log('Process SIGINT');
  container.stop('webapp');
})

