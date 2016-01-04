var uuid = require('uuid');
var bcrypt = require('bcrypt');
var _ = require('lodash');

function UserServiceFactory(db, validator){
  var User = db('user');

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

  function checkPassword(pwd, hash){
    return new Promise((res, rej) => {
      bcrypt.compare(pwd, hash, (err, ok) => {
        return err ? rej(err): res(ok);
      });
    });
  }

  function getUserById(id){
    return User.where({ id }).first();
  }

  function create(user){
    var newUser = Object.assign({ id: uuid.v4() }, user);
    return encryptPassword(newUser.password).then(hash => {
      newUser.password = hash;
      return User.insert(newUser).then(rows => {
        //console.log('UserService created', newUser);
        return newUser;
      });
    })
  }

  function getByUsername(username){
    return User.where({ username }).first();
  }

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

  return {
    getUserById,
    login,
    create
  }

}

module.exports = UserServiceFactory;