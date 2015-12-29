var uuid = require('uuid');

function UserServiceFactory(db){
  var User = db('user');

  function getUserById(id){
    return User.where({ id }).first();
  }

  function create(user){
    //create user Id
    user.id = uuid.v1();
    return User.insert(user).then(rows => {
      if(rows[0] === 1){
        return user;
      }
      else {
        throw new Error('Insert failed');
      }
    });
  }

  function getByUsername(username){
    return User.where({ username }).first();
  }

  function login(username, password){
    return getByUsername(username).then(u => {
      if(u.password === password){
        return u;
      }
      else {
        throw new Error('Wrong password');
      }
    });
  }

  return {
    getUserById,
    login,
    create
  }

}

module.exports = UserServiceFactory;