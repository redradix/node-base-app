/**
 * Inserts a default admin/admin user in the DB
 *
 */

exports.up = function(knex, Promise) {
  var UserServiceFactory = require('../../services/user_service');
  var defaultUser = {
    username: 'admin',
    password: 'admin'
  }
  var userService = UserServiceFactory(knex);
  return userService.create(defaultUser);
};

exports.down = function(knex, Promise) {
  return knex('user').delete();
};
