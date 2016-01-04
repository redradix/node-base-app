/**
 * User Schema Definition
 * Syntax info: http://json-schema.org/examples.html
 */
module.exports = {
  title: 'User',
  type: 'object',
  properties: {
    username: {
      type: 'string',
      maxLength: 50,
      required: true
    },
    password: {
      type: 'string',
      maxLength: 60,
      required: true
    }
  }
}