function UserServiceFactory(db){
  var User = db('user');

  function getUserById(id){
    return User.where({ id }).first();
  }

  function create(user){
    return User.insert(user);
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