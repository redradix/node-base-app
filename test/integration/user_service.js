var should = require('should');

describe('User Service', () => {
  var dbHelper = require('../helpers/db');
  var factory = require('../../services/user_service'),
      subject = factory(dbHelper.knex);

  it('Should return an object', () => {
    subject.should.be.an.Object;
    subject.getUserById.should.be.a.Function;
    subject.login.should.be.a.Function;
    subject.create.should.be.a.Function;
  });

  it('Should')

});