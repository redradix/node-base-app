/**
 * JWTService
 *
 * Contains functions to create and verify a JSON Web Token. More info: https://jwt.io/
 *
 * The factory expects a configuration object with the following keys:
 *   - jwtsecret: string used a private key for JWT encryption
 *   - jwtexpiration: a moment.js time string like '24h', '7days' or similar. '24h' by default
 */
var jwt = require('jsonwebtoken');
var _ = require('lodash');

function JWTServiceFactory(config){

  var defaultUserFields = ['id', 'username'];
  /**
   * creates a JWT given a user
   * @param  {Object} user        User data that will be encoded as the JWT payload
   * @param  {Array}  userfields  Array of user properties to encode
   * @return {Promise}            Promise that resolves with the token
   */
  function createToken(user, userfields){
    return new Promise((resolve,reject) => {
      userfields || (userfields = defaultUserFields);
      var payload = _.pick(user, userfields);
      jwt.sign(payload, config.jwtsecret, { expiresIn: config.jwtexpiration || '24h'}, (token) => {
        resolve(token);
      });
    });
  }

  /**
   * verifies a provided JWT
   * @param  {String} token JSON    Web Token to validate
   * @param  {Array}  userfields    Array of user properties to decode
   * @return {Promise}              Promise that resolves with the decoded user fields
   */
  function verifyToken(token, userfields){
    userfields || (userfields = defaultUserFields);
    return new Promise((resolve,reject) => {
      jwt.verify(token, config.jwtsecret, (err, decoded) => {
        return err ? reject(err) : resolve(_.pick(decoded, userfields));
      });
    });
  }

  return {
    createToken,
    verifyToken
  }
}

module.exports = JWTServiceFactory;