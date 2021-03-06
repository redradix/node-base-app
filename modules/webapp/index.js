//Webapp module factory
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function WebAppFactory(config){

  var app = express();
  var apiRouter = express.Router();
  var appServer;

  app.all((req,res,next) => {
    console.log('Request', req.verb + ' ' + req.path);
    next();
  });

  app.all(config.apiPrefix + '/*', bodyParser.json());

  //Enable cross domain
  app.options('*', cors()); // include before other routes
  app.use(cors());

  //inject REST API router
  app.use(config.apiPrefix, apiRouter);

  app.use((err,req,res,next) => {
    console.log('Express error', err);
    res.status(err.statusCode).end();
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
    app,
    //expose the API router so that controllers can attach routes to it
    apiRouter
  };


}

module.exports = WebAppFactory;