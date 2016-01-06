var should = require('should');
var uuid = require('uuid');

describe('Order Service', () => {
  var dbHelper = require('../helpers/db');
  var seedHelper = require('../helpers/fakeData');
  var factory = require('../../services/order_service'),
      schemas = require('../../core/schemas'),
      validationService = require('../../services/validation_service')(schemas),
      userService = require('../../services/user_service')(dbHelper.knex, validationService);
      subject = factory(dbHelper.knex, validationService);

  var fakeUser = {
    username: 'testuser',
    password: 'test'
  };

  var fakeOrder;

  function seedUser(){
    return userService.create(fakeUser)
      .then(u => {
        fakeUser = u;
        return u;
      });
  }

  before(done => {
    Promise.all([
      seedUser(),
      seedHelper.seedIngredients(dbHelper.knex),
      seedHelper.seedDishes(dbHelper.knex),
    ])
    .then(() => done())
    .catch(done);
  });

  it('Factory should return an object with methods', () => {
    subject.should.be.an.Object;
    subject.getAll.should.be.a.Function;
    subject.getById.should.be.a.Function;
    subject.create.should.be.a.Function;
    subject.update.should.be.a.Function;
    subject.deleteById.should.be.a.Function;
  });

  it('Should allow creating a valid order with a single dish', done => {
    var newOrder = {
      createdAt: Date.now(),
      createdBy: fakeUser.id,
      dishes: [
        {
          id: seedHelper.fakeDishes[0].id,
          amount: 1
        }
      ]
    };

    subject.create(newOrder).
      then(order => {
        fakeOrder = Object.assign({}, newOrder, { id: order.id });
        order.should.be.an.Object;
        order.createdBy.should.equal(newOrder.createdBy);
        order.dishes.should.have.length(1);
        done();
      }).
      catch(err => done(err));
  });

  it('Should reject creating an invalid order', done => {
    var newOrder = {
      createdBy: 'foo'
    }
    subject.create(newOrder)
      .then(done)
      .catch(err => {
        err.should.be.an.Array;
        err.should.have.length(3);
        done();
      })
  });

  it('Should reject creating an order without dishes', done => {
    var newOrder = {
      createdAt: Date.now(),
      createdBy: fakeUser.id,
      dishes: []
    };
    subject.create(newOrder)
      .catch(err => {
        err.should.be.an.Array;
        err.should.have.length(1);
        done();
      })
  });

  it('Should allow updating an existing order', done => {
    //the updated order has qty 2 of dish
    var updatedOrder = Object.assign({}, fakeOrder, {
      dishes: fakeOrder.dishes.map(d => Object.assign({}, d, { amount: 2}))
    });
    subject.update(fakeOrder.id, updatedOrder)
      .then(order => {
        order.should.be.an.Object;
        order.dishes[0].amount.should.equal(2);
        done();
      })
      .catch(err => {
        console.log('Update failed', err);
        done(err);
      })
  });

  it('Should reject updating an existing order without dishes', done => {
    var updatedOrder = Object.assign({}, fakeOrder, { dishes: [] });

    subject.update(fakeOrder.id, updatedOrder)
      .catch(err => {
        //console.log('Update failed', err);
        err.should.be.an.Array;
        err.should.have.length(1);
        done();
      })
  });

  it('Should return a single order by id with its dishes', done => {
    subject.getById(fakeOrder.id)
      .then(order => {
        order.should.be.an.Object;
        order.dishes.should.be.an.Array;
        order.dishes.should.have.length(1);
        done();
      });
  });

  it('Should return all orders', done => {
    subject.getAll().then(orders => {
      orders.should.be.an.Array;
      orders.length.should.equal(1);
      done();
    })
  })


});