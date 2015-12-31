var express = require('express');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

function UserAPIFactory(webapp, userService, config){
  var app = webapp.app;
  var router = express.Router();

  function sanitizeUser(u){
    return _.omit(u, 'password');
  }

  function createToken(user){
    return new Promise((resolve,reject) => {
      var payload =  {
        id: user.id
        username: user.username,
      };

      jwt.sign(payload, config.jwtsecret, { expiresIn: '24h' }, (token) => {
        resolve(token);
      });
    });
  }

  function checkToken(token){
    return new Promise((resolve,reject) => {
      jwt.verify(token, config.jwtsecret, (err, decoded) => {
        return err ? reject(err) : resolve(decoded);
      });
    });
  }

  function getRequestToken(req){
    var auth = req.headers['Authorization'];
    if(!auth) return null;
    var parts = auth.split(/s/);
    if(parts.length !== 2){
      return null;
    }
    return parts[1];
  }

  function register(req, res){
    var { username, password } = req.body;
    userService.create({ username, password })
      .then(user => {
        console.log('User created', user);
        return createSession(req, res);
      });
  }

  function createSession(req,res){
    var { username, password } = req.body;
    userService.login(username, password)
      .then(user => {
        console.log('Login OK', user);
        //create token
        var token = createToken(user);
        res.status(200).send({
          success: true,
          type: 'session',
          data: {
            token
          }
        });
      });
  }

  function getSession(req,res){
    var token = getRequestToken(req);
    checkToken(token).then(payload => {
      res.status(200).send(payload);
    })
    .catch(err => {
      //401 - Unauthorized
      res.status(401).end();
    });
  }

  function destroySession(req,res){
    var token = getRequestToken(req);
    checkToken(token).then(payload => {
      res.status(200).end();
    });
  }

  //setup routes
  router.post('/register', register);
  router.get('/session', getSession);
  router.post('/session', createSession);
  router.del('/session', destroySession);

  return {
    start(){
      app.use('/api', router);
    }
  }
}

module.exports = UserAPIFactory;