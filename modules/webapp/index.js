//Webapp module factory
var express = require('express');
var bodyParser = require('body-parser');

function WebAppFactory(config){

  var app = express();
  var appServer;

  app.all((req,res,next) => {
    console.log('Request', req.verb + ' ' + req.path);
    next();
  });

  app.all('/api/*', bodyParser.json());

  function start(){
    appServer = app.listen(config.host, config.port, (err) => {
      if(err){
        console.log('Express could not be started', err);
        //throw err;
      }
      else
        console.log('Express listening at', config.host + ':' + config.port);
    });
  }

  function stop(){
    if(!appServer) return;
    appServer.close(() => {
      console.log('Express stopped');
    });
  }

  return {
    start,
    stop,
    app
  };


}

module.exports = WebAppFactory;