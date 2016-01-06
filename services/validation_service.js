var validator = require('revalidator');
/**
 * Validator Service factor
 * Returns a Validator Service that is capable of
 * validating Javascript objets using JSON Schema
 *
 *  Dependencies: JSON Schema index (see /core/schemas/index)
 */
function ValidatorServiceFactory(schemas){

  /* Validates an object againts a schema name */
  function validate(schemaName, obj){
    var results, schema;
    schema = schemas[schemaName];
    if(!schema){
      throw new Error(schemaName + ' JSON schema not found in the schema index');
    }
    return validator.validate(obj, schema);
  }

  /* Promise version for using in Promise chains
     If valid, Promise resolves with the object itself
     Otherwise, Promise rejects with the validation errors Array
  */
  function validateAsync(schemaName, obj){
    return new Promise((resolve, reject) => {
      var results = validate(schemaName, obj);
      return results.valid ? resolve(obj) : reject(_formatErrors(results.errors));
    });
  }

  function _formatErrors(errors){
    return errors.map(e => {
      return Object.assign({}, e, { code: 'VALIDATION_ERROR '});
    });
  }


  return {
    validate,
    validateAsync
  }
}

module.exports = ValidatorServiceFactory;