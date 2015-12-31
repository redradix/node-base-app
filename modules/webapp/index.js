//Webapp module factory
var express = require('express');
var bodyParser = require('body-parser');

function WebAppFactory(config){

  var app = express();

  app.use(bodyParser.json());

  function start(){
    app.listen(config.host + ':' + config.port, () => {
      console.log('Express listening at', config.host + ':' + config.port);
    });
  }

  function stop(){
    app.close(() => {
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