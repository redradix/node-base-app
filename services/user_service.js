var uuid = require('uuid');
var bcrypt = require('bcrypt');
var _ = require('lodash');

/**
 * Session Controller - handles register, login, logout and session info (me)
 */
function UserServiceFactory(db, validator){

  /* Encrypts a password using bcrypt */
  function encryptPassword(pwd){
    return new Promise((res, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        if(err) return rej(err);
        bcrypt.hash(pwd, salt, (err, hash) => {
          if(err) return rej(err);
          return res(hash);
        });
      });
    });
  }

  /* Compares two encrypted passwords */
  function checkPassword(pwd, hash){
    return new Promise((res, rej) => {
      bcrypt.compare(pwd, hash, (err, ok) => {
        return err ? rej(err): res(ok);
      });
    });
  }

  /* Returns a single User by its id */
  function getUserById(id){
    return db('user').where({ id }).first();
  }

  /* Returns a single user by username, for login */
  function getByUsername(username){
    return db('user').where({ username }).first();
  }

  /* Creates a new user, encrypting its password */
  function create(user){
    var newUser = Object.assign({ id: uuid.v4() }, user);
    return _validateUser(newUser)
      .then(user => encryptPassword(user.password))
      .then(hash => {
        newUser.password = hash;
        return db('user').insert(newUser).then(rows => {
          return newUser;
        });
    })
  }

  /* Checks user/password combination and returns the matching user */
  function login(username, password){
    return getByUsername(username).then(u => {
      if(!u) throw new Error('Wrong username');
      return checkPassword(password, u.password).then(isEqual => {
        if(!isEqual){
          throw new Error('Wrong password');
        }
        return u;
      });
    });
  }

  /* Validates a User (for registering) using JSON Schema */
  function _validateUser(user){
    var res = validator.validate('User', user);
    return res.valid ? Promise.resolve(user) : Promise.reject(res.errors);
  }

  return {
    getUserById,
    login,
    create
  }

}

module.exports = UserServiceFactory;