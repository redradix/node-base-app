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
  //Enable cross
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  app.use((err,req,res,next) => {
    console.log('Express error', err);
    res.send(err.statusCode).end();
  });

  function start(){
    appServer = app.listen(config.port, (err) => {
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