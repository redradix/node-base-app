/**
 * Returns the HttpSecurity service, that contains
 * Express middleware functions to secure routes
 * @param {Object} jwtService JSON Web Token service
 * @param {Object} config     Configuration
 * @returns {Object}
 */
function HttpSecurityFactory(jwtService, config){

  /**
   * Extracts JWT from HTTP Headers and returns the token string
   * Expects an 'authorization' header with the shape 'Bearer XXXXXXXXX'
   * @param  {Object} req     Express request
   * @return {String}         Token if found, null otherwise
   */
  function __extractToken(req){
    var auth = req.headers['authorization'];
    if(!auth) return null;
    var parts = auth.split(' ');
    if(parts.length !== 2){
      return null;
    }
    return parts[1];
  }

  /**
   * Middleware function that requires the presence of a valid JWT
   * If a valid token is found, the auth payload is stores in req.user
   * @param  {Object}   req  Express HTTP Request
   * @param  {Object}   res  Express HTTP Response
   * @param  {Function} next Middleware chain
   */
  function requireToken(req,res,next){
    var token = __extractToken(req);
    if(!token){
      res.status(401).end();
    }
    jwtService.verifyToken(token)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        //JWT verification failed
        res.status(401).end();
      })
  }

  return {
    requireToken
  }

}

module.exports = HttpSecurityFactory;