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


  return {
    validate
  }
}

module.exports = ValidatorServiceFactory;