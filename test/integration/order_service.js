var should = require('should');
var uuid = require('uuid');

describe('Order Service', () => {
  var dbHelper = require('../helpers/db');
  var factory = require('../../services/order_service'),
      schemas = require('../../core/schemas'),
      validationService = require('../../services/validation_service')(schemas),
      subject = factory(dbHelper.knex, validationService);



});