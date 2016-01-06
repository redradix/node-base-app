/**
 * Order Schema Definition
 * Syntax info: http://json-schema.org/examples.html
 */
module.exports = {
  title: 'Order',
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      minLength: 36,
      maxLength: 36
    },
    createdAt: {
      type: 'integer',
      required: true
    },
    createdBy: {
      type: 'string',
      minLength: 36,
      maxLength: 36
    },
    dishes: {
      type: 'array',
      required: true,
      minItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: {
            type: 'string',
            minLength: 32,
            maxLength: 36,
            required: true
          },
          name: {
            type: 'string',
            maxLength: 150,
            required: false
          },
          amount: {
            type: 'integer',
            required: true
          }
        }
      }
    }
  }
}