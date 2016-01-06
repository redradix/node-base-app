/**
 * Dish Schema Definition
 * Syntax info: http://json-schema.org/examples.html
 */
module.exports = {
  title: 'Dish',
  type: 'object',
  required: ['name', 'price', 'ingredients'],
  //makes validation fail in any other property is present in this object
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      maxLength: 36,
      minLength: 36
    },
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
      required: true,
      minItems: 1,
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