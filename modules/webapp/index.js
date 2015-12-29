//Webapp module factory
var express = require('express');

function WebAppFactory(config){

  var app = express();

  function start(){

  }

  function stop(){

  }

  return {
    start,
    stop,
    app
  };


}

module.exports = WebAppFactory;