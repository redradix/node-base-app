var container = require('./containerConfig');


process.name = 'foodapp';

container.start('webapp');
container.start('userApi');

process.on('exit', function(){
  container.stop('webapp');
});
process.on('uncaughtException', function(err){
  container.stop('webapp');
});
process.on('SIGINT', function(){
  container.stop('webapp');
})

