/**
 * Dish Schema Definition
 * Syntax info: http://json-schema.org/examples.html
 */
module.exports = {
  title: 'Dish',
  type: 'object',
  //makes validation fail if any other property is present in this object
  //this avoids SQL errors of WRONG_COLUMN and such
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
      required: ['id', 'amount'],
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: {
            type: 'string',
            maxLength: 36,
            minLength: 36
          },
          amount: {
            type: 'number',
            required: true
          },
          name: {
            type: 'string'
          }
        }
      }
    }
  }
}