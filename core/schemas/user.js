/**
 * User Schema Definition
 * Syntax info: http://json-schema.org/examples.html
 */
module.exports = {
  title: 'User',
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      minLength: 36,
      maxLength: 36
    },
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