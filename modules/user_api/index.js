var express = require('express');

function UserAPIFactory(webapp, userService, httpSecurity, jwtService, config){
  var app = webapp.app;

  function register(req, res, next){
    var newUser = {
      username: req.body.username,
      password: req.body.password
    }
    console.log('UserAPI - register', req.body);
    userService.create(newUser)
      .then(user => {
        next();
      });
  }

  function createSession(req,res){
    console.log('UserAPI - createSession', req.body);
    if(!req.body.username || !req.body.password){
      return res.send(400).end();
    }
    userService.login(req.body.username, req.body.password)
      .then(user => {
        console.log('Login OK', user);
        //create token
        jwtService.createToken(user).then(token => {
          res.status(200).send({
            success: true,
            type: 'session',
            data: {
              token
            }
          });
        })
      })
      .catch(err => {
        console.log('Login failed', err);
        res.status(404).end();
      });
  }

  function getSession(req,res){
    //security middleware stores user data in req.user
    res.status(200).send({
      type: 'session',
      success: true,
      data: req.user
    });
  }

  function destroySession(req,res){
    //nothing to do here, client should discard existing token
    res.status(200).send();
  }

  var router = express.Router();

  //register, it will automatically login the user
  router.post('/register', register, createSession);
  //login - create a session
  router.post('/session', createSession);
  //protected routes should include httpSecurity.requireToken in their middleware chain
  router.get('/session', httpSecurity.requireToken, getSession);

  router.delete('/session', httpSecurity.requireToken, destroySession);

  app.use('/api', router);

  return {
  }
}

module.exports = UserAPIFactory;