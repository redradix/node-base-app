var should = require('should');

describe.only('Dish Service', () => {
  var dbHelper = require('../helpers/db');
  var factory = require('../../services/dish_service'),
      schemas = require('../../core/schemas'),
      validationService = require('../../services/validation_service')(schemas),
      subject = factory(dbHelper.knex, validationService);

  function seedIngredients(db){

  }

  function clear(db){

  }

  it('Factory should return an object', () => {
    subject.should.be.an.Object;
    subject.getAll.should.be.a.Function;
    subject.getById.should.be.a.Function;
    subject.create.should.be.a.Function;
    subject.update.should.be.a.Function;
    subject.deleteById.should.be.a.Function;
  });

  it('Should create a new dish', done => {

  });

  it('Should return all dishes', done => {
    subject.getAll().then(dishes => {
      dishes.should.be.an.Array;
      done();
    })
    .catch(done);
  });

  it('Should return one dish by id', done => {

  });
});