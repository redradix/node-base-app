
/**
 * Migration to increase password field size
 * Because bcrypt generates 60-byte length hashes
 */
exports.up = function(knex, Promise) {
  return knex.raw('ALTER TABLE user MODIFY COLUMN password varchar(60)');
};

exports.down = function(knex, Promise) {
  return knex.raw('ALTER TABLE user MODIFY COLUMN password varchar(50)');
};
