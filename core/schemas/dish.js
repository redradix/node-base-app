/**
 * Dish Schema Definition
 * Syntax info: http://json-schema.org/examples.html
 */
module.exports = {
  title: 'Dish',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 150,
      required: true
    },
    price: {
      type: 'number',
      required: true
    },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            maxLength: 36,
            required: true
          },
          amount: {
            type: 'number',
            required: true
          }
        }
      }
    }
  }
}