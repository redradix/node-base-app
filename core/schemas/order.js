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
      required: true,
    },
    createdBy: {
      type: 'string',
      minLength: 36,
      maxLength: 36,
      required: true
    },
    dishes: {
      type: 'array',
      minItems: 1,
      required: true,
      items: {
        type: 'object',
        required: ['id', 'amount'],
        additionalProperties: false,
        properties: {
          id: {
            type: 'string',
            minLength: 36,
            maxLength: 36
          },
          name: {
            type: 'string',
            maxLength: 150
          },
          amount: {
            type: 'integer'
          }
        }
      }
    }
  }
}