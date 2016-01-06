var isError = require('util').isError;
/**
 * Session Controller - handles register, login, logout and session info (me)
 *
 */
function SessionControllerFactory(webapp, userService, httpSecurity, jwtService, config){
  var app = webapp.app,
      router = webapp.apiRouter;


  //Formats an Exception or returns other type of errors (promise rejections)
  function _formatError(err, code){
    return isError(err) ? { message: err.message, code: code } : err;
  }

  //Registers a new User
  function register(req, res, next){
    userService.create(req.body)
      .then(user => {
        next();
      })
      .catch(err => {
        console.log('Register failed', err );
        var apiErrors = _formatError(err, 'REGISTER_FAILED');
        res.status(406).send({
          errors: [].concat(apiErrors)
        });
      });
  }

  // Login - create a new session and send back the token
  function createSession(req,res){
    userService.login(req.body.username, req.body.password)
      .then(user => {
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

  // Get back information encrypted in the JSON Web Token
  function getSession(req,res){
    //security middleware stores user data in req.user
    res.status(200).send({
      type: 'session',
      data: req.user
    });
  }

  // Destroy session (Logout)
  function destroySession(req,res){
    //nothing to do here, client should discard existing token
    res.status(200).send();
  }


  router.post('/register', register, createSession);
  router.post('/session', createSession);

  //protected routes should include httpSecurity.requireToken in their middleware chain
  router.get('/session', httpSecurity.requireToken, getSession);
  router.delete('/session', httpSecurity.requireToken, destroySession);


  return {
  }
}

module.exports = SessionControllerFactory;