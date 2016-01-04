/**
 * Ingredient Schema Definition
 * Syntax info: http://json-schema.org/examples.html
 */
module.exports = {
  title: 'Ingredient',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 50,
      required: true
    },
    cost: {
      type: 'number',
      required: true
    },
    stock: {
      type: 'integer',
      required: true
    }
  }
}