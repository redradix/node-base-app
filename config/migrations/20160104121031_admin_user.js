/**
 * Inserts a default admin/admin user in the DB
 *
 */

exports.up = function(knex, Promise) {
  var UserServiceFactory = require('../../services/user_service');
  var fakeValidator = {
    validateAsync: function(schema, user){
      console.log('Validating', user);
      return Promise.resolve(user);
    }
  }
  var defaultUser = {
    username: 'admin',
    password: 'admin'
  }
  var userService = UserServiceFactory(knex, fakeValidator);
  return userService.create(defaultUser);
};

exports.down = function(knex, Promise) {
  return knex('user').delete();
};
