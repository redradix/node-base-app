var should = require('should');

describe('User Service', () => {
  var dbHelper = require('../helpers/db');
  var factory = require('../../services/user_service'),
      subject = factory(dbHelper.knex);

  var fakeUserId;
  var fakeUser = {
    username: 'test',
    password: 'test'
  };

  it('Should return an object', () => {
    subject.should.be.an.Object;
    subject.getUserById.should.be.a.Function;
    subject.login.should.be.a.Function;
    subject.create.should.be.a.Function;
  });

  it('Should create a User with an id', done => {
    subject.create(fakeUser).then(user => {
      user.id.should.be.a.String;
      user.username.should.equal(fakeUser.username);
      fakeUserId = user.id
      done();
    })
    .catch(done);
  });

  it('Should get a User by id', done => {
    subject.getUserById(fakeUserId).then(user => {
      user.id.should.equal(fakeUserId);
      user.username.should.equal(fakeUser.username);
      done();
    })
    .catch(done)
  });

  it('Should login a user with username and password', done => {
    subject.login('test', 'test').then(user => {
      user.username.should.equal('test');
      done();
    })
    .catch(done);
  })

  it('Should reject login a user with wrong password', done => {
    subject.login('test', 'badpassword').catch(err => {
      err.message.should.match(/Wrong password/i);
      done();
    });
  })



});