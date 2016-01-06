/**
  Returns the Session API Controller
*/
var isError = require('util').isError;

function SessionControllerFactory(webapp, userService, httpSecurity, jwtService, config){
  var app = webapp.app,
      router = webapp.apiRouter;


  //Formats an Exception or returns other type of errors (promise rejections)
  function _formatError(err, code){
    return isError(err) ? { message: err.message, code: code } : err;
  }

  function register(req, res, next){
    userService.create(req.body)
      .then(user => {
        next();
      })
      .catch(err => {
        console.log('Register failed', err );
        //turn Error into Object with message
        var apiErrors = _formatError(err, 'REGISTER_FAILED');
        res.status(406).send({
          errors: [].concat(apiErrors)
        });
      });
  }

  function createSession(req,res){
    console.log('UserAPI - createSession', req.body);
    // if(!req.body.username || !req.body.password){
    //   return res.status(400).end();
    // }
    userService.login(req.body.username, req.body.password)
      .then(user => {
        console.log('Login OK', user);
        //create token
        jwtService.createToken(user).then(token => {
          res.status(200).send({
            type: 'session',
            data: {
              token
            }
          });
        })
      })
      .catch(err => {
        console.log('Login failed', err);
        res.status(406).send({
          errors: [].concat(_formatError(err, 'LOGIN_FAILED'))
        });
      });
  }

  function getSession(req,res){
    //security middleware stores user data in req.user
    res.status(200).send({
      type: 'session',
      data: req.user
    });
  }

  function destroySession(req,res){
    //nothing to do here, client should discard existing token
    res.status(200).send();
  }

  //register, it will automatically login the user
  router.post('/register', register, createSession);
  //login - create a session
  router.post('/session', createSession);
  //protected routes should include httpSecurity.requireToken in their middleware chain
  router.get('/session', httpSecurity.requireToken, getSession);
  router.delete('/session', httpSecurity.requireToken, destroySession);


  return {
  }
}

module.exports = SessionControllerFactory;