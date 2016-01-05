var should = require('should');
var uuid = require('uuid');

describe('Dish Service', () => {
  var dbHelper = require('../helpers/db');
  var seedHelper = require('../helpers/fakeData');
  var factory = require('../../services/dish_service'),
      schemas = require('../../core/schemas'),
      validationService = require('../../services/validation_service')(schemas),
      subject = factory(dbHelper.knex, validationService);

  var fakeIngredients = [
    {
      id: uuid.v4(),
      name: 'bacon',
      cost: 1,
      stock: 10
    },
    {
      id: uuid.v4(),
      name: 'egg',
      cost: 0.6,
      stock: 5
    }
  ];

  var fakeDishId;

  function seedIngredients(db){
    return Promise.all(fakeIngredients.map(ing => db('ingredient').insert(ing)))
      .then(stuff => {
        console.log('Ingredients seeded', stuff);
        return true;
      });
  }

  function clear(db){
    return db('ingredient').delete();
  }

  before(done => {
    seedIngredients(dbHelper.knex).then(() => done());
  });

  it('Factory should return an object', () => {
    subject.should.be.an.Object;
    subject.getAll.should.be.a.Function;
    subject.getById.should.be.a.Function;
    subject.create.should.be.a.Function;
    subject.update.should.be.a.Function;
    subject.deleteById.should.be.a.Function;
  });

  it('Should create a new dish', done => {
    var newDish = {
      name: 'Scrambled eggs with bacon',
      price: 8.99,
      ingredients: fakeIngredients.map(i => Object.assign({ amount: 1 }, { id: i.id }))
    };

    subject.create(newDish).then(dish => {
      dish.should.be.an.Object;
      dish.id.should.be.a.String;
      dish.ingredients.should.be.an.Array;
      dish.ingredients.should.have.length(2);
      fakeDishId = dish.id;
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
  });

  it('Should reject creating an invalid dish', done => {
    var failedDish = {
      name: 'foo'
    }

    subject.create(failedDish)
      .catch(errors => {
        errors.should.have.length(2);
        done();
      })
  });

  it('Should return all dishes', done => {
    subject.getAll().then(dishes => {
      dishes.should.be.an.Array;
      dishes.should.have.length(1);
      done();
    })
    .catch(done);
  });

  it('Should return one dish by id', done => {
    subject.getById(fakeDishId).then(dish => {
      dish.name.should.equal('Scrambled eggs with bacon');
      dish.ingredients.should.have.length(2);
      done();
    })
    .catch(done);
  });

  it('Should update an existing dish', done => {
    var updatedDish = {
      name: 'Scrambled eggs with more bacon',
      price: 8.99,
      ingredients: fakeIngredients.map(i => Object.assign({ amount: 2 }, { id: i.id }))
    };
    subject.update(fakeDishId, updatedDish).then(dish => {
      dish.should.be.an.Object;
      dish.name.should.equal(updatedDish.name);
      done();
    })
    .catch(done);
  });

  it('Should delete a dish by id', done => {
    subject.deleteById(fakeDishId).then(() => {
      done();
    });
  });
});